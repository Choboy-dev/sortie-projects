"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  TalentPhotoCard,
  type TalentPerson,
} from "@/components/marketing/talent-photo-card";

export function HeroTalentSlider({ people }: { people: TalentPerson[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: false,
  });

  return (
    <div className="relative w-full" aria-label="Featured Sortie talent">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <div className="flex">
          {people.map((person) => (
            <div
              key={person.name}
              className="w-[min(78vw,260px)] min-w-0 shrink-0 grow-0 px-2"
            >
              <TalentPhotoCard person={person} layout="stacked" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-foreground shadow-sm transition hover:bg-canvas active:scale-[0.98]"
          aria-label="Previous talent"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowLeft className="h-4 w-4" weight="bold" aria-hidden />
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel text-foreground shadow-sm transition hover:bg-canvas active:scale-[0.98]"
          aria-label="Next talent"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowRight className="h-4 w-4" weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  );
}
