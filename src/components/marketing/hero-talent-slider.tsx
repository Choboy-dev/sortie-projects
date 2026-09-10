"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/services-card";
import {
  TalentPhotoCard,
  type TalentPerson,
} from "@/components/marketing/talent-photo-card";

export function HeroTalentSlider({ people }: { people: TalentPerson[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: false,
      }}
      className="w-full"
      aria-label="Featured Sortie talent"
    >
      <CarouselContent className="-ml-3">
        {people.map((person) => (
          <CarouselItem
            key={person.name}
            className="basis-[78%] pl-3 min-[420px]:basis-[70%] sm:basis-[58%]"
          >
            <TalentPhotoCard person={person} layout="stacked" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-1 top-[42%] z-10 -translate-y-1/2 border-line bg-panel/95 text-foreground shadow-lg hover:bg-canvas hover:text-foreground disabled:opacity-40" />
    </Carousel>
  );
}
