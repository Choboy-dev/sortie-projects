export function CompanyLogo({ company }: { company: string }) {
  if (company === "Figma") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-5 w-3.5 text-foreground/80"
          viewBox="0 0 38 57"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
        </svg>
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground/85">
          Figma
        </span>
      </span>
    );
  }

  if (company === "Vercel") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-3.5 w-3.5 text-foreground/85"
          viewBox="0 0 76 65"
          fill="currentColor"
          aria-hidden
        >
          <path d="M37.5 0 75 65H0z" />
        </svg>
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground/85">
          Vercel
        </span>
      </span>
    );
  }

  if (company === "Shopify") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-[18px] w-[16px] text-foreground/80"
          viewBox="0 0 256 292"
          fill="currentColor"
          aria-hidden
        >
          <path d="M223.775 57.266l-1.187-.39c-.13-2.729-.507-4.55-.507-4.55s-1.42-.13-3.443-.39c0 0-17.108-12.987-18.813-14.3-1.705-1.326-3.574-.91-4.55-.65-.065.026-2.938.91-7.696 2.338C177.61 15.21 159.46 1.53 147.16.507c-.26-.065-.507-.065-.78-.13C145.897.13 145.377 0 144.66 0 123.37 0 102.21 27.547 90.82 49.205c-14.04 4.42-24.05 7.566-25.416 8.022-8.554 2.677-8.814 2.938-9.92 10.908-.78 5.85-21.32 164.06-21.32 164.06l145.507 25.156L256 241.098S224.88 59.1 223.775 57.266zm-50.18 7.696c-4.68 1.446-9.92 3.053-15.42 4.745 1.187-4.55 2.21-9.23 2.938-13.845 5.98 2.21 10.778 5.59 12.482 9.1zm-19.763-20.67c3.964 6.24 6.63 13.715 8.164 21.19-6.76 2.08-13.845 4.29-20.8 6.37 4.16-9.23 11.18-18.943 19.762-27.56h-.126zM142.955 8.15c1.966 0 3.704.78 4.94 2.08-10.388 4.94-21.45 16.77-28.73 33.8-5.72 1.77-11.31 3.508-16.38 5.07C112.32 26.637 128.18 8.15 142.955 8.15z" />
        </svg>
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground/85">
          shopify
        </span>
      </span>
    );
  }

  if (company === "Stripe") {
    return (
      <span className="font-display text-[17px] font-semibold tracking-[-0.03em] text-foreground/85">
        stripe
      </span>
    );
  }

  return (
    <span className="font-display text-[15px] font-semibold tracking-tight text-foreground/85">
      {company}
    </span>
  );
}
