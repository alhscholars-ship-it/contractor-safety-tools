export type OshaInspectionChecklistInput = {
  companyName: string;
  projectName: string;
  siteLocation: string;
  inspectionType: string;
  inspectorName: string;
  areas: string[];
};

export type OshaInspectionChecklistResult = {
  title: string;
  summary: string;
  sections: {
    title: string;
    items: string[];
  }[];
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

export function generateOshaInspectionChecklist(
  input: OshaInspectionChecklistInput,
): OshaInspectionChecklistResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const siteLocation = cleanText(input.siteLocation);
  const inspectionType = cleanText(input.inspectionType);
  const inspectorName = cleanText(input.inspectorName);
  const areas = cleanList(input.areas);

  if (!companyName) throw new Error("Company name is required.");
  if (!projectName) throw new Error("Project name is required.");
  if (!siteLocation) throw new Error("Site location is required.");
  if (!inspectionType) throw new Error("Inspection type is required.");
  if (!inspectorName) throw new Error("Inspector name is required.");
  if (areas.length === 0) throw new Error("At least one inspection area is required.");

  return {
    title: `${inspectionType} OSHA Inspection Checklist`,
    summary:
      `${companyName} can use this inspection checklist for ${projectName} at ${siteLocation}.`,
    sections: [
      {
        title: "Inspection Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Location: ${siteLocation}`,
          `Inspection type: ${inspectionType}`,
          `Inspector: ${inspectorName}`,
        ],
      },
      {
        title: "Inspection Areas",
        items: areas.map(
          (area) => `Review hazards and controls for: ${area}`,
        ),
      },
      {
        title: "Safety Review Items",
        items: [
          "Verify required personal protective equipment is available and used.",
          "Review housekeeping conditions and access routes.",
          "Check fall protection systems where applicable.",
          "Review electrical safety conditions.",
          "Confirm hazard controls are implemented.",
          "Document deficiencies and corrective actions.",
        ],
      },
      {
        title: "Follow-Up Documentation",
        items: [
          "Assign responsible persons for corrective actions.",
          "Record completion dates.",
          "Maintain inspection records with project documentation.",
        ],
      },
    ],
    disclaimer:
      "This generated checklist is an informational documentation aid only. It does not replace OSHA requirements, employer responsibilities, project rules, manufacturer instructions, or qualified safety guidance.",
  };
}
