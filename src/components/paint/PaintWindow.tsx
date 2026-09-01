"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { getServerSnapshot, getSnapshot, setColour, subscribe, textSafe } from "@/lib/colour";
import type { Content, Locale } from "@/content/types";
import { LOCALES } from "@/content/types";
import { cn } from "@/lib/cn";
import ToolIcon from "./ToolIcon";
import MenuBar, { type Menu } from "./MenuBar";
import Dialog from "./Dialog";
import DrawingLayer, { type DrawingHandle, type Stroke } from "./DrawingLayer";
import Taskbar from "./Taskbar";

/** MS Paint's default palette: 28 colours, two rows of fourteen. */
const PALETTE = [
  ["#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080",
   "#800080", "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000"],
  ["#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff",
   "#ff00ff", "#ffff80", "#00ff80", "#80ffff", "#8080ff", "#ff0080", "#ff8040"],
];

const BRUSH_WIDTHS = [2, 5, 11];

type Tool = "nav" | "brush" | "eraser";

export default function PaintWindow({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: Content;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const colour = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [tool, setTool] = useState<Tool>("nav");
  const [brushWidth, setBrushWidth] = useState(BRUSH_WIDTHS[1]);
  // A drawing belongs to the page it was drawn on, so it is stored with that
  // page's path and simply reads as empty once you navigate somewhere else.
  const [board, setBoard] = useState<{ path: string; strokes: Stroke[] }>({
    path: pathname,
    strokes: [],
  });
  const strokes = board.path === pathname ? board.strokes : [];

  const setStrokes = useCallback(
    (update: Stroke[] | ((previous: Stroke[]) => Stroke[])) => {
      setBoard((previous) => {
        const base = previous.path === pathname ? previous.strokes : [];
        return {
          path: pathname,
          strokes: typeof update === "function" ? update(base) : update,
        };
      });
    },
    [pathname],
  );

  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showToolbox, setShowToolbox] = useState(true);
  const [showColorbox, setShowColorbox] = useState(true);
  const [dialog, setDialog] = useState<null | "close" | "about">(null);
  const [message, setMessage] = useState<string | null>(null);

  const scrollRef = useRef<HTMLElement>(null);
  const drawingRef = useRef<DrawingHandle>(null);

  const ui = content.window;
  const drawing = tool !== "nav";
  const cursor = drawing ? pointer : null;

  // Push the colour out to CSS, which is the external system here.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--accent", colour);
    root.setProperty("--accent-ink", textSafe(colour));
  }, [colour]);

  // Land at the top of each page, the way following a link normally would.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  const undo = useCallback(() => {
    setStrokes((list) => {
      if (list.length === 0) {
        setMessage(ui.status.nothingToUndo);
        return list;
      }
      setMessage(ui.status.undone);
      return list.slice(0, -1);
    });
  }, [setStrokes, ui.status.nothingToUndo, ui.status.undone]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [undo]);

  const clearDrawing = useCallback(() => {
    setStrokes([]);
    setMessage(ui.status.cleared);
  }, [setStrokes, ui.status.cleared]);

  const savePng = useCallback(() => {
    const data = drawingRef.current?.toPng();
    if (!data) return;
    const link = document.createElement("a");
    link.href = data;
    link.download = `sedatoneer-${pathname.replace(/\//g, "-").replace(/^-/, "")}.png`;
    link.click();
    setMessage(ui.status.saved);
  }, [pathname, ui.status.saved]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content.contact.email);
      setMessage(ui.status.copied);
    } catch {
      setMessage(content.contact.email);
    }
  }, [content.contact.email, ui.status.copied]);

  const menus: Menu[] = [
    {
      label: ui.menus.file.label,
      items: [
        { label: ui.menus.file.newDrawing, onSelect: clearDrawing },
        { label: ui.menus.file.savePng, onSelect: savePng, disabled: strokes.length === 0 },
        { label: ui.menus.file.print, onSelect: () => window.print(), shortcut: "Ctrl+P" },
        { label: ui.menus.file.close, onSelect: () => setDialog("close") },
      ],
    },
    {
      label: ui.menus.edit.label,
      items: [
        { label: ui.menus.edit.undo, onSelect: undo, shortcut: "Ctrl+Z", disabled: strokes.length === 0 },
        { label: ui.menus.edit.clear, onSelect: clearDrawing, disabled: strokes.length === 0 },
        { label: ui.menus.edit.copyEmail, onSelect: copyEmail },
      ],
    },
    {
      label: ui.menus.view.label,
      items: [
        { label: ui.menus.view.toolbox, onSelect: () => setShowToolbox((v) => !v), checked: showToolbox },
        { label: ui.menus.view.colorbox, onSelect: () => setShowColorbox((v) => !v), checked: showColorbox },
        { label: ui.menus.view.maximize, onSelect: () => setMaximized((v) => !v), checked: maximized },
      ],
    },
    {
      label: ui.menus.help.label,
      items: [{ label: ui.menus.help.about, onSelect: () => setDialog("about") }],
    },
  ];

  const pages = [
    { key: "home", href: `/${locale}`, label: content.nav.home },
    { key: "projects", href: `/${locale}/projects`, label: content.nav.projects },
    { key: "about", href: `/${locale}/about`, label: content.nav.about },
    { key: "contact", href: `/${locale}/contact`, label: content.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  const current = pages.find((page) => isActive(page.href))?.label ?? content.nav.home;

  const otherLocale = LOCALES.find((l) => l !== locale)!;
  const rest = pathname.split("/").slice(2).join("/");
  const localeHref = `/${otherLocale}${rest ? `/${rest}` : ""}`;

  const statusText = cursor
    ? `${cursor.x}, ${cursor.y}`
    : message ?? (drawing ? ui.status.drawing : ui.status.hint);

  return (
    <>
      <div
        className={cn(
          "flex h-dvh flex-col pb-[30px]",
          maximized ? "px-0 pt-0" : "px-0 pt-0 sm:px-3 sm:pt-3 md:px-6 md:pt-6",
          minimized && "invisible",
        )}
      >
        <div
          className={cn(
            "bevel-out print-page mx-auto flex h-full w-full flex-col bg-silver p-[3px]",
            !maximized && "max-w-5xl",
          )}
        >
          {/* Title bar */}
          <div className="print-chrome on-title flex items-center gap-2 bg-title px-1.5 py-[3px]">
            <svg aria-hidden viewBox="0 0 16 16" width={14} height={14} shapeRendering="crispEdges">
              <rect x="1" y="1" width="14" height="14" fill="#fff" stroke="#000" />
              <path d="M3 12 L7 5 L10 9 L12 7 L13 12 Z" fill={colour} stroke="#000" strokeWidth="1" />
            </svg>
            <span className="flex-1 truncate text-[13px] font-bold text-title-text">
              {current} — Paint
            </span>
            <span className="flex gap-[2px]">
              <WindowButton label={ui.controls.minimize} glyph="–" onClick={() => setMinimized(true)} />
              <WindowButton
                label={maximized ? ui.controls.restore : ui.controls.maximize}
                glyph="□"
                onClick={() => setMaximized((v) => !v)}
              />
              <WindowButton label={ui.controls.close} glyph="✕" onClick={() => setDialog("close")} />
            </span>
          </div>

          <div className="print-chrome">
          <MenuBar
            menus={menus}
            trailing={
              <Link
                href={localeHref}
                hrefLang={otherLocale}
                className="px-2 py-[1px] text-[12px] underline underline-offset-2"
              >
                {otherLocale.toUpperCase()}
              </Link>
            }
          />
          </div>

          <div className="print-page flex min-h-0 flex-1 flex-col gap-[3px] p-[3px] lg:flex-row">
            {/* Tool box */}
            {showToolbox ? (
              <div className="print-chrome bevel-out shrink-0 bg-silver p-[3px] lg:w-[8rem] lg:self-start">
                <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-wide">
                  {ui.tools.pages}
                </p>
                <nav aria-label={ui.tools.pages} className="flex flex-row flex-wrap gap-[2px] lg:flex-col">
                  {pages.map((page) => {
                    const active = isActive(page.href);
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setTool("nav")}
                        className={cn(
                          "flex w-[calc(50%-1px)] items-center gap-2 px-2 py-[6px] text-[12px] lg:w-auto",
                          active ? "bevel-in bg-light font-bold" : "bevel-out bg-silver",
                        )}
                      >
                        <ToolIcon name={page.key} />
                        <span className="truncate">{page.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <p className="px-1 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide">
                  {ui.tools.draw}
                </p>
                <div className="flex flex-row flex-wrap gap-[2px] lg:flex-col">
                  {(
                    [
                      { key: "brush", label: ui.tools.brush },
                      { key: "eraser", label: ui.tools.eraser },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={tool === item.key}
                      onClick={() => setTool(tool === item.key ? "nav" : item.key)}
                      className={cn(
                        "flex w-[calc(50%-1px)] items-center gap-2 px-2 py-[6px] text-[12px] lg:w-auto",
                        tool === item.key ? "bevel-in bg-light font-bold" : "bevel-out bg-silver",
                      )}
                    >
                      <ToolIcon name={item.key} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>

                {drawing ? (
                  <div className="mt-2">
                    <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-wide">
                      {ui.tools.size}
                    </p>
                    <div className="bevel-in flex items-center justify-around bg-canvas py-1">
                      {BRUSH_WIDTHS.map((width) => (
                        <button
                          key={width}
                          type="button"
                          aria-pressed={brushWidth === width}
                          aria-label={`${ui.tools.size} ${width}`}
                          onClick={() => setBrushWidth(width)}
                          className={cn(
                            "flex size-6 items-center justify-center",
                            brushWidth === width && "bg-title",
                          )}
                        >
                          <span
                            aria-hidden
                            className="rounded-full"
                            style={{
                              width,
                              height: width,
                              background: brushWidth === width ? "#fff" : "#000",
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Canvas */}
            <div className="print-page relative min-h-0 min-w-0 flex-1">
              <main
                ref={scrollRef}
                id="main"
                tabIndex={0}
                className="canvas print-page bevel-field relative h-full overflow-y-auto bg-canvas p-5 sm:p-8 lg:p-10"
              >
                {children}
                <DrawingLayer
                  scrollRef={scrollRef}
                  handleRef={drawingRef}
                  strokes={strokes}
                  active={drawing}
                  colour={colour}
                  width={brushWidth}
                  erase={tool === "eraser"}
                  onStrokeStart={(stroke) => setStrokes((list) => [...list, stroke])}
                  onStrokePoint={(point) =>
                    setStrokes((list) => {
                      if (list.length === 0) return list;
                      const last = list[list.length - 1];
                      return [
                        ...list.slice(0, -1),
                        { ...last, points: [...last.points, point] },
                      ];
                    })
                  }
                  onPointerMove={setPointer}
                />
              </main>
            </div>
          </div>

          {/* Colour box */}
          {showColorbox ? (
            <div className="print-chrome flex flex-wrap items-center gap-2 px-[3px] pb-[3px]">
              <span aria-hidden className="bevel-in size-[30px] shrink-0" style={{ background: colour }} />
              <div
                role="group"
                aria-label={ui.status.hint}
                className="bevel-out flex flex-col gap-[1px] bg-silver p-[2px]"
              >
                {PALETTE.map((row, index) => (
                  <div key={index} className="flex gap-[1px]">
                    {row.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setColour(value);
                          setMessage(`${ui.status.picked} ${value}`);
                        }}
                        aria-pressed={colour === value}
                        aria-label={value}
                        title={value}
                        className="bevel-field size-[15px] sm:size-[17px]"
                        style={{ background: value }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Status bar */}
          <div className="print-chrome flex gap-[3px] px-[3px] pb-[2px] text-[11px]">
            <span className="bevel-field min-w-0 flex-1 truncate px-2 py-[2px]">{statusText}</span>
            <span className="bevel-field hidden px-2 py-[2px] sm:block">{colour}</span>
          </div>
        </div>
      </div>

      <Taskbar
        locale={locale}
        content={content}
        title={`${current} — Paint`}
        minimized={minimized}
        onToggleWindow={() => setMinimized((v) => !v)}
      />

      {dialog === "close" ? (
        <Dialog
          title={ui.dialog.closeTitle}
          closeLabel={ui.controls.close}
          onDismiss={() => setDialog(null)}
          buttons={[
            {
              label: ui.dialog.save,
              onClick: () => {
                savePng();
                setDialog(null);
              },
            },
            {
              label: ui.dialog.dontSave,
              onClick: () => {
                setStrokes([]);
                setDialog(null);
                setMinimized(true);
              },
            },
            { label: ui.dialog.cancel, onClick: () => setDialog(null) },
          ]}
        >
          {ui.dialog.closeBody}
        </Dialog>
      ) : null}

      {dialog === "about" ? (
        <Dialog
          title={ui.dialog.aboutTitle}
          closeLabel={ui.controls.close}
          onDismiss={() => setDialog(null)}
          buttons={[{ label: ui.dialog.ok, onClick: () => setDialog(null) }]}
        >
          <div className="flex gap-4">
            <svg aria-hidden viewBox="0 0 16 16" width={36} height={36} shapeRendering="crispEdges" className="shrink-0">
              <rect x="1" y="1" width="14" height="14" fill="#fff" stroke="#000" />
              <path d="M3 12 L7 5 L10 9 L12 7 L13 12 Z" fill={colour} stroke="#000" strokeWidth="1" />
            </svg>
            <div>
              <p>{ui.dialog.aboutBody}</p>
              <p className="mt-3 font-bold">{ui.dialog.aboutCredit}</p>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}

function WindowButton({
  label,
  glyph,
  onClick,
}: {
  label: string;
  glyph: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="bevel-out flex size-[18px] items-center justify-center bg-silver text-[10px] leading-none text-ink"
    >
      <span aria-hidden>{glyph}</span>
    </button>
  );
}
