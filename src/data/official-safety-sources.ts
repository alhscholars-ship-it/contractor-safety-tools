export type OfficialSafetySource = {
  title: string;
  url: `https://${string}`;
  description: string;
};

export const officialSafetySourcesByTool = {
  "days-away-case-rate-calculator": [
    {
      title: "OSHA SST-05 — DAFWII and Days Away Case Rate",
      url: "https://www.osha.gov/enforcement/directives/05-05-cpl-02",
      description:
        "Official archived OSHA directive defining the DAFWII or Days Away Case Rate formula, its 200,000-hour base, numerator, and worked example.",
    },
    {
      title: "OSHA 29 CFR 1904.7 — General Recording Criteria",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.7",
      description:
        "Official OSHA recordkeeping rule covering cases involving days away from work, restricted work, and job transfer.",
    },
  ],
  "incident-cost-calculator": [
    {
      title: "OSHA Business Case — Workplace Injury Costs",
      url: "https://www.osha.gov/businesscase/costs",
      description:
        "Official OSHA guidance describing direct and indirect workplace injury and illness costs, including medical, legal, investigation, replacement, productivity, and property-related costs.",
    },
    {
      title: "OSHA Safety Pays Individual Injury Estimator",
      url: "https://www.osha.gov/safetypays/estimator-info",
      description:
        "Official OSHA information explaining the Safety Pays awareness tool, indirect-cost multiplier method, profitability impact, and estimator limitations.",
    },
  ],
  "risk-matrix-calculator": [
    {
      title: "OSHA Hazard Identification and Assessment",
      url: "https://www.osha.gov/safety-management/hazard-identification",
      description:
        "Official OSHA guidance for evaluating hazard severity, likelihood, exposure, interim controls, and control priorities.",
    },
    {
      title: "OSHA Hazard Prevention and Control",
      url: "https://www.osha.gov/safety-management/hazard-prevention",
      description:
        "Official OSHA guidance for selecting controls through the hierarchy of controls and verifying that controls remain effective.",
    },
  ],
  "severity-rate-calculator": [
    {
      title: "OSHA Technical Manual — Back Disorders and Injuries",
      url: "https://www.osha.gov/otm/section-7-ergonomics/chapter-1",
      description:
        "Official OSHA technical guidance describing severity rate as a normalized calculation using days away or restricted days in the numerator.",
    },
    {
      title: "OSHA 1904.7 — General Recording Criteria",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.7",
      description:
        "Official OSHA requirements for recording and counting days away from work and restricted-work or job-transfer days.",
    },
  ],
  "dart-rate-calculator": [
    {
      title: "OSHA Injury and Illness Recordkeeping",
      url: "https://www.osha.gov/recordkeeping",
      description:
        "Official OSHA recordkeeping resources, forms, requirements, and reporting guidance for workplace injuries and illnesses.",
    },
    {
      title: "OSHA Field Operations Manual — DART Rate",
      url: "https://www.osha.gov/fom/chapter-3",
      description:
        "Official OSHA guidance explaining DART case categories, the incidence-rate calculation, and the standardized 200,000-hour base.",
    },
  ],
  "trir-calculator": [
    {
      title: "OSHA Injury and Illness Recordkeeping",
      url: "https://www.osha.gov/recordkeeping",
      description:
        "Official OSHA recordkeeping resources, forms, requirements, and reporting guidance for workplace injuries and illnesses.",
    },
    {
      title: "OSHA Incidence Rate Formula Clarification",
      url: "https://www.osha.gov/laws-regs/standardinterpretations/2016-08-23",
      description:
        "Official OSHA clarification of the incidence-rate formula, employee-hours denominator, and standardized 200,000-hour base.",
    },
  ],
  "safety-plan-generator": [
    {
      title: "OSHA Recommended Safety and Health Practices",
      url: "https://www.osha.gov/safety-management",
      description:
        "OSHA guidance for developing and improving workplace safety and health programs.",
    },
    {
      title: "OSHA Construction Compliance Quick Start",
      url: "https://www.osha.gov/complianceassistance/quickstarts/construction",
      description:
        "A navigation guide to major construction requirements and OSHA compliance resources.",
    },
  ],
  "toolbox-talk-generator": [
    {
      title: "OSHA Training and Reference Materials",
      url: "https://www.osha.gov/training/library/materials",
      description:
        "Official workplace safety training and reference materials organized by topic.",
    },
    {
      title: "OSHA Construction Focus Four Training",
      url: "https://www.osha.gov/training/outreach/construction/focus-four",
      description:
        "OSHA lesson materials addressing major construction hazards and participatory training.",
    },
  ],
  "incident-report-generator": [
    {
      title: "OSHA Injury and Illness Recordkeeping",
      url: "https://www.osha.gov/recordkeeping",
      description:
        "Official recordkeeping, severe-injury reporting, and regulatory resource overview.",
    },
    {
      title: "OSHA Recordkeeping Forms",
      url: "https://www.osha.gov/recordkeeping/forms",
      description:
        "Official resources for OSHA Forms 300, 300A, and 301.",
    },
  ],
  "near-miss-report-generator": [
    {
      title: "OSHA Incident Investigation",
      url: "https://www.osha.gov/incident-investigation",
      description:
        "OSHA guidance for investigating injuries, illnesses, incidents, and near misses.",
    },
    {
      title: "OSHA Hazard Identification and Assessment",
      url: "https://www.osha.gov/safety-management/hazard-identification",
      description:
        "Recommended practices for identifying, assessing, and addressing workplace hazards.",
    },
  ],
  "jha-generator": [
    {
      title: "OSHA Safety Management Tools",
      url: "https://www.osha.gov/safety-management/explore-tools",
      description:
        "Official OSHA worksheets and templates supporting job hazard analysis.",
    },
    {
      title: "OSHA Job Hazard Analysis Worksheet",
      url: "https://www.osha.gov/sites/default/files/Job_Hazard_Analysis_Worksheet.pdf",
      description:
        "An OSHA worksheet for identifying job steps, hazards, and control options.",
    },
  ],
  "lockout-tagout-checklist-generator": [
    {
      title: "OSHA Control of Hazardous Energy Overview",
      url: "https://www.osha.gov/control-hazardous-energy",
      description:
        "OSHA resources covering hazardous-energy recognition and control concepts.",
    },
    {
      title: "OSHA Construction Lockout and Tagging of Circuits",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.417",
      description:
        "The federal construction standard addressing lockout and tagging of electrical circuits.",
    },
  ],
  "daily-jobsite-safety-inspection-generator": [
    {
      title: "OSHA Construction Compliance Quick Start",
      url: "https://www.osha.gov/complianceassistance/quickstarts/construction",
      description:
        "A starting point for identifying major OSHA construction requirements and resources.",
    },
    {
      title: "OSHA Construction Topics by Standard",
      url: "https://www.osha.gov/construction/topics",
      description:
        "Official construction safety topics organized by applicable federal standards.",
    },
  ],
  "fire-extinguisher-inspection-generator": [
    {
      title: "OSHA Portable Fire Extinguisher Standard",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.157",
      description:
        "Federal requirements addressing portable extinguisher placement, inspection, and maintenance.",
    },
    {
      title: "OSHA Construction Fire Protection Standard",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.150",
      description:
        "Federal construction requirements addressing fire protection and portable extinguishers.",
    },
  ],
  "first-aid-kit-inspection-generator": [
    {
      title: "OSHA Medical and First Aid Overview",
      url: "https://www.osha.gov/medical-first-aid",
      description:
        "Official guidance and resources for workplace medical and first-aid programs.",
    },
    {
      title: "OSHA Medical and First Aid Standards",
      url: "https://www.osha.gov/medical-first-aid/standards",
      description:
        "Federal standards and references covering medical services and first aid.",
    },
  ],
  "ladder-inspection-generator": [
    {
      title: "OSHA Construction Ladder Standard",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1053",
      description:
        "Federal construction requirements for ladder condition, capacity, and use.",
    },
    {
      title: "OSHA Construction Ladder Safety",
      url: "https://www.osha.gov/etools/construction/falls/ladder-safety",
      description:
        "Illustrated OSHA guidance for recognizing and controlling ladder hazards.",
    },
  ],
  "excavation-inspection-generator": [
    {
      title: "OSHA Trenching and Excavation Overview",
      url: "https://www.osha.gov/trenching-excavation",
      description:
        "Official OSHA resources covering cave-ins, protective systems, access, and related hazards.",
    },
    {
      title: "OSHA Specific Excavation Requirements",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.651",
      description:
        "Federal construction requirements covering specific excavation conditions and controls.",
    },
  ],
  "scaffold-inspection-generator": [
    {
      title: "OSHA Scaffolding for Construction",
      url: "https://www.osha.gov/scaffolding/construction",
      description:
        "Official construction scaffold standards, guidance, checklists, and hazard resources.",
    },
    {
      title: "OSHA Scaffold General Requirements",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.451",
      description:
        "Federal construction requirements for scaffold capacity, platforms, access, and fall protection.",
    },
  ],
  "ppe-checklist-generator": [
    {
      title: "OSHA Construction PPE",
      url: "https://www.osha.gov/personal-protective-equipment/construction",
      description:
        "Official construction PPE standards, guidance, and current regulatory information.",
    },
    {
      title: "OSHA Criteria for Construction PPE",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.95",
      description:
        "Federal requirements for providing, using, maintaining, and properly fitting PPE.",
    },
  ],
} as const satisfies Record<
  string,
  readonly OfficialSafetySource[]
>;

export type OfficialSafetySourceToolSlug =
  keyof typeof officialSafetySourcesByTool;
