export type ToolCategory =
  | "Safety Plans"
  | "Toolbox Talks"
  | "Inspections"
  | "Energy Control"
  | "Incident Reports"
  | "Job Hazard Analysis";

export type ToolDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  href: string;
  keywords: string[];
};

export const tools: ToolDefinition[] = [
  {
    slug: "safety-plan-generator",
    name: "Safety Plan Generator",
    shortDescription:
      "Create a contractor safety plan outline for jobsites, trades, hazards, and documentation needs.",
    category: "Safety Plans",
    href: "/tools/safety-plan-generator",
    keywords: [
      "safety plan generator",
      "contractor safety plan",
      "construction safety plan template",
      "OSHA safety plan template",
    ],
  },
  {
    slug: "toolbox-talk-generator",
    name: "Toolbox Talk Generator",
    shortDescription:
      "Generate jobsite toolbox talk topics, safety discussion points, and attendance notes.",
    category: "Toolbox Talks",
    href: "/tools/toolbox-talk-generator",
    keywords: [
      "toolbox talk generator",
      "construction toolbox talks",
      "safety meeting topics",
      "toolbox talk template",
    ],
  },
  {
    slug: "incident-report-generator",
    name: "Incident Report Generator",
    shortDescription:
      "Draft a clear jobsite incident report with event details, corrective actions, and follow-up notes.",
    category: "Incident Reports",
    href: "/tools/incident-report-generator",
    keywords: [
      "incident report generator",
      "construction incident report",
      "jobsite incident report form",
      "near miss report template",
    ],
  },
  {
    slug: "near-miss-report-generator",
    name: "Near Miss Report Generator",
    shortDescription:
      "Create a structured jobsite near-miss report with potential outcomes, contributing factors, corrective actions, and follow-up ownership.",
    category: "Incident Reports",
    href: "/tools/near-miss-report-generator",
    keywords: [
      "near miss report generator",
      "near miss report template",
      "construction near miss form",
      "jobsite near miss report",
    ],
  },
  {
    slug: "jha-generator",
    name: "JHA Generator",
    shortDescription:
      "Create a job hazard analysis outline with task steps, hazards, controls, PPE, and review notes.",
    category: "Job Hazard Analysis",
    href: "/tools/jha-generator",
    keywords: [
      "JHA generator",
      "job hazard analysis template",
      "construction JHA",
      "job safety analysis generator",
    ],
  },
  {
    slug: "lockout-tagout-checklist-generator",
    name: "Lockout Tagout Checklist Generator",
    shortDescription:
      "Create an equipment-specific LOTO checklist with energy sources, isolation points, shutdown, verification, and restoration steps.",
    category: "Energy Control",
    href: "/tools/lockout-tagout-checklist-generator",
    keywords: [
      "lockout tagout checklist generator",
      "LOTO checklist template",
      "energy isolation checklist",
      "construction lockout tagout form",
    ],
  },
  {
    slug: "ppe-checklist-generator",
    name: "PPE Checklist Generator",
    shortDescription:
      "Create task-specific PPE checklists with hazards, required equipment, and pre-use inspection items.",
    category: "Inspections",
    href: "/tools/ppe-checklist-generator",
    keywords: [
      "PPE checklist generator",
      "construction PPE checklist",
      "jobsite PPE inspection",
      "personal protective equipment checklist",
    ],
  },
];
