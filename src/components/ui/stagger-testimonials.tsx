"use client";

import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "We shortlisted three Sortie engineers in under 48 hours. The live coding playback sold the whole team.",
    by: "Amelia, VP Engineering at Paystack",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/f0/f02fed36023656a5b5df6f247c83c96c53bfa9db5b98085cdee93ffc938a5f37.jpg",
  },
  {
    tempId: 1,
    testimonial:
      "Integrity checks matter to us. Sortie’s proctoring signals gave us confidence we weren’t gambling on resumes.",
    by: "Dan, CTO at Flutterwave",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/5b/5b5b2f3487692d40f629010ea6448d150907f780d8c262c4ca194b7386115c2d.jpg",
  },
  {
    tempId: 2,
    testimonial:
      "We were drowning in inbound applicants. Sortie sent people who had already cleared the hard part.",
    by: "Stephanie, Head of Talent at Andela",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/10/10e2bfa5446e5c116e269b649b5f5e0106d96643f0a903048f3a056e40c35cd8.jpg",
  },
  {
    tempId: 3,
    testimonial:
      "Flexible engagements without soft standards. Hourly to full-time, same vetting rigor every time.",
    by: "Marie, CFO at Chipper Cash",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/fa/fae47bb0faba45d1e0696b6557ca36c551a738c7d6e3950e82bb69dd2f963a72.jpg",
  },
  {
    tempId: 4,
    testimonial:
      "If I could give 11 stars for the rematch policy, I’d give 12. Zero drama when the first fit wasn’t right.",
    by: "Andre, Design Lead at PiggyVest",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/4f/4fb45af36b546e069b72527fdf4d904855a2b11b301fa738c8bc4d235595c4df.jpg",
  },
  {
    tempId: 5,
    testimonial:
      "The AI interview notes plus scored assessments saved us weeks of screening calls.",
    by: "Jeremy, Product Lead at Jumia",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/a4/a4dd47498f54944edb9cd8095fb751847193faac01d922bae494e68d0cf90f4f.jpg",
  },
  {
    tempId: 6,
    testimonial:
      "Took some convincing from legal. Now that we’re on Sortie, we’re not going back to open job boards.",
    by: "Pam, Marketing Director at Konga",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/b2/b2cd3e4ad761fd9954c265df5f86090c4f17c388c07f78332e75edfd7420f66a.jpg",
  },
  {
    tempId: 7,
    testimonial:
      "Timezone-aware matching is underrated. Our Lagos and London pods finally stayed in sync.",
    by: "Daniel, Data Science Lead at Interswitch",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/9a/9a3f3f88dac2ceb807e98d4cbe99acc9813da6d0ce2859b1cf026747727e1667.jpg",
  },
  {
    tempId: 8,
    testimonial: "It’s just the best talent network we’ve used. Period.",
    by: "Fernando, UX Lead at Carbon",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/b7/b78f8c42f62ae61f6ebe5c4e79f3af27f49dc05c4f366d2be599d1e14318be86.jpg",
  },
  {
    tempId: 9,
    testimonial:
      "I joined the network after clearing the gauntlet. Clients already trust the badge — interviews go faster.",
    by: "Andy, Staff Engineer at Cloudflare",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/45/45482403ecbfd4f326c4388ca63773a1fbe79376213456ae0f422eea1a94d589.jpg",
  },
  {
    tempId: 10,
    testimonial:
      "We’d been searching for senior React talent for months. Sortie delivered a shortlist in two days.",
    by: "Pete, Sales Engineering at SeamlessHR",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/42/420c64d5e90b2ff05fc182e3d8c3df40076440cb684d927efed247855775ea9b.jpg",
  },
  {
    tempId: 11,
    testimonial:
      "The matching explanation told us why each candidate fit. No black-box rankings.",
    by: "Marina, People Ops at Kuda",
    imgSrc:
      "https://cdn.21st.dev/assets/mirror/be/be1b67757a13dfec4386e8627236a7194c6bcfb07502dbd82f727f6ccac46bcd.jpg",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleMove(position)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-signal bg-signal text-white"
          : "z-0 border-line bg-panel text-foreground hover:border-signal/40",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px #2a2622"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-signal-strong" : "bg-line",
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        className="mb-4 h-14 w-12 bg-canvas object-cover object-top"
        style={{
          boxShadow: isCenter ? "3px 3px 0px #964132" : "3px 3px 0px #2a2622",
        }}
      />
      <h3
        className={cn(
          "font-display text-base font-medium sm:text-xl",
          isCenter ? "text-white" : "text-foreground",
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-white/80" : "text-muted",
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 cursor-pointer items-center justify-center border-2 border-line bg-panel text-2xl text-foreground transition-colors",
            "hover:border-signal hover:bg-signal hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
        >
          <CaretLeft weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 cursor-pointer items-center justify-center border-2 border-line bg-panel text-2xl text-foreground transition-colors",
            "hover:border-signal hover:bg-signal hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
        >
          <CaretRight weight="bold" />
        </button>
      </div>
    </div>
  );
};
