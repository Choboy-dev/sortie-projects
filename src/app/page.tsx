import {
  TalentPhotoCard,
} from "@/components/marketing/talent-photo-card";
import {
  NetworkTalentCard,
  type NetworkTalentPerson,
} from "@/components/marketing/network-talent-card";
import { SiteHeader } from "@/components/marketing/site-header";
import { TalentCategoriesSection } from "@/components/marketing/talent-categories-section";
import { ValuePropsSection } from "@/components/marketing/value-props-section";
import { HiringStepsSection } from "@/components/marketing/hiring-steps-section";
import { VettingSection } from "@/components/marketing/vetting-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { LogoMarquee, type Logo } from "@/components/ui/logo-marquee";
import { ShaderBackground } from "@/components/ui/mesh-portfolio";
import { HeroTalentSlider } from "@/components/marketing/hero-talent-slider";

const talent: NetworkTalentPerson[] = [
  {
    name: "Amara Okonkwo",
    title: "Staff Backend Engineer",
    expertise: "Verified Expert in Engineering",
    previously: "Stripe",
    discipline: "engineering",
    skills: ["PostgreSQL", "Go", "Distributed Systems"],
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Daniel Cho",
    title: "Senior Product Designer",
    expertise: "Verified Expert in Design",
    previously: "Figma",
    discipline: "design",
    skills: ["Product Design", "Design Systems", "Prototyping"],
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Sofia Martins",
    title: "ML Engineer",
    expertise: "Verified Expert in AI",
    previously: "DeepMind",
    discipline: "ai",
    skills: ["PyTorch", "LLM Ops", "Python"],
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "James Whitfield",
    title: "Engineering Manager",
    expertise: "Verified Expert in Leadership",
    previously: "Shopify",
    discipline: "leadership",
    skills: ["Team Leadership", "Platform", "Hiring"],
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Priya Nair",
    title: "Full-Stack Engineer",
    expertise: "Verified Expert in Engineering",
    previously: "Vercel",
    discipline: "engineering",
    skills: ["TypeScript", "Next.js", "React"],
    photo:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Lucas Berger",
    title: "Security Engineer",
    expertise: "Verified Expert in Security",
    previously: "Cloudflare",
    discipline: "engineering",
    skills: ["AppSec", "Zero Trust", "Threat Modeling"],
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Ngozi Adeyemi",
    title: "Senior Product Manager",
    expertise: "Verified Expert in Product",
    previously: "Flutterwave",
    discipline: "leadership",
    skills: ["Roadmapping", "0-to-1", "Growth"],
    photo:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=640&h=800&q=80",
  },
  {
    name: "Kwame Mensah",
    title: "DevOps Engineer",
    expertise: "Verified Expert in Engineering",
    previously: "Andela",
    discipline: "engineering",
    skills: ["AWS", "Terraform", "Kubernetes"],
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&h=800&q=80",
  },
];

const trustLogos: Logo[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg",
    alt: "Nvidia",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/31/319eeae853dd1af99d442b6c16b6c38dc52a66a719f8e502c65f85d26255cbd3.svg",
    alt: "Supabase",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/2b/2bcdd4124223e3bf8e66bc08ce0ac32a6cc42ffe3584bbecfd377847176a188d.svg",
    alt: "OpenAI",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/56/5624b7c243ac8d60e848fb5ea222ec932c1600df54a2762238b37498372fb0c8.svg",
    alt: "Vercel",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/90/90f01a9537335666282ae5acc80bd4305f86d085a92d60904c3aa3ccc4414570.svg",
    alt: "GitHub",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg",
    alt: "Clerk",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg",
    alt: "Turso",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg",
    alt: "Claude",
  },
];

