export type FallProtectionInspectionInput = {
  companyName: string;
  projectName: string;
  jobsiteLocation: string;
  workArea: string;
  supervisorName: string;
  hazards: string[];
  inspectionItems: string[];
};

export type FallProtectionInspectionSection = {
  title: string;
  items: string[];
};

export type FallProtectionInspectionResult = {
  title: string;
  summary: string;
  sections: FallProtectionInspectionSection[];
  disclaimer: string;
};

const cleanText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const cleanList = (items: string[]) =>
  Array.from(
    new Set(
      items
        .map((item) => cleanText(item))
        .filter(Boolean),
    ),
  );

export function generateFallProtectionInspection(
  input: FallProtectionInspectionInput,
): FallProtectionInspectionResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const jobsiteLocation = cleanText(input.jobsiteLocation);
  const workArea = cleanText(input.workArea);
  const supervisorName = cleanText(input.supervisorName);
  const hazards = cleanList(input.hazards);
  const inspectionItems = cleanList(input.inspectionItems);

  if (!companyName) throw new Error("Company name is required.");
  if (!projectName) throw new Error("Project name is required.");
  if (!jobsiteLocation) throw new Error("Jobsite location is required.");
  if (!workArea) throw new Error("Work area is required.");
  if (!supervisorName) throw new Error("Supervisor name is required.");

  if (hazards.length === 0) {
    throw new Error("At least one hazard is required.");
  }

  if (inspectionItems.length === 0) {
    throw new Error("At least one inspection item is required.");
  }

  return {
    title: `Fall Protection Inspection Checklist - ${workArea}`,
    summary:
      `${companyName} should complete this fall protection inspection before work begins at ${jobsiteLocation} for the ${projectName} project.`,

    sections: [
      {
        title: "Project Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Location: ${jobsiteLocation}`,
          `Work area: ${workArea}`,
          `Supervisor: ${supervisorName}`,
        ],
      },
      {
        title: "Fall Hazards Reviewed",
        items: hazards.map(
          (hazard) => `Review exposure: ${hazard}`,
        ),
      },
      {
        title: "Fall Protection Inspection Items",
        items: inspectionItems.map(
          (item) => `Verify: ${item}`,
        ),
      },
      {
        title: "Corrective Action Documentation",
        items: [
          "Record identified deficiencies.",
          "Assign responsible persons.",
          "Document completion dates.",
          "Maintain inspection records.",
        ],
      },
    ],

    disclaimer:
      "This generated checklist is an informational documentation aid only. It does not replace OSHA requirements, employer responsibilities, site-specific procedures, manufacturer instructions, or qualified safety guidance.",
  };
}
