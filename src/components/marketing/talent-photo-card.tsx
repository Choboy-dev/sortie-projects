import Image from "next/image";
import { Code, Palette, Brain, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { CompanyLogo } from "@/components/marketing/company-logo";

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

export function TalentPhotoCard({ person }: { person: TalentPerson }) {
  const Icon = disciplineIcon[person.discipline];

  return (
    <article className="group flex h-full min-h-[148px] overflow-hidden rounded-md bg-panel shadow-[0_1px_2px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.06] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_16px_32px_rgba(0,0,0,0.35)]">
      <div className="relative w-[42%] shrink-0 self-stretch bg-canvas">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 40vw, 180px"
          className="object-cover object-top"
        />
      </div>

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
    </article>
  );
}
