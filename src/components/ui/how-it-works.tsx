"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  FeatureCard,
  sortieFeatureColors,
  type FeatureCardColors,
} from "@/components/marketing/feature-card";

export interface Step {
  title: string;
  description: string;
  icon: Icon;
  colors?: FeatureCardColors;
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
  heading?: string;
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[110px] md:right-[15%]",
    rotate: "-rotate-6",
  },
  { className: "md:absolute md:top-[360px] md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[470px] md:right-[10%]",
    rotate: "-rotate-6",
  },
];

export default function HowItWorks({
  features = [],
  className,
  stepPositions,
  heading,
}: HowItWorksProps) {
  const reduceMotion = useReducedMotion();
  const data = features;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 900;
  if (data.length <= 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else height = 860;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "relative bg-canvas px-6 pb-6 pt-20 max-md:pb-10 sm:px-8 sm:pb-8 sm:pt-24",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(#0c1410 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-canvas to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-canvas to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {heading ? (
            <h2 className="mx-auto mb-12 max-w-2xl text-center font-display text-3xl font-semibold tracking-tight sm:mb-16 sm:text-4xl md:text-left">
              {heading}
            </h2>
          ) : null}

          <div
            className="relative mx-auto flex h-auto w-full max-w-[1000px] flex-col space-y-8 md:block md:h-[var(--md-height)] md:space-y-0"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 ? (
              <svg
                className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full md:block"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
                aria-hidden
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 140 C 500 140, 550 250, 710 250";
                    if (index === 1)
                      return `${acc} C 850 250, 500 320, 290 400`;
                    if (index === 2)
                      return `${acc} C 290 520, 550 620, 750 620`;
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-line"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={
                        reduceMotion
                          ? { strokeDashoffset: 0 }
                          : { strokeDashoffset: -140 }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }
                      }
                    />
                  );
                })()}
              </svg>
            ) : null}

            {data.map((step, index) => {
              const position = positions[index % positions.length];
              return (
                <div
                  key={step.title}
                  className={cn(
                    "relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-30 hover:scale-[1.03] md:w-[280px]",
                    position.rotate,
                    position.className,
                  )}
                >
                  <FeatureCard
                    number={`0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    colors={step.colors || sortieFeatureColors}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
