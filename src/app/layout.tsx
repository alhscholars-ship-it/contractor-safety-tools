import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config/site";

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


const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Professional contractor safety documentation tools for construction companies.",
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <SiteFooter />
      </body>
    </html>
  );
}
