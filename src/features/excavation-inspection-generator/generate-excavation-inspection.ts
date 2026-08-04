export type ExcavationInspectionInput = {
  companyName: string;
  projectName: string;
  inspectionDate: string;
  inspectorName: string;
  excavationId: string;
  excavationLocation: string;
  excavationDepth: string;
  soilClassification: string;
  competentPerson: string;
  protectiveSystemCondition: string;
  accessEgressCondition: string;
  spoilPileCondition: string;
  undergroundUtilityCondition: string;
  waterAccumulationCondition: string;
  atmosphericCondition: string;
  adjacentStructureCondition: string;
  mobileEquipmentCondition: string;
  barricadeCondition: string;
  weatherCondition: string;
  inspectionFindings: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  nextInspectionDate: string;
};

export type ExcavationInspectionSection = {
  heading: string;
  content: string;
};

export type ExcavationInspectionResult = {
  title: string;
  summary: string;
  sections: ExcavationInspectionSection[];
  disclaimer: string;
};

const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const normalizeList = (values: string[]) => {
  const normalizedValues = values
    .map(normalizeText)
    .filter(Boolean);
  const uniqueValues = new Map<string, string>();

  for (const value of normalizedValues) {
    const key = value.toLowerCase();

    if (!uniqueValues.has(key)) {
      uniqueValues.set(key, value);
    }
  }

  return [...uniqueValues.values()];
};

const requireText = (
  value: string,
  fieldName: keyof ExcavationInspectionInput,
) => {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalizedValue;
};

const requireList = (
  values: string[],
  fieldName: keyof ExcavationInspectionInput,
) => {
  const normalizedValues = normalizeList(values);

  if (normalizedValues.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`);
  }

  return normalizedValues;
};

const numberItems = (items: string[]) =>
  items.map((item, index) => `${index + 1}. ${item}`).join("\n");

export function generateExcavationInspection(
  input: ExcavationInspectionInput,
): ExcavationInspectionResult {
  const companyName = requireText(input.companyName, "companyName");
  const projectName = requireText(input.projectName, "projectName");
  const inspectionDate = requireText(
    input.inspectionDate,
    "inspectionDate",
  );
  const inspectorName = requireText(input.inspectorName, "inspectorName");
  const excavationId = requireText(input.excavationId, "excavationId");
  const excavationLocation = requireText(
    input.excavationLocation,
    "excavationLocation",
  );
  const excavationDepth = requireText(
    input.excavationDepth,
    "excavationDepth",
  );
  const soilClassification = requireText(
    input.soilClassification,
    "soilClassification",
  );
  const competentPerson = requireText(
    input.competentPerson,
    "competentPerson",
  );
  const protectiveSystemCondition = requireText(
    input.protectiveSystemCondition,
    "protectiveSystemCondition",
  );
  const accessEgressCondition = requireText(
    input.accessEgressCondition,
    "accessEgressCondition",
  );
  const spoilPileCondition = requireText(
    input.spoilPileCondition,
    "spoilPileCondition",
  );
  const undergroundUtilityCondition = requireText(
    input.undergroundUtilityCondition,
    "undergroundUtilityCondition",
  );
  const waterAccumulationCondition = requireText(
    input.waterAccumulationCondition,
    "waterAccumulationCondition",
  );
  const atmosphericCondition = requireText(
    input.atmosphericCondition,
    "atmosphericCondition",
  );
  const adjacentStructureCondition = requireText(
    input.adjacentStructureCondition,
    "adjacentStructureCondition",
  );
  const mobileEquipmentCondition = requireText(
    input.mobileEquipmentCondition,
    "mobileEquipmentCondition",
  );
  const barricadeCondition = requireText(
    input.barricadeCondition,
    "barricadeCondition",
  );
  const weatherCondition = requireText(
    input.weatherCondition,
    "weatherCondition",
  );
  const inspectionFindings = requireList(
    input.inspectionFindings,
    "inspectionFindings",
  );
  const correctiveActions = requireList(
    input.correctiveActions,
    "correctiveActions",
  );
  const responsiblePersons = requireList(
    input.responsiblePersons,
    "responsiblePersons",
  );
  const nextInspectionDate = requireText(
    input.nextInspectionDate,
    "nextInspectionDate",
  );

  return {
    title: `${projectName} Excavation Inspection`,
    summary:
      `${companyName} excavation inspection completed on ${inspectionDate} ` +
      `by ${inspectorName} for excavation ${excavationId} at ` +
      `${excavationLocation}.`,
    sections: [
      {
        heading: "Inspection Details",
        content: [
          `Company: ${companyName}`,
          `Project or facility: ${projectName}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Competent person: ${competentPerson}`,
          `Excavation ID: ${excavationId}`,
          `Excavation location: ${excavationLocation}`,
          `Excavation depth: ${excavationDepth}`,
          `Soil classification: ${soilClassification}`,
        ].join("\n"),
      },
      {
        heading: "Protective Systems and Access",
        content: [
          `Sloping, benching, shoring, or shielding: ${protectiveSystemCondition}`,
          `Safe access and egress: ${accessEgressCondition}`,
          `Spoil piles, materials, and equipment setback: ${spoilPileCondition}`,
          `Barricades, warning systems, and edge protection: ${barricadeCondition}`,
        ].join("\n"),
      },
      {
        heading: "Utilities and Environmental Hazards",
        content: [
          `Underground utility identification and protection: ${undergroundUtilityCondition}`,
          `Water accumulation and drainage controls: ${waterAccumulationCondition}`,
          `Atmospheric testing and hazardous atmospheres: ${atmosphericCondition}`,
          `Weather and changing site conditions: ${weatherCondition}`,
        ].join("\n"),
      },
      {
        heading: "Adjacent Operations and Stability",
        content: [
          `Adjacent structures, foundations, and vibration exposure: ${adjacentStructureCondition}`,
          `Mobile equipment, traffic, and operator visibility: ${mobileEquipmentCondition}`,
        ].join("\n"),
      },
      {
        heading: "Inspection Findings",
        content: numberItems(inspectionFindings),
      },
      {
        heading: "Corrective Actions",
        content: numberItems(correctiveActions),
      },
      {
        heading: "Responsible Persons",
        content: numberItems(responsiblePersons),
      },
      {
        heading: "Access Restriction and Follow-Up",
        content: [
          "Immediately restrict entry when a cave-in hazard, unstable soil, defective protective system, hazardous atmosphere, water accumulation, utility exposure, falling-load hazard, or other unsafe condition is identified.",
          "Do not allow employees to enter or re-enter the affected excavation until required corrections are completed and the excavation is reinspected by an authorized competent person.",
          `Next scheduled inspection date: ${nextInspectionDate}`,
        ].join("\n"),
      },
    ],
    disclaimer:
      "This excavation inspection generator is a documentation aid and does not certify excavation safety or regulatory compliance. Soil classification, protective systems, access and egress, underground utilities, atmospheric hazards, water control, adjacent structures, mobile equipment, inspections, and employee entry must follow applicable regulations, engineered requirements, competent-person determinations, site conditions, and employer safety procedures.",
  };
}
