"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const ringX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 28 });
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 32 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 32 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMove);

    const interactive = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 48 : 34,
          height: hovered ? 48 : 34,
          border: "1px solid var(--teal)",
          opacity: visible ? (hovered ? 0.5 : 0.35) : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9998]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 10 : 5,
          height: hovered ? 10 : 5,
          background: "var(--teal)",
          opacity: visible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
