import type { Metadata } from "next";
import Gtm from "../gtm";
import { buildMetadata } from "../meta";

export { viewport } from "../meta";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("/");
}

// Root layout for Home + News pages: _Layout.cshtml <head> (Roboto,
// owl.carousel.css, index.css). The landing page has its own root layout
// (app/(landing)/layout.tsx) because it uses a different stylesheet.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        <link rel="stylesheet" href="/legacy/css/owl.carousel.css" />
        <link rel="stylesheet" href="/legacy/css/index.css" />
      </head>
      <body>
        <Gtm />
        {children}
      </body>
    </html>
  );
}
