"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  talentCategories,
  type TalentCategory,
} from "@/data/talent-menu";

function chunkSkills(skills: string[], columns = 3) {
  const size = Math.ceil(skills.length / columns);
  return Array.from({ length: columns }, (_, i) =>
    skills.slice(i * size, i * size + size),
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(talentCategories[0].id);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const active =
    talentCategories.find((c) => c.id === activeId) ?? talentCategories[0];
  const skillColumns = chunkSkills(active.skills, 3);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, [clearCloseTimer]);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 hidden cursor-default bg-ink/25 lg:block"
          aria-label="Close talent menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <header
        ref={rootRef}
        className="sticky top-0 z-40 border-b border-line bg-panel/95 backdrop-blur-md"
      >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-foreground"
          >
            Sortie Projects
          </a>
          <nav className="hidden items-center gap-1 text-sm text-muted lg:flex">
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 font-medium transition-colors hover:text-foreground",
                  open && "text-signal",
                )}
                aria-expanded={open}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setOpen((value) => !value)}
              >
                Top talent
                <CaretDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                  weight="bold"
                  aria-hidden
                />
              </button>
              {open ? (
                <span
                  className="absolute inset-x-3 -bottom-4 h-0.5 rounded-full bg-signal"
                  aria-hidden
                />
              ) : null}
            </div>

            <a
              className="rounded-md px-3 py-2 hover:text-foreground"
              href="#how-hiring-works"
            >
              How it works
            </a>
            <a
              className="rounded-md px-3 py-2 hover:text-foreground"
              href="#vetting"
            >
              Vetting
            </a>
            <a
              className="rounded-md px-3 py-2 hover:text-foreground"
              href="#network"
            >
              Network
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            className="hidden rounded-md px-4 py-2.5 text-sm font-medium text-foreground hover:bg-canvas sm:inline-flex"
            href="mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network"
          >
            Apply as talent
          </a>
          <a
            className="rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
            href="mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent"
          >
            Hire talent
          </a>
        </div>
      </div>

      {open ? (
          <div
            id={menuId}
            className="absolute inset-x-0 top-full z-50 hidden border-b border-line bg-panel shadow-[0_24px_48px_rgba(15,23,42,0.12)] lg:block"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            role="region"
            aria-label="Browse talent by category"
          >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-[220px_minmax(0,1fr)]">
              <aside className="flex flex-col border-r border-line bg-canvas/70">
                <ul className="flex flex-1 flex-col py-3" role="list">
                  {talentCategories.map((category) => (
                    <li key={category.id}>
                      <CategoryButton
                        category={category}
                        active={category.id === active.id}
                        onActivate={() => setActiveId(category.id)}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-line px-5 py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Want to hire a full team?
                  </p>
                  <a
                    className="mt-2 inline-flex text-sm font-semibold text-signal hover:text-signal-strong"
                    href="mailto:hello@sortieprojects.com?subject=Hire%20a%20Sortie%20team"
                  >
                    Hire a Team →
                  </a>
                </div>
              </aside>

              <div className="flex min-h-[340px] flex-col px-8 py-6">
                <a
                  href={active.href}
                  className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-signal hover:text-signal-strong"
                  onClick={() => setOpen(false)}
                >
                  {active.label} →
                </a>

                <div className="mt-5 grid flex-1 grid-cols-3 gap-x-8 gap-y-1">
                  {skillColumns.map((column, columnIndex) => (
                    <ul key={columnIndex} className="space-y-1" role="list">
                      {column.map((skill) => (
                        <li key={skill}>
                          <a
                            href={`mailto:hello@sortieprojects.com?subject=${encodeURIComponent(`Hire ${skill}`)}`}
                            className="block rounded-sm py-1.5 text-[13px] leading-snug text-foreground/85 transition-colors hover:text-signal"
                            onClick={() => setOpen(false)}
                          >
                            {skill}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <div className="mt-6 flex justify-end border-t border-line pt-4">
                  <a
                    href="#talent-categories"
                    className="text-sm font-semibold text-signal hover:text-signal-strong"
                    onClick={() => setOpen(false)}
                  >
                    See more skills →
                  </a>
                </div>
              </div>
            </div>
          </div>
      ) : null}
      </header>
    </>
  );
}

function CategoryButton({
  category,
  active,
  onActivate,
}: {
  category: TalentCategory;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer items-center px-5 py-3 text-left text-sm font-semibold transition-colors",
        active
          ? "bg-panel text-foreground"
          : "text-foreground/80 hover:bg-panel/70 hover:text-foreground",
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-current={active ? "true" : undefined}
    >
      {active ? (
        <span
          className="absolute inset-y-0 left-0 w-[3px] bg-signal"
          aria-hidden
        />
      ) : null}
      {category.label}
    </button>
  );
}
