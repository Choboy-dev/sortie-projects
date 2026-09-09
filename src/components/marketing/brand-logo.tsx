import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  href?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
  href = "/",
  priority = false,
}: BrandLogoProps) {
  const content = (
    <>
      <Image
        src="/brand/sortie-mark.png"
        alt=""
        width={84}
        height={75}
        priority={priority}
        className={cn("h-8 w-auto shrink-0 object-contain", markClassName)}
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          Sortie Projects
        </span>
      ) : (
        <span className="sr-only">Sortie Projects</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn("inline-flex items-center gap-2.5", className)}
        aria-label="Sortie Projects home"
      >
        {content}
      </a>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {content}
    </div>
  );
}
