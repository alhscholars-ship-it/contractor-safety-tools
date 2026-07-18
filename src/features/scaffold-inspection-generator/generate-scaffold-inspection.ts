export type ScaffoldInspectionInput = {
  companyName: string;
  projectName: string;
  inspectionDate: string;
  inspectorName: string;
  scaffoldId: string;
  scaffoldType: string;
  scaffoldLocation: string;
  competentPerson: string;
  foundationCondition: string;
  frameCondition: string;
  bracingCondition: string;
  platformCondition: string;
  accessCondition: string;
  guardrailCondition: string;
  fallProtectionCondition: string;
  tieInCondition: string;
  loadCondition: string;
  electricalClearanceCondition: string;
  weatherCondition: string;
  inspectionFindings: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  nextInspectionDate: string;
};

export type ScaffoldInspectionSection = {
  heading: string;
  content: string;
};

export type ScaffoldInspectionResult = {
  title: string;
  summary: string;
  sections: ScaffoldInspectionSection[];
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
  fieldName: keyof ScaffoldInspectionInput,
) => {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalizedValue;
};

const requireList = (
  values: string[],
  fieldName: keyof ScaffoldInspectionInput,
) => {
  const normalizedValues = normalizeList(values);

  if (normalizedValues.length === 0) {
    throw new Error(`${fieldName} must contain at least one item.`);
  }

  return normalizedValues;
};

const numberItems = (items: string[]) =>
  items.map((item, index) => `${index + 1}. ${item}`).join("\n");

export function generateScaffoldInspection(
  input: ScaffoldInspectionInput,
): ScaffoldInspectionResult {
  const companyName = requireText(input.companyName, "companyName");
  const projectName = requireText(input.projectName, "projectName");
  const inspectionDate = requireText(
    input.inspectionDate,
    "inspectionDate",
  );
  const inspectorName = requireText(input.inspectorName, "inspectorName");
  const scaffoldId = requireText(input.scaffoldId, "scaffoldId");
  const scaffoldType = requireText(input.scaffoldType, "scaffoldType");
  const scaffoldLocation = requireText(
    input.scaffoldLocation,
    "scaffoldLocation",
  );
  const competentPerson = requireText(
    input.competentPerson,
    "competentPerson",
  );
  const foundationCondition = requireText(
    input.foundationCondition,
    "foundationCondition",
  );
  const frameCondition = requireText(
    input.frameCondition,
    "frameCondition",
  );
  const bracingCondition = requireText(
    input.bracingCondition,
    "bracingCondition",
  );
  const platformCondition = requireText(
    input.platformCondition,
    "platformCondition",
  );
  const accessCondition = requireText(
    input.accessCondition,
    "accessCondition",
  );
  const guardrailCondition = requireText(
    input.guardrailCondition,
    "guardrailCondition",
  );
  const fallProtectionCondition = requireText(
    input.fallProtectionCondition,
    "fallProtectionCondition",
  );
  const tieInCondition = requireText(
    input.tieInCondition,
    "tieInCondition",
  );
  const loadCondition = requireText(
    input.loadCondition,
    "loadCondition",
  );
  const electricalClearanceCondition = requireText(
    input.electricalClearanceCondition,
    "electricalClearanceCondition",
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
    title: `${projectName} Scaffold Inspection`,
    summary:
      `${companyName} scaffold inspection completed on ${inspectionDate} ` +
      `by ${inspectorName} for scaffold ${scaffoldId} at ` +
      `${scaffoldLocation}.`,
    sections: [
      {
        heading: "Inspection Details",
        content: [
          `Company: ${companyName}`,
          `Project or facility: ${projectName}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Competent person: ${competentPerson}`,
          `Scaffold ID: ${scaffoldId}`,
          `Scaffold type: ${scaffoldType}`,
          `Scaffold location: ${scaffoldLocation}`,
        ].join("\n"),
      },
      {
        heading: "Foundation and Structural Condition",
        content: [
          `Foundation, base plates, and mudsills: ${foundationCondition}`,
          `Frames, posts, and uprights: ${frameCondition}`,
          `Cross braces and structural bracing: ${bracingCondition}`,
          `Tie-ins, guys, and anchorage: ${tieInCondition}`,
        ].join("\n"),
      },
      {
        heading: "Platforms and Access",
        content: [
          `Platforms and planking: ${platformCondition}`,
          `Access ladders and entry points: ${accessCondition}`,
          `Guardrails, midrails, and toeboards: ${guardrailCondition}`,
          `Personal fall protection: ${fallProtectionCondition}`,
        ].join("\n"),
      },
      {
        heading: "Operating Conditions",
        content: [
          `Load capacity and stored materials: ${loadCondition}`,
          `Electrical clearance: ${electricalClearanceCondition}`,
          `Weather and environmental conditions: ${weatherCondition}`,
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
        heading: "Removal from Service and Follow-Up",
        content: [
          "Immediately restrict access to any scaffold with a defect or unsafe condition that could affect structural integrity, stability, access, fall protection, or safe use.",
          "Do not permit affected scaffold sections to return to service until corrective work is completed and the scaffold is reinspected by an authorized competent person.",
          `Next scheduled inspection date: ${nextInspectionDate}`,
        ].join("\n"),
      },
    ],
    disclaimer:
      "This scaffold inspection generator is a documentation aid and does not certify scaffold safety or regulatory compliance. Scaffold erection, alteration, inspection, access, loading, fall protection, electrical clearance, and use must follow applicable regulations, manufacturer instructions, engineered requirements, competent-person determinations, and employer safety procedures.",
  };
}
