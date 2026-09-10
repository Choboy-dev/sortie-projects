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
  /** `split` = image left (desktop hero). `stacked` = image on top (mobile slider). */
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
        stacked ? "flex w-full flex-col" : "flex h-full min-h-[148px]",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 bg-canvas",
          stacked ? "aspect-[4/3] w-full" : "w-[42%] self-stretch",
        )}
      >
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes={
            stacked
              ? "(max-width: 1024px) 280px, 280px"
              : "(max-width: 640px) 40vw, 180px"
          }
          className="object-cover object-top"
        />
      </div>

      {stacked ? (
        <div className="flex shrink-0 flex-col gap-3 px-4 py-4">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-white">
              {person.name}
            </h3>
            <p className="mt-1.5 flex items-start gap-1.5 text-[15px] leading-snug text-muted">
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                weight="regular"
                aria-hidden
              />
              <span className="min-w-0">{person.title}</span>
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Previously at
            </p>
            <div className="mt-2 flex min-h-[28px] items-center">
              <CompanyLogo company={person.previously} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3.5 sm:px-4">
          <h3 className="font-display text-[15px] font-semibold leading-snug tracking-tight text-foreground sm:text-base">
            {person.name}
          </h3>
          <p className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-muted">
            <Icon
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
              weight="regular"
              aria-hidden
            />
            <span>{person.title}</span>
          </p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
            Previously at
          </p>
          <div className="mt-1.5 flex min-h-[22px] items-center">
            <CompanyLogo company={person.previously} />
          </div>
        </div>
      )}
    </article>
  );
}