const skills = [
  "React",
  "Node.js",
  "Python",
  "Go",
  "TypeScript",
  "AWS",
  "Kubernetes",
  "System Design",
  "Machine Learning",
  "Product Design",
  "iOS",
  "Android",
  "DevOps",
  "Data Engineering",
  "Security",
  "Growth Marketing",
  "Next.js",
  "PostgreSQL",
  "Rust",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Django",
  "FastAPI",
  "GraphQL",
  "gRPC",
  "Redis",
  "MongoDB",
  "Snowflake",
  "dbt",
  "Apache Spark",
  "Airflow",
  "Terraform",
  "Docker",
  "Azure",
  "GCP",
  "CI/CD",
  "Observability",
  "LLM Engineering",
  "RAG Systems",
  "Prompt Engineering",
  "MLOps",
  "Computer Vision",
  "NLP",
  "Figma",
  "Design Systems",
  "UX Research",
  "UI Design",
  "Motion Design",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "Cybersecurity",
  "AppSec",
  "Zero Trust",
  "SEO",
  "Paid Media",
  "Product Management",
  "Agile Coaching",
  "Salesforce",
  "Shopify",
  "Blockchain",
  "Solidity",
  "Data Analytics",
  "Power BI",
  "Tableau",
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-panel text-foreground">
      <SiteHeader />

      <main id="main">
        {/* Hero + trust logos = first viewport */}
        <section className="relative flex min-h-[calc(100dvh-4.75rem)] flex-col overflow-hidden border-b border-line">
          <div className="relative isolate flex min-h-0 flex-1 flex-col">
            <div
              className="pointer-events-none absolute inset-0 motion-reduce:hidden"
              aria-hidden
            >
              <ShaderBackground className="absolute inset-0 h-full w-full" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 hidden bg-canvas motion-reduce:block"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-panel/30 via-transparent to-panel/70"
              aria-hidden
            />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10 lg:py-12">
              <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
                <div>
                  <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                    Talk to the top 1% of candidates only worth your time. Hire
                    in 3 days.
                  </h1>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                    No sourcing, no screening, no chasing candidates. Just show
                    up to interview candidates who made it through our vetting.
                    Only 1% do.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      className="rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
                      href="/hire/auth"
                    >
                      Hire Sortie talent
                    </a>
                  </div>
                </div>

                <div className="lg:hidden">
                  <HeroTalentSlider people={talent.slice(0, 4)} />
                </div>
                <div className="hidden gap-3.5 lg:grid lg:grid-cols-2">
                  {talent.slice(0, 4).map((person) => (
                    <TalentPhotoCard key={person.name} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 shrink-0 border-t border-line bg-canvas/90 backdrop-blur-sm"
            aria-label="Trusted by leading companies"
          >
            <div className="mx-auto w-full max-w-7xl px-6 py-5 sm:py-6">
              <LogoMarquee logos={trustLogos} className="py-0" />
            </div>
          </div>
        </section>

        <TalentCategoriesSection />

        <ValuePropsSection />

        <HiringStepsSection />

        <VettingSection />

        <TestimonialsSection />

        {/* Meet the network */}
        <section id="network" className="border-b border-line bg-canvas">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Meet talent in our network
                </h2>
                <p className="mt-3 text-lg text-muted">
                  Verified experts across engineering, design, product, and more.
                </p>
              </div>
              <a
                className="text-sm font-semibold text-signal hover:text-signal-strong"
                href="mailto:hello@sortieprojects.com?subject=Browse%20Sortie%20network"
              >
                Discover more talent
              </a>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {talent.map((person) => (
                <NetworkTalentCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills + proof */}
        <section className="border-b border-line bg-panel">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Expert skillsets, ready to hire
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-line bg-canvas px-3 py-1.5 text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink text-chalk">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Top talent is in high demand.
              </h2>
              <p className="mt-4 text-lg text-chalk/70">
                No sourcing, no screening, no chasing candidates. Just show up
                to interview candidates who made it through our vetting. Only 1%
                do.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-md bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-strong active:scale-[0.98]"
                href="/hire/auth"
              >
                Start hiring
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
