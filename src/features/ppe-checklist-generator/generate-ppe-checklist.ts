export type PpeChecklistInput = {
  companyName: string;
  projectName: string;
  trade: string;
  jobsiteLocation: string;
  taskName: string;
  hazards: string[];
  requiredPpe: string[];
  inspectionItems: string[];
  supervisorName: string;
};

export type PpeChecklistSection = {
  title: string;
  items: string[];
};

export type PpeChecklistResult = {
  title: string;
  summary: string;
  sections: PpeChecklistSection[];
  disclaimer: string;
};

const cleanText = (value: string) => value.trim().replace(/\s+/g, " ");

const cleanList = (items: string[]) =>
  Array.from(
    new Set(
      items
        .map((item) => cleanText(item))
        .filter((item) => item.length > 0),
    ),
  );

export function generatePpeChecklist(
  input: PpeChecklistInput,
): PpeChecklistResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const trade = cleanText(input.trade);
  const jobsiteLocation = cleanText(input.jobsiteLocation);
  const taskName = cleanText(input.taskName);
  const supervisorName = cleanText(input.supervisorName);
  const hazards = cleanList(input.hazards);
  const requiredPpe = cleanList(input.requiredPpe);
  const inspectionItems = cleanList(input.inspectionItems);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!trade) {
    throw new Error("Trade is required.");
  }

  if (!jobsiteLocation) {
    throw new Error("Jobsite location is required.");
  }

  if (!taskName) {
    throw new Error("Task name is required.");
  }

  if (hazards.length === 0) {
    throw new Error("At least one hazard is required.");
  }

  if (requiredPpe.length === 0) {
    throw new Error("At least one PPE item is required.");
  }

  if (inspectionItems.length === 0) {
    throw new Error("At least one inspection item is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  return {
    title: `${trade} PPE Checklist for ${taskName}`,
    summary: `${companyName} should use this PPE checklist before ${taskName.toLowerCase()} at ${jobsiteLocation} for the ${projectName} project.`,
    sections: [
      {
        title: "Project Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Trade: ${trade}`,
          `Task: ${taskName}`,
          `Jobsite location: ${jobsiteLocation}`,
          `Supervisor: ${supervisorName}`,
        ],
      },
      {
        title: "Known Hazards",
        items: hazards.map((hazard) => `Review exposure to: ${hazard}`),
      },
      {
        title: "Required PPE",
        items: requiredPpe.map((item) => `Wear and verify condition of: ${item}`),
      },
      {
        title: "Pre-Use Inspection Items",
        items: inspectionItems.map((item) => `Check before work begins: ${item}`),
      },
      {
        title: "Documentation Notes",
        items: [
          "Confirm workers understand required PPE before the task begins.",
          "Remove damaged, expired, or unsuitable PPE from service.",
          "Document missing PPE, corrective actions, and supervisor follow-up.",
          "Keep completed PPE checklists with project safety records.",
        ],
      },
    ],
    disclaimer:
      "This generated PPE checklist is an informational documentation aid only. It is not legal advice, certified safety advice, or a substitute for OSHA, state, local, manufacturer, project-specific, or qualified safety professional guidance.",
  };
}
