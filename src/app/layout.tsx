import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Syne } from "next/font/google";
import { PageTransition } from "@/components/motion/page-transition";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sortie Projects — Hire the top 1% of freelance talent",
  description:
    "Exclusive network of AI-vetted developers, designers, and specialists. Hire for mission-critical work with no-risk trials — or apply to join the network.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${syne.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-panel focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
