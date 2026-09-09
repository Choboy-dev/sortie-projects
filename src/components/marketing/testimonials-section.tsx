"use client";

import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  return (
    <section
      className="border-b border-line bg-canvas"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 sm:pt-24">
        <div className="max-w-2xl">
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Trusted by teams hiring across Africa
          </h2>
          <p className="mt-4 text-lg text-muted">
            Founders, engineering leaders, and network members on what changes
            when vetting happens before the first intro.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-10 sm:pb-14">
        <StaggerTestimonials />
      </div>
    </section>
  );
}
