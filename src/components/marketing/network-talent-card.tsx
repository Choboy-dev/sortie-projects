import Image from "next/image";
import {
  CheckCircle,
  Code,
  Palette,
  Brain,
  UsersThree,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { CompanyLogo } from "@/components/marketing/company-logo";
import type { TalentPerson } from "@/components/marketing/talent-photo-card";

const disciplineIcon = {
  engineering: Code,
  design: Palette,
  ai: Brain,
  leadership: UsersThree,
  security: ShieldCheck,
} as const;

export type NetworkTalentPerson = TalentPerson & {
  skills: string[];
};

export function NetworkTalentCard({ person }: { person: NetworkTalentPerson }) {
  const Icon =
    disciplineIcon[person.discipline as keyof typeof disciplineIcon] ?? Code;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-panel shadow-[0_1px_2px_rgba(0,0,0,0.35),0_6px_18px_rgba(0,0,0,0.28)] ring-1 ring-white/[0.06] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_12px_24px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-[5/4] w-full shrink-0 bg-canvas">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <h3 className="font-display text-base font-semibold tracking-tight text-white sm:text-[17px]">
          {person.name}
        </h3>

        <p className="mt-1.5 flex items-center gap-1 text-[13px] font-medium leading-snug text-white sm:text-sm">
          <CheckCircle
            className="h-4 w-4 shrink-0 text-white"
            weight="fill"
            aria-hidden
          />
          <span>{person.expertise}</span>
        </p>

        <p className="mt-1.5 flex items-start gap-1 text-[12px] leading-snug text-muted">
          <Icon
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted"
            weight="regular"
            aria-hidden
          />
          <span>{person.title}</span>
        </p>

        <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted/80">
          Expertise
        </p>
        <ul className="mt-1.5 flex flex-wrap gap-1">
          {person.skills.map((skill) => (
            <li
              key={skill}
              className="rounded border border-line bg-panel px-1.5 py-0.5 text-[11px] text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted/80">
            Previously at
          </p>
          <div className="mt-1.5 flex min-h-[20px] scale-90 origin-left items-center">
            <CompanyLogo company={person.previously} />
          </div>
        </div>
      </div>
    </article>
  );
}
