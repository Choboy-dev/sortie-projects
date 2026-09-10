"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { cn } from "@/lib/utils";
import {
  talentCategories,
  type TalentCategory,
} from "@/data/talent-menu";
import { skillHref } from "@/lib/skills";

const softEase = [0.22, 1, 0.36, 1] as const;

function chunkSkills(skills: string[], columns = 3) {
  const size = Math.ceil(skills.length / columns);
  return Array.from({ length: columns }, (_, i) =>
    skills.slice(i * size, i * size + size),
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState(talentCategories[0].id);
  const [mobileTalentOpen, setMobileTalentOpen] = useState(true);
  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(
    talentCategories[0].id,
  );
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const mobileMenuId = useId();
  const reduceMotion = useReducedMotion();

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

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

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
            <BrandLogo priority markClassName="h-9 w-auto" />
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
                href="/#how-hiring-works"
              >
                How it works
              </a>
              <a
                className="rounded-md px-3 py-2 hover:text-foreground"
                href="/pricing"
              >
                Pricing
              </a>
              <a
                className="rounded-md px-3 py-2 hover:text-foreground"
                href="/about"
              >
                About
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              className="hidden text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/40 transition hover:decoration-foreground lg:inline-flex"
              href="/hire/auth"
            >
              Log in
            </a>
            <a
              className="hidden rounded-md border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-chalk/40 hover:bg-canvas active:scale-[0.98] lg:inline-flex"
              href="/apply/auth"
            >
              Find jobs
            </a>
            <a
              className="hidden items-center gap-1.5 rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98] lg:inline-flex"
              href="/hire/auth"
            >
              Start hiring
              <span aria-hidden className="text-base leading-none">
                →
              </span>
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-panel text-foreground transition hover:bg-canvas lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" weight="bold" aria-hidden />
              ) : (
                <List className="h-5 w-5" weight="bold" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id={menuId}
            className="absolute inset-x-0 top-full z-50 hidden border-b border-line bg-panel shadow-[0_24px_48px_rgba(0,0,0,0.45)] lg:block"
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
                    href="/hire/auth"
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
                            href={skillHref(active.id, skill)}
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
                    href={active.href}
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

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              key="mobile-backdrop"
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: softEase }
              }
              onClick={closeMobile}
            />
            <motion.aside
              key="mobile-drawer"
              id={mobileMenuId}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col border-l border-line bg-panel shadow-[-24px_0_48px_rgba(0,0,0,0.35)] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.38, ease: softEase }
              }
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <BrandLogo href="/" markClassName="h-7 w-auto" />
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-foreground transition hover:bg-canvas"
                  aria-label="Close menu"
                  onClick={closeMobile}
                >
                  <X className="h-5 w-5" weight="bold" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-semibold text-foreground"
                    aria-expanded={mobileTalentOpen}
                    onClick={() => setMobileTalentOpen((value) => !value)}
                  >
                    Top talent
                    <CaretDown
                      className={cn(
                        "h-4 w-4 text-muted transition-transform duration-300",
                        mobileTalentOpen && "rotate-180",
                      )}
                      weight="bold"
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileTalentOpen ? (
                      <motion.div
                        key="talent-accordion"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.28, ease: softEase }
                        }
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1 pb-2 pl-1" role="list">
                          {talentCategories.map((category) => {
                            const expanded = mobileCategoryId === category.id;
                            return (
                              <li key={category.id}>
                                <button
                                  type="button"
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium transition",
                                    expanded
                                      ? "bg-canvas text-foreground"
                                      : "text-muted hover:bg-canvas/70 hover:text-foreground",
                                  )}
                                  aria-expanded={expanded}
                                  onClick={() =>
                                    setMobileCategoryId((current) =>
                                      current === category.id
                                        ? null
                                        : category.id,
                                    )
                                  }
                                >
                                  {category.label}
                                  <CaretDown
                                    className={cn(
                                      "h-3.5 w-3.5 transition-transform duration-300",
                                      expanded && "rotate-180",
                                    )}
                                    weight="bold"
                                    aria-hidden
                                  />
                                </button>

                                <AnimatePresence initial={false}>
                                  {expanded ? (
                                    <motion.div
                                      key={`${category.id}-skills`}
                                      initial={
                                        reduceMotion
                                          ? false
                                          : { height: 0, opacity: 0 }
                                      }
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={
                                        reduceMotion
                                          ? { opacity: 0 }
                                          : { height: 0, opacity: 0 }
                                      }
                                      transition={
                                        reduceMotion
                                          ? { duration: 0 }
                                          : { duration: 0.24, ease: softEase }
                                      }
                                      className="overflow-hidden"
                                    >
                                      <ul
                                        className="space-y-0.5 py-1 pl-3"
                                        role="list"
                                      >
                                        <li>
                                          <a
                                            href={category.href}
                                            className="block rounded-md px-3 py-2 text-sm font-semibold text-signal"
                                            onClick={closeMobile}
                                          >
                                            All {category.label} →
                                          </a>
                                        </li>
                                        {category.skills.map((skill) => (
                                          <li key={skill}>
                                            <a
                                              href={skillHref(
                                                category.id,
                                                skill,
                                              )}
                                              className="block rounded-md px-3 py-2 text-sm text-foreground/85 hover:bg-canvas hover:text-foreground"
                                              onClick={closeMobile}
                                            >
                                              {skill}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  ) : null}
                                </AnimatePresence>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <a
                    className="block rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-canvas"
                    href="/#how-hiring-works"
                    onClick={closeMobile}
                  >
                    How it works
                  </a>
                  <a
                    className="block rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-canvas"
                    href="/pricing"
                    onClick={closeMobile}
                  >
                    Pricing
                  </a>
                  <a
                    className="block rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-canvas"
                    href="/about"
                    onClick={closeMobile}
                  >
                    About
                  </a>
                </div>
              </nav>

              <div className="space-y-3 border-t border-line px-5 py-5">
                <a
                  className="inline-flex text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/40"
                  href="/hire/auth"
                  onClick={closeMobile}
                >
                  Log in
                </a>
                <a
                  className="flex w-full items-center justify-center rounded-md border border-line bg-canvas px-4 py-3 text-sm font-semibold text-foreground"
                  href="/apply/auth"
                  onClick={closeMobile}
                >
                  Find jobs
                </a>
                <a
                  className="flex w-full items-center justify-center gap-1.5 rounded-md bg-signal px-4 py-3 text-sm font-semibold text-white hover:bg-signal-strong"
                  href="/hire/auth"
                  onClick={closeMobile}
                >
                  Start hiring
                  <span aria-hidden>→</span>
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
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
