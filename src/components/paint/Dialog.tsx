"use client";

import { useEffect, useId, useRef } from "react";

export interface DialogButton {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

/**
 * A Windows 95 modal: navy caption, a message, and a row of push buttons.
 * Escape cancels, focus starts on the primary button and stays inside.
 */
export default function Dialog({
  title,
  children,
  buttons,
  onDismiss,
  closeLabel,
}: {
  title: string;
  children: React.ReactNode;
  buttons: DialogButton[];
  onDismiss: () => void;
  closeLabel: string;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bevel-out w-full max-w-sm bg-silver p-[3px]"
      >
        <div className="on-title flex items-center bg-title px-2 py-[3px]">
          <span id={titleId} className="flex-1 text-[13px] font-bold text-title-text">
            {title}
          </span>
          <button
            type="button"
            onClick={onDismiss}
            aria-label={closeLabel}
            className="bevel-out flex size-[18px] items-center justify-center bg-silver text-[10px] leading-none"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="px-5 py-5 text-[13px] leading-[1.6]">{children}</div>

        <div className="flex flex-wrap justify-center gap-2 px-4 pb-4">
          {buttons.map((button, index) => (
            <button
              key={button.label}
              ref={index === 0 ? firstRef : undefined}
              type="button"
              onClick={button.onClick}
              className="btn min-w-[6rem]"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
