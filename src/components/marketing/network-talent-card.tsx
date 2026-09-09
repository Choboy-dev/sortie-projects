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
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-panel shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_32px_rgba(15,23,42,0.1)]">
      <div className="relative aspect-[4/3] w-full shrink-0 bg-canvas">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-0 w-0 border-b-[32px] border-l-[32px] border-b-transparent border-l-panel"
          aria-hidden
        />
        <Image
          src="/brand/sortie-mark.png"
          alt=""
          width={32}
          height={28}
          className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-auto object-contain"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="font-display text-lg font-semibold tracking-tight text-signal">
          {person.name}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-signal">
          <CheckCircle
            className="h-4 w-4 shrink-0"
            weight="fill"
            aria-hidden
          />
          <span>{person.expertise}</span>
        </p>

        <p className="mt-2.5 flex items-start gap-1.5 text-sm leading-snug text-muted">
          <Icon
            className="mt-0.5 h-4 w-4 shrink-0 text-muted"
            weight="regular"
            aria-hidden
          />
          <span>{person.title}</span>
        </p>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
          Expertise
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {person.skills.map((skill) => (
            <li
              key={skill}
              className="rounded border border-line bg-panel px-2 py-1 text-xs text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
            Previously at
          </p>
          <div className="mt-2 flex min-h-[24px] items-center">
            <CompanyLogo company={person.previously} />
          </div>
        </div>
      </div>
    </article>
  );
}
