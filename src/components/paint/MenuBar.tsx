"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MenuItem {
  label: string;
  onSelect: () => void;
  /** Shown right-aligned, the way Windows shows shortcuts. */
  shortcut?: string;
  /** Draws the tick box for a toggle. */
  checked?: boolean;
  disabled?: boolean;
}

export interface Menu {
  label: string;
  items: MenuItem[];
}

/**
 * A Windows 95 menu bar: click to open, hover to move between menus once one is
 * open, Escape to close, click anywhere else to dismiss.
 */
export default function MenuBar({ menus, trailing }: { menus: Menu[]; trailing?: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open === null) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={barRef}
      className="relative z-30 flex items-center gap-0.5 border-b border-shadow px-1 py-[2px]"
    >
      {menus.map((menu, index) => {
        const isOpen = open === index;
        return (
          <div key={menu.label} className="relative">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-haspopup="menu"
              onClick={() => setOpen(isOpen ? null : index)}
              onPointerEnter={() => open !== null && setOpen(index)}
              className={cn(
                "px-2 py-[2px] text-[12px]",
                isOpen && "bg-title text-title-text",
              )}
            >
              {menu.label}
            </button>

            {isOpen ? (
              <div
                role="menu"
                aria-label={menu.label}
                className="bevel-out absolute left-0 top-full min-w-[13rem] bg-silver py-[2px]"
              >
                {menu.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      setOpen(null);
                      item.onSelect();
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-2 py-[3px] text-left text-[12px]",
                      item.disabled
                        ? "text-shadow"
                        : "hover:bg-title hover:text-title-text",
                    )}
                  >
                    <span aria-hidden className="w-3 shrink-0 text-center">
                      {item.checked ? "✓" : ""}
                    </span>
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    {item.shortcut ? (
                      <span aria-hidden className="shrink-0 opacity-70">
                        {item.shortcut}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}

      {trailing ? <div className="ml-auto">{trailing}</div> : null}
    </div>
  );
}
