import Image from "next/image";
import { Code, Palette, Brain, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { CompanyLogo } from "@/components/marketing/company-logo";
import { cn } from "@/lib/utils";

export type TalentPerson = {
  name: string;
  title: string;
  expertise: string;
  previously: string;
  photo: string;
  discipline: "engineering" | "design" | "ai" | "leadership";
};

const disciplineIcon = {
  engineering: Code,
  design: Palette,
  ai: Brain,
  leadership: UsersThree,
} as const;

type TalentPhotoCardProps = {
  person: TalentPerson;
  /** `split` = image left (desktop hero). `stacked` = square card, image on top (mobile slider). */
  layout?: "split" | "stacked";
};

export function TalentPhotoCard({
  person,
  layout = "split",
}: TalentPhotoCardProps) {
  const Icon = disciplineIcon[person.discipline];
  const stacked = layout === "stacked";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg bg-panel shadow-[0_1px_2px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.06] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)]",
        stacked
          ? "flex aspect-square w-full flex-col"
          : "flex h-full min-h-[148px]",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 bg-canvas",
          stacked ? "h-[56%] w-full" : "w-[42%] self-stretch",
        )}
      >
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes={
            stacked
              ? "(max-width: 1024px) 260px, 280px"
              : "(max-width: 640px) 40vw, 180px"
          }
          className="object-cover object-top"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          stacked
            ? "justify-between gap-2 px-4 py-3.5"
            : "justify-center px-3.5 py-3.5 sm:px-4",
        )}
      >
        <div className="min-w-0">
          <h3
            className={cn(
              "font-display font-semibold leading-snug tracking-tight text-white",
              stacked ? "text-lg" : "text-[15px] text-foreground sm:text-base",
            )}
          >
            {person.name}
          </h3>
          <p
            className={cn(
              "mt-1.5 flex items-start gap-1.5 leading-snug text-muted",
              stacked ? "text-[15px]" : "text-[13px]",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 shrink-0 text-muted",
                stacked ? "h-4 w-4" : "h-3.5 w-3.5",
              )}
              weight="regular"
              aria-hidden
            />
            <span className="min-w-0">{person.title}</span>
          </p>
        </div>
        <div className="min-w-0 shrink-0">
          <p
            className={cn(
              "font-semibold uppercase tracking-[0.14em] text-muted",
              stacked ? "text-[11px]" : "text-[10px] text-muted/80",
            )}
          >
            Previously at
          </p>
          <div
            className={cn(
              "mt-1.5 flex items-center",
              stacked ? "min-h-[24px]" : "min-h-[22px]",
            )}
          >
            <CompanyLogo company={person.previously} />
          </div>
        </div>
      </div>
    </article>
  );
}
