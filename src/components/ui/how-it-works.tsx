"use client";

import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ThemeColors = {
  bg: string;
  text: string;
  border: string;
};

interface CardProps {
  number: string;
  title: string;
  description: string;
  icon: Icon;
  className?: string;
  rotate?: string;
  colors: ThemeColors;
}

function Card({
  number,
  title,
  description,
  icon: Icon,
  className,
  rotate,
  colors,
}: CardProps) {
  return (
    <div
      className={cn(
        "relative w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-30 hover:scale-[1.03] md:w-[280px]",
        rotate,
        className,
      )}
    >
      <div className="rounded-[25px] border border-line bg-panel p-2 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
        <Icon
          className={cn("mx-auto mb-5 h-8 w-8", colors.text)}
          weight="regular"
          aria-hidden
        />
        <div
          className={cn(
            "relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px]",
            colors.bg,
            colors.border,
          )}
        >
          <span
            className={cn(
              "mb-5 font-display text-4xl font-semibold tracking-tight",
              colors.text,
            )}
          >
            {number}
          </span>
          <h3 className="mb-2.5 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm leading-relaxed tracking-tight text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface Step {
  title: string;
  description: string;
  icon: Icon;
  colors?: ThemeColors;
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

const sortieGreen: ThemeColors = {
  bg: "bg-[#eef6f2]",
  text: "text-signal",
  border: "border-signal/15",
};

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[120px] md:right-[15%]",
    rotate: "-rotate-6",
  },
  { className: "md:absolute md:top-[420px] md:left-[15%]", rotate: "rotate-6" },
  {
    className: "md:absolute md:top-[540px] md:right-[10%]",
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
  else height = 900;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "relative bg-canvas px-6 py-20 max-md:pb-24 sm:px-8 sm:py-24",
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
                      return "M 290 150 C 500 150, 550 270, 710 270";
                    if (index === 1)
                      return `${acc} C 850 270, 500 350, 290 450`;
                    if (index === 2)
                      return `${acc} C 290 600, 550 720, 750 720`;
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
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  colors={step.colors || sortieGreen}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
