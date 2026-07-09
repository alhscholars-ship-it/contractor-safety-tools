import { siteConfig } from "@/config/site";

export type ToolJsonLdInput = {
  name: string;
  description: string;
  url: string;
  keywords: string[];
};

export function createToolJsonLd(input: ToolJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.url}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    keywords: input.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
