"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SkillTalentCard } from "@/components/skills/skill-talent-card";
import { cn } from "@/lib/utils";
import type { ShowcaseTalent } from "@/lib/skills/types";

type SkillTalentSectionProps = {
  skillLabel: string;
  talent: ShowcaseTalent[];
};

export function SkillTalentSection({
  skillLabel,
  talent,
}: SkillTalentSectionProps) {
  const reduce = useReducedMotion();
  const regions = useMemo(() => {
    const unique = [...new Set(talent.map((t) => t.region))];
    return ["All regions", ...unique];
  }, [talent]);

  const [region, setRegion] = useState("All regions");

  const filtered = useMemo(() => {
    if (region === "All regions") return talent;
    return talent.filter((t) => t.region === region);
  }, [talent, region]);

  return (
    <section id="talent" className="border-b border-line bg-panel">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Hire {skillLabel}
          </h2>
          <p className="mt-3 text-lg text-muted">
            Showcase profiles from the Sortie network. Filter by collaboration
            region, then start a hire brief to get matched.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Talent navigator
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by region"
          >
            {regions.map((item) => {
              const active = item === region;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRegion(item)}
                  className={cn(
                    "cursor-pointer rounded-md px-3.5 py-2 text-sm font-medium transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active
                      ? "bg-signal text-white"
                      : "border border-line bg-canvas text-foreground hover:border-signal/35",
                  )}
                  aria-pressed={active}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length > 0 ? (
              filtered.map((person) => (
                <motion.div
                  key={person.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SkillTalentCard person={person} />
                </motion.div>
              ))
            ) : (
              <p className="py-10 text-muted">
                No showcase profiles in this region yet.{" "}
                <a
                  href="/hire/auth"
                  className="font-medium text-signal hover:text-signal-strong"
                >
                  Request a match
                </a>
                .
              </p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <a
            href="/hire/auth"
            className="inline-flex text-sm font-semibold text-signal hover:text-signal-strong"
          >
            Discover more {skillLabel.toLowerCase()} in the Sortie network →
          </a>
        </div>
      </div>
    </section>
  );
}
