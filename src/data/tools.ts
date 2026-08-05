export type ToolCategory =
  | "Safety Plans"
  | "Toolbox Talks"
  | "Inspections"
  | "Energy Control"
  | "Incident Reports"
  | "Job Hazard Analysis"
  | "Safety Calculators";

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
    slug: "dart-rate-calculator",
    name: "DART Rate Calculator",
    shortDescription:
      "Calculate the days away, restricted, or transferred rate from qualifying case counts and employee hours worked.",
    category: "Safety Calculators",
    href: "/tools/dart-rate-calculator",
    keywords: [
      "DART rate calculator",
      "OSHA DART calculator",
      "days away restricted transferred rate",
      "DART rate formula",
    ],
  },
  {
    slug: "trir-calculator",
    name: "TRIR Calculator",
    shortDescription:
      "Calculate total recordable incident rate from recordable cases and employee hours worked using the standardized 200,000-hour base.",
    category: "Safety Calculators",
    href: "/tools/trir-calculator",
    keywords: [
      "TRIR calculator",
      "total recordable incident rate calculator",
      "OSHA incident rate calculator",
      "recordable incident rate formula",
    ],
  },
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
    slug: "daily-jobsite-safety-inspection-generator",
    name: "Daily Jobsite Safety Inspection Generator",
    shortDescription:
      "Create a daily construction safety inspection with work areas, observed hazards, corrective actions, responsible persons, and follow-up dates.",
    category: "Inspections",
    href: "/tools/daily-jobsite-safety-inspection-generator",
    keywords: [
      "daily jobsite safety inspection checklist",
      "construction site inspection checklist",
      "jobsite safety inspection form",
      "daily construction safety checklist",
    ],
  },
  {
    slug: "fire-extinguisher-inspection-generator",
    name: "Fire Extinguisher Inspection Checklist Generator",
    shortDescription:
      "Create a portable fire extinguisher inspection record covering accessibility, pressure, safety components, physical condition, findings, and corrective actions.",
    category: "Inspections",
    href: "/tools/fire-extinguisher-inspection-generator",
    keywords: [
      "fire extinguisher inspection checklist",
      "monthly fire extinguisher inspection form",
      "fire extinguisher checklist generator",
      "portable fire extinguisher inspection",
    ],
  },
  {
    slug: "first-aid-kit-inspection-generator",
    name: "First Aid Kit Inspection Checklist Generator",
    shortDescription:
      "Create a workplace first aid kit inspection record covering accessibility, condition, inventory, expiration dates, deficiencies, and corrective actions.",
    category: "Inspections",
    href: "/tools/first-aid-kit-inspection-generator",
    keywords: [
      "first aid kit inspection checklist",
      "workplace first aid kit checklist",
      "first aid kit inspection form",
      "construction first aid kit inspection",
    ],
  },
  {
    slug: "ladder-inspection-generator",
    name: "Ladder Inspection Checklist Generator",
    shortDescription:
      "Create a ladder inspection record covering identification, duty rating, rails, rungs, feet, hardware, labels, setup, defects, and corrective actions.",
    category: "Inspections",
    href: "/tools/ladder-inspection-generator",
    keywords: [
      "ladder inspection checklist",
      "ladder safety inspection form",
      "construction ladder inspection checklist",
      "portable ladder inspection form",
    ],
  },
  {
    slug: "excavation-inspection-generator",
    name: "Excavation Inspection Checklist Generator",
    shortDescription:
      "Create an excavation inspection record covering soil classification, protective systems, access, utilities, water, atmospheric conditions, edge protection, findings, and corrective actions.",
    category: "Inspections",
    href: "/tools/excavation-inspection-generator",
    keywords: [
      "excavation inspection checklist",
      "trench inspection checklist",
      "construction excavation inspection form",
      "excavation safety checklist generator",
    ],
  },
  {
    slug: "scaffold-inspection-generator",
    name: "Scaffold Inspection Checklist Generator",
    shortDescription:
      "Create a scaffold inspection record covering foundations, frames, bracing, platforms, access, guardrails, fall protection, loading, defects, and corrective actions.",
    category: "Inspections",
    href: "/tools/scaffold-inspection-generator",
    keywords: [
      "scaffold inspection checklist",
      "scaffolding safety inspection form",
      "construction scaffold inspection checklist",
      "scaffold competent person inspection",
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
