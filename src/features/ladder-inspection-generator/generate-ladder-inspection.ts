export interface LadderInspectionInput {
  companyName: string;
  projectName: string;
  inspectionDate: string;
  inspectorName: string;
  ladderId: string;
  ladderType: string;
  ladderMaterial: string;
  ladderLocation: string;
  manufacturer: string;
  dutyRating: string;
  overallCondition: string;
  railsCondition: string;
  rungsCondition: string;
  feetCondition: string;
  hardwareCondition: string;
  labelsCondition: string;
  setupCondition: string;
  defectsFound: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  nextInspectionDate: string;
}

export interface LadderInspectionSection {
  heading: string;
  content: string;
}

export interface LadderInspectionResult {
  title: string;
  summary: string;
  sections: LadderInspectionSection[];
  disclaimer: string;
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeRequiredText(value: string, fieldName: string): string {
  const normalized = normalizeText(value);

  if (!normalized) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalized;
}

function normalizeRequiredList(
  values: string[],
  fieldName: string,
): string[] {
  const normalized = values
    .map(normalizeText)
    .filter(Boolean);

  const unique = [...new Set(normalized)];

  if (unique.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`);
  }

  return unique;
}

function formatNumberedList(values: string[]): string {
  return values
    .map((value, index) => `${index + 1}. ${value}`)
    .join("\n");
}

export function generateLadderInspection(
  input: LadderInspectionInput,
): LadderInspectionResult {
  const companyName = normalizeRequiredText(
    input.companyName,
    "Company name",
  );
  const projectName = normalizeRequiredText(
    input.projectName,
    "Project name",
  );
  const inspectionDate = normalizeRequiredText(
    input.inspectionDate,
    "Inspection date",
  );
  const inspectorName = normalizeRequiredText(
    input.inspectorName,
    "Inspector name",
  );
  const ladderId = normalizeRequiredText(
    input.ladderId,
    "Ladder ID",
  );
  const ladderType = normalizeRequiredText(
    input.ladderType,
    "Ladder type",
  );
  const ladderMaterial = normalizeRequiredText(
    input.ladderMaterial,
    "Ladder material",
  );
  const ladderLocation = normalizeRequiredText(
    input.ladderLocation,
    "Ladder location",
  );
  const manufacturer = normalizeRequiredText(
    input.manufacturer,
    "Manufacturer",
  );
  const dutyRating = normalizeRequiredText(
    input.dutyRating,
    "Duty rating",
  );
  const overallCondition = normalizeRequiredText(
    input.overallCondition,
    "Overall condition",
  );
  const railsCondition = normalizeRequiredText(
    input.railsCondition,
    "Rails condition",
  );
  const rungsCondition = normalizeRequiredText(
    input.rungsCondition,
    "Rungs condition",
  );
  const feetCondition = normalizeRequiredText(
    input.feetCondition,
    "Feet condition",
  );
  const hardwareCondition = normalizeRequiredText(
    input.hardwareCondition,
    "Hardware condition",
  );
  const labelsCondition = normalizeRequiredText(
    input.labelsCondition,
    "Labels condition",
  );
  const setupCondition = normalizeRequiredText(
    input.setupCondition,
    "Setup condition",
  );
  const nextInspectionDate = normalizeRequiredText(
    input.nextInspectionDate,
    "Next inspection date",
  );

  const defectsFound = normalizeRequiredList(
    input.defectsFound,
    "Defects found",
  );
  const correctiveActions = normalizeRequiredList(
    input.correctiveActions,
    "Corrective actions",
  );
  const responsiblePersons = normalizeRequiredList(
    input.responsiblePersons,
    "Responsible persons",
  );

  return {
    title: "Ladder Inspection Checklist",
    summary:
      `${companyName} completed a ladder inspection for ${projectName} ` +
      `on ${inspectionDate}. Ladder ${ladderId} was inspected by ` +
      `${inspectorName}.`,
    sections: [
      {
        heading: "Project and Inspection Details",
        content: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Next inspection date: ${nextInspectionDate}`,
        ].join("\n"),
      },
      {
        heading: "Ladder Identification",
        content: [
          `Ladder ID: ${ladderId}`,
          `Type: ${ladderType}`,
          `Material: ${ladderMaterial}`,
          `Location: ${ladderLocation}`,
          `Manufacturer: ${manufacturer}`,
          `Duty rating: ${dutyRating}`,
        ].join("\n"),
      },
      {
        heading: "Condition Assessment",
        content: [
          `Overall condition: ${overallCondition}`,
          `Side rails: ${railsCondition}`,
          `Rungs or steps: ${rungsCondition}`,
          `Feet and slip-resistant surfaces: ${feetCondition}`,
          `Hardware and locking components: ${hardwareCondition}`,
          `Labels and warnings: ${labelsCondition}`,
          `Setup and placement: ${setupCondition}`,
        ].join("\n"),
      },
      {
        heading: "Defects Found",
        content: formatNumberedList(defectsFound),
      },
      {
        heading: "Corrective Actions",
        content: formatNumberedList(correctiveActions),
      },
      {
        heading: "Responsible Persons",
        content: formatNumberedList(responsiblePersons),
      },
      {
        heading: "Documentation and Follow-Up",
        content:
          `Remove unsafe ladders from service until defects are corrected. ` +
          `Document repairs, replacements, tagging, disposal, and employee ` +
          `notification. Reinspect the ladder by ${nextInspectionDate}.`,
      },
    ],
    disclaimer:
      "This ladder inspection checklist is a documentation aid and does not replace applicable regulations, manufacturer instructions, competent-person evaluation, or employer safety procedures.",
  };
}
