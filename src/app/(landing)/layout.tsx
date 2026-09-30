import type { Metadata } from "next";
import Gtm from "../gtm";
import { buildMetadata } from "../meta";

export { viewport } from "../meta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/landing");
}

// Root layout for /landing: _LandingLayout.cshtml <head> (Roboto + landing.css only).
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        <link rel="stylesheet" href="/legacy/landing/css/landing.css" />
      </head>
      <body>
        <Gtm />
        {children}
      </body>
    </html>
  );
}
