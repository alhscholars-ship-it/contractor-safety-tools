import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Contractor Safety Form Tools",
    template: "%s | Contractor Safety Form Tools",
  },
  description:
    "Free OSHA-aligned safety form generators, contractor checklists, toolbox talks, incident reports, and jobsite safety templates.",
  metadataBase: new URL("https://contractorsafetytools.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
