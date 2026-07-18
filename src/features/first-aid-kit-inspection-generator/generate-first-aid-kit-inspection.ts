export interface FirstAidKitInspectionInput {
  companyName: string;
  projectName: string;
  inspectionDate: string;
  inspectorName: string;
  kitId: string;
  kitLocation: string;
  kitType: string;
  accessibilityStatus: string;
  containerCondition: string;
  inventoryStatus: string;
  expirationStatus: string;
  requiredSupplies: string[];
  missingOrExpiredItems: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  nextInspectionDate: string;
}

export interface FirstAidKitInspectionSection {
  title: string;
  items: string[];
}

export interface FirstAidKitInspectionResult {
  title: string;
  summary: string;
  sections: FirstAidKitInspectionSection[];
  disclaimer: string;
}

const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const requireText = (value: string, fieldName: string) => {
  const normalized = normalizeText(value);

  if (!normalized) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalized;
};

const cleanUniqueList = (values: string[], fieldName: string) => {
  const normalizedValues = values
    .map(normalizeText)
    .filter(Boolean);

  if (normalizedValues.length === 0) {
    throw new Error(`${fieldName} must include at least one item.`);
  }

  return [...new Set(normalizedValues)];
};

const numberItems = (values: string[]) =>
  values.map((value, index) => `${index + 1}. ${value}`);

export function generateFirstAidKitInspection(
  input: FirstAidKitInspectionInput,
): FirstAidKitInspectionResult {
  const companyName = requireText(input.companyName, "companyName");
  const projectName = requireText(input.projectName, "projectName");
  const inspectionDate = requireText(
    input.inspectionDate,
    "inspectionDate",
  );
  const inspectorName = requireText(input.inspectorName, "inspectorName");
  const kitId = requireText(input.kitId, "kitId");
  const kitLocation = requireText(input.kitLocation, "kitLocation");
  const kitType = requireText(input.kitType, "kitType");
  const accessibilityStatus = requireText(
    input.accessibilityStatus,
    "accessibilityStatus",
  );
  const containerCondition = requireText(
    input.containerCondition,
    "containerCondition",
  );
  const inventoryStatus = requireText(
    input.inventoryStatus,
    "inventoryStatus",
  );
  const expirationStatus = requireText(
    input.expirationStatus,
    "expirationStatus",
  );
  const nextInspectionDate = requireText(
    input.nextInspectionDate,
    "nextInspectionDate",
  );

  const requiredSupplies = cleanUniqueList(
    input.requiredSupplies,
    "requiredSupplies",
  );
  const missingOrExpiredItems = cleanUniqueList(
    input.missingOrExpiredItems,
    "missingOrExpiredItems",
  );
  const correctiveActions = cleanUniqueList(
    input.correctiveActions,
    "correctiveActions",
  );
  const responsiblePersons = cleanUniqueList(
    input.responsiblePersons,
    "responsiblePersons",
  );

  return {
    title: `${projectName} First Aid Kit Inspection`,
    summary:
      `${companyName} first aid kit inspection for kit ${kitId} at ` +
      `${kitLocation}, completed by ${inspectorName} on ${inspectionDate}.`,
    sections: [
      {
        title: "Inspection Details",
        items: [
          `Company: ${companyName}`,
          `Project or facility: ${projectName}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Kit ID: ${kitId}`,
          `Kit type: ${kitType}`,
          `Kit location: ${kitLocation}`,
          `Next inspection date: ${nextInspectionDate}`,
        ],
      },
      {
        title: "Condition Checks",
        items: [
          `Accessibility and visibility: ${accessibilityStatus}`,
          `Container condition: ${containerCondition}`,
          `Inventory status: ${inventoryStatus}`,
          `Expiration-date status: ${expirationStatus}`,
        ],
      },
      {
        title: "Required Supplies Reviewed",
        items: numberItems(requiredSupplies),
      },
      {
        title: "Missing, Damaged, or Expired Items",
        items: numberItems(missingOrExpiredItems),
      },
      {
        title: "Corrective Actions",
        items: numberItems(correctiveActions),
      },
      {
        title: "Responsible Persons",
        items: responsiblePersons,
      },
      {
        title: "Documentation and Follow-Up",
        items: [
          "Restock or replace missing, damaged, contaminated, opened, or expired supplies promptly.",
          "Confirm the first aid kit remains accessible, clearly identified, and protected from environmental damage.",
          "Retain the completed inspection record according to the employer's safety and recordkeeping procedures.",
          `Verify corrective actions and kit readiness by ${nextInspectionDate}.`,
        ],
      },
    ],
    disclaimer:
      "This generated checklist is an informational documentation aid only. It does not certify regulatory compliance, determine the appropriate first aid supplies for every workplace hazard, replace medical advice or emergency planning, or supersede applicable OSHA requirements, ANSI standards, manufacturer instructions, employer procedures, or qualified safety review.",
  };
}
