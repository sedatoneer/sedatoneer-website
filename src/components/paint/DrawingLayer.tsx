"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, type RefObject } from "react";

export interface Stroke {
  colour: string;
  width: number;
  erase: boolean;
  points: { x: number; y: number }[];
}

export interface DrawingHandle {
  /** Renders the strokes onto a white background and returns a PNG data URL. */
  toPng: () => string | null;
}

interface Props {
  /** The scrolling element the canvas has to cover. */
  scrollRef: RefObject<HTMLElement | null>;
  strokes: Stroke[];
  active: boolean;
  colour: string;
  width: number;
  erase: boolean;
  onStrokeStart: (stroke: Stroke) => void;
  onStrokePoint: (point: { x: number; y: number }) => void;
  onPointerMove: (position: { x: number; y: number } | null) => void;
  handleRef: RefObject<DrawingHandle | null>;
}

/**
 * A transparent canvas sitting over the page content. It covers the full
 * scrollable height so a drawing stays anchored to the text it was drawn on.
 * Strokes are kept as data, not pixels, so resizing and undo both just redraw.
 */
export default function DrawingLayer({
  scrollRef,
  strokes,
  active,
  colour,
  width,
  erase,
  onStrokeStart,
  onStrokePoint,
  onPointerMove,
  handleRef,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const paint = useCallback(
    (context: CanvasRenderingContext2D, list: Stroke[]) => {
      context.lineCap = "round";
      context.lineJoin = "round";
      for (const stroke of list) {
        if (stroke.points.length === 0) continue;
        context.strokeStyle = stroke.erase ? "#ffffff" : stroke.colour;
        context.lineWidth = stroke.width;
        context.beginPath();
        context.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (const point of stroke.points.slice(1)) context.lineTo(point.x, point.y);
        // A single tap should still leave a dot.
        if (stroke.points.length === 1) context.lineTo(stroke.points[0].x + 0.01, stroke.points[0].y);
        context.stroke();
      }
    },
    [],
  );

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const scroller = scrollRef.current;
    if (!canvas || !scroller) return;

    const w = scroller.clientWidth;
    const h = Math.max(scroller.scrollHeight, scroller.clientHeight);
    const ratio = window.devicePixelRatio || 1;

    if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, w, h);
    paint(context, strokes);
  }, [paint, scrollRef, strokes]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(redraw);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [redraw, scrollRef]);

  useImperativeHandle(handleRef, () => ({
    toPng: () => {
      const source = canvasRef.current;
      if (!source) return null;
      // Flatten onto white so the PNG isn't a transparent mystery.
      const flat = document.createElement("canvas");
      flat.width = source.width;
      flat.height = source.height;
      const context = flat.getContext("2d");
      if (!context) return null;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, flat.width, flat.height);
      context.drawImage(source, 0, 0);
      return flat.toDataURL("image/png");
    },
  }));

  const positionOf = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
    };
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute left-0 top-0"
      style={{
        pointerEvents: active ? "auto" : "none",
        cursor: active ? "crosshair" : "auto",
        touchAction: active ? "none" : "auto",
      }}
      onPointerDown={(event) => {
        if (!active) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drawingRef.current = true;
        onStrokeStart({ colour, width, erase, points: [positionOf(event)] });
      }}
      onPointerMove={(event) => {
        if (!active) return;
        const point = positionOf(event);
        onPointerMove(point);
        if (drawingRef.current) onStrokePoint(point);
      }}
      onPointerUp={() => {
        drawingRef.current = false;
      }}
      onPointerLeave={() => {
        drawingRef.current = false;
        onPointerMove(null);
      }}
    />
  );
}
