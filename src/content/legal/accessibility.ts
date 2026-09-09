import type { LegalDocument } from "./types";

export const accessibilityStatement: LegalDocument = {
  title: "Accessibility",
  description:
    "How Sortie Projects works to keep our marketing site and product surfaces usable for people with disabilities — and how to reach us when something gets in the way.",
  lastUpdated: "September 9, 2026",
  sections: [
    {
      heading: "Our commitment",
      paragraphs: [
        "Sortie Projects is a talent marketplace for companies hiring vetted engineers, designers, and operators. The people who use our site and product — hiring teams and candidates alike — deserve interfaces they can actually use.",
        "We design and build with accessibility in mind from the start, not as an afterthought. That means aiming for clear structure, reliable keyboard use, readable contrast, and content that assistive technologies can make sense of across our marketing pages at https://sortieprojects.com and our product surfaces.",
      ],
    },
    {
      heading: "Standards we aim for",
      paragraphs: [
        "Our target is WCAG 2.2 Level AA. We treat that as a practical bar for what “usable” should mean: perceivable, operable, understandable, and robust — not a checkbox exercise.",
        "Where we fall short of that target, we want to know. Accessibility is ongoing work; we improve the experience as we ship new pages and product flows.",
      ],
    },
    {
      heading: "Measures we take",
      paragraphs: [
        "We bake accessibility into day-to-day design and engineering rather than bolting it on at the end. In practice, that includes:",
      ],
      bullets: [
        "Semantic HTML and meaningful headings so pages have a clear document outline",
        "Full keyboard access for primary navigation and interactive controls",
        "Color contrast chosen for readable text and actionable UI against our backgrounds",
        "Respect for prefers-reduced-motion so animation does not become a barrier",
        "A skip link to jump to main content without tabbing through the chrome",
        "Alternative text on informative images; decorative imagery marked so it does not clutter screen readers",
      ],
    },
    {
      heading: "Known limitations",
      paragraphs: [
        "We are candid about gaps. Some parts of the experience are harder to control or still in progress:",
      ],
      bullets: [
        "Third-party embeds (for example video players, scheduling widgets, or analytics scripts) may not meet the same bar as our own UI",
        "PDFs and downloadable documents, when we publish them, may not always be fully accessible; ask us if you need an alternate format",
        "Newer product flows and marketing experiments may lag behind our target until we audit and harden them",
      ],
    },
    {
      heading: "Requesting accommodations or reporting barriers",
      paragraphs: [
        "If you hit a barrier on our site or product — or need an accommodation to evaluate talent, apply, or work with us — email hello@sortieprojects.com with “Accessibility” in the subject line.",
        "Tell us the page or flow, what you were trying to do, the assistive technology or browser you use if relevant, and what went wrong. The more specific you are, the faster we can help.",
      ],
    },
    {
      heading: "What to expect from us",
      paragraphs: [
        "We aim to acknowledge accessibility reports and accommodation requests within two business days. For straightforward issues we will either fix them promptly or offer a practical workaround. For larger changes we will say what we can do in the near term and what needs a longer fix.",
        "We do not guarantee a perfect experience on every third-party surface, but we will not leave you without a path forward when Sortie’s own content or product is the problem.",
      ],
    },
    {
      heading: "Continuous improvement",
      paragraphs: [
        "Accessibility is part of how we ship: design review, engineering checks, and user feedback all feed the backlog. As Sortie Projects grows — more product surfaces, more hiring workflows — we will keep raising the floor rather than treating this statement as finished.",
        "Questions about this statement or our practices: hello@sortieprojects.com. Website: https://sortieprojects.com.",
      ],
    },
  ],
};
