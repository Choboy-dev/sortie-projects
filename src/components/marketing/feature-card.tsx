import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type FeatureCardColors = {
  bg: string;
  text: string;
  border: string;
};

export const sortieFeatureColors: FeatureCardColors = {
  bg: "bg-[#1a1412]",
  text: "text-signal",
  border: "border-signal/25",
};

type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  icon: Icon;
  className?: string;
  colors?: FeatureCardColors;
};

export function FeatureCard({
  number,
  title,
  description,
  icon: Icon,
  className,
  colors = sortieFeatureColors,
}: FeatureCardProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex h-full flex-col rounded-[25px] border border-line bg-panel p-2 shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]">
        <Icon
          className="mx-auto mb-3 mt-2 h-8 w-8 shrink-0 text-white"
          weight="regular"
          aria-hidden
        />
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[15px] border p-[15px]",
            colors.bg,
            colors.border,
          )}
        >
          <span className="mb-5 font-display text-4xl font-semibold tracking-tight text-white">
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
