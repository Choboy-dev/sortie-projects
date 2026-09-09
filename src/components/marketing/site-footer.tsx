import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { talentCategories } from "@/data/talent-menu";

const hireTalent = [
  { label: "Hire Freelance Developers", href: "#talent-categories" },
  { label: "Hire Freelance Designers", href: "#talent-categories" },
  { label: "Hire Freelance Marketing Experts", href: "#talent-categories" },
  { label: "Hire Freelance Product Managers", href: "#talent-categories" },
  { label: "Hire Freelance Project Managers", href: "#talent-categories" },
  { label: "Hire Freelance Data Scientists", href: "#talent-categories" },
  {
    label: "Hire Top Talent",
    href: "mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent",
  },
] as const;

const aboutLinks = [
  { label: "How Hiring Works", href: "#how-hiring-works" },
  { label: "Vetting Process", href: "#vetting" },
  { label: "Meet the Network", href: "#network" },
  {
    label: "Contact",
    href: "mailto:hello@sortieprojects.com?subject=Contact%20Sortie",
  },
  {
    label: "Apply as Talent",
    href: "mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network",
  },
] as const;

const moreLinks = [
  {
    label: "Hire Sortie Talent",
    href: "mailto:hello@sortieprojects.com?subject=Hire%20Sortie%20talent",
  },
  {
    label: "Join the Network",
    href: "mailto:hello@sortieprojects.com?subject=Apply%20to%20the%20Sortie%20network",
  },
  { label: "Why Sortie", href: "#vetting" },
] as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: LinkedinLogo,
  },
  { label: "X", href: "https://x.com/", Icon: XLogo },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookLogo,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramLogo,
  },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "mailto:hello@sortieprojects.com?subject=Privacy%20Policy" },
  { label: "Website Terms", href: "mailto:hello@sortieprojects.com?subject=Website%20Terms" },
  { label: "Accessibility", href: "mailto:hello@sortieprojects.com?subject=Accessibility" },
] as const;

function featuredSkillColumns() {
  const skills = talentCategories.flatMap((category) => category.skills);
  const picked = skills.slice(0, 30);
  const size = Math.ceil(picked.length / 3);
  return [
    picked.slice(0, size),
    picked.slice(size, size * 2),
    picked.slice(size * 2),
  ];
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-[13px] leading-6 text-chalk/75 transition-colors hover:text-chalk"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const skillColumns = featuredSkillColumns();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr_0.9fr] lg:gap-12 xl:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-tight text-chalk">
              Hire Talent
            </p>
            <ul className="mt-4 space-y-1">
              {hireTalent.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-chalk">
              Featured Skills
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-3">
              {skillColumns.map((column, index) => (
                <ul key={index} className="space-y-1">
                  {column.map((skill) => (
                    <li key={skill}>
                      <FooterLink href="#talent-categories">{skill}</FooterLink>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold tracking-tight text-chalk">
                About
              </p>
              <ul className="mt-4 space-y-1">
                {aboutLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-chalk/15 pt-8">
              <p className="text-sm font-semibold tracking-tight text-chalk">
                More from Sortie
              </p>
              <ul className="mt-4 space-y-1">
                {moreLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-chalk/15 pt-8 sm:mt-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <BrandLogo
                href="/"
                markClassName="h-7 w-auto brightness-0 invert"
                wordmarkClassName="text-chalk"
              />
              <p className="text-sm text-chalk/70 sm:border-l sm:border-chalk/20 sm:pl-4">
                Africa’s Top 1% Talent, On Demand
              </p>
            </div>

            <ul className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-chalk/35 text-chalk transition-colors hover:border-chalk hover:bg-chalk/5"
                  >
                    <Icon className="h-4 w-4" weight="regular" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-chalk/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-6 py-5 text-center text-xs text-chalk/55 sm:flex-row sm:justify-center sm:gap-0 sm:px-8">
          <p>Copyright {year} Sortie Projects</p>
          <span className="hidden sm:inline" aria-hidden>
            &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-0">
            {legalLinks.map((item, index) => (
              <li key={item.label} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="px-2" aria-hidden>
                    |
                  </span>
                ) : null}
                <a
                  href={item.href}
                  className="transition-colors hover:text-chalk"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
