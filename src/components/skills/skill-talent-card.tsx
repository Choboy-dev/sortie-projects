import Image from "next/image";
import { CheckCircle, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { CompanyLogo } from "@/components/marketing/company-logo";
import type { ShowcaseTalent } from "@/lib/skills/types";

export function SkillTalentCard({ person }: { person: ShowcaseTalent }) {
  return (
    <article className="grid gap-6 border-b border-line py-10 first:pt-0 last:border-b-0 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[160px] overflow-hidden rounded-md bg-canvas ring-1 ring-black/[0.04] sm:mx-0">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="160px"
          className="object-cover object-top"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-signal">
            {person.name}
          </h3>
          <p className="text-sm text-muted">{person.location}</p>
        </div>

        <p className="mt-1 text-sm font-medium text-foreground">{person.title}</p>

        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-signal">
          <CheckCircle className="h-4 w-4 shrink-0" weight="fill" aria-hidden />
          {person.expertise}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 shrink-0" weight="regular" aria-hidden />
            {person.timezone}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" weight="regular" aria-hidden />
            {person.region}
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
          {person.bio}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {person.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-line bg-panel px-2 py-0.5 text-xs capitalize text-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              Previously at
            </p>
            <div className="mt-1.5">
              <CompanyLogo company={person.previously} />
            </div>
          </div>
          <a
            href="/hire/auth"
            className="inline-flex rounded-md border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-signal/40 hover:text-signal active:scale-[0.98]"
          >
            Hire {person.name.split(" ")[0]}
          </a>
        </div>
      </div>
    </article>
  );
}
