export interface FireExtinguisherInspectionInput {
  companyName: string;
  projectName: string;
  inspectionDate: string;
  inspectorName: string;
  extinguisherId: string;
  extinguisherType: string;
  extinguisherLocation: string;
  pressureGaugeStatus: string;
  safetyPinStatus: string;
  hoseNozzleStatus: string;
  physicalCondition: string;
  accessibilityStatus: string;
  inspectionFindings: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  nextInspectionDate: string;
}

export interface FireExtinguisherInspectionSection {
  title: string;
  items: string[];
}

export interface FireExtinguisherInspectionResult {
  title: string;
  summary: string;
  sections: FireExtinguisherInspectionSection[];
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

export function generateFireExtinguisherInspection(
  input: FireExtinguisherInspectionInput,
): FireExtinguisherInspectionResult {
  const companyName = requireText(input.companyName, "companyName");
  const projectName = requireText(input.projectName, "projectName");
  const inspectionDate = requireText(
    input.inspectionDate,
    "inspectionDate",
  );
  const inspectorName = requireText(input.inspectorName, "inspectorName");
  const extinguisherId = requireText(
    input.extinguisherId,
    "extinguisherId",
  );
  const extinguisherType = requireText(
    input.extinguisherType,
    "extinguisherType",
  );
  const extinguisherLocation = requireText(
    input.extinguisherLocation,
    "extinguisherLocation",
  );
  const pressureGaugeStatus = requireText(
    input.pressureGaugeStatus,
    "pressureGaugeStatus",
  );
  const safetyPinStatus = requireText(
    input.safetyPinStatus,
    "safetyPinStatus",
  );
  const hoseNozzleStatus = requireText(
    input.hoseNozzleStatus,
    "hoseNozzleStatus",
  );
  const physicalCondition = requireText(
    input.physicalCondition,
    "physicalCondition",
  );
  const accessibilityStatus = requireText(
    input.accessibilityStatus,
    "accessibilityStatus",
  );
  const nextInspectionDate = requireText(
    input.nextInspectionDate,
    "nextInspectionDate",
  );

  const inspectionFindings = cleanUniqueList(
    input.inspectionFindings,
    "inspectionFindings",
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
    title: `${projectName} Fire Extinguisher Inspection`,
    summary:
      `${companyName} fire extinguisher inspection for asset ` +
      `${extinguisherId} at ${extinguisherLocation}, completed by ` +
      `${inspectorName} on ${inspectionDate}.`,
    sections: [
      {
        title: "Inspection Details",
        items: [
          `Company: ${companyName}`,
          `Project or facility: ${projectName}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Extinguisher ID: ${extinguisherId}`,
          `Extinguisher type: ${extinguisherType}`,
          `Location: ${extinguisherLocation}`,
          `Next inspection date: ${nextInspectionDate}`,
        ],
      },
      {
        title: "Condition Checks",
        items: [
          `Pressure gauge: ${pressureGaugeStatus}`,
          `Safety pin and tamper seal: ${safetyPinStatus}`,
          `Hose and nozzle: ${hoseNozzleStatus}`,
          `Cylinder and physical condition: ${physicalCondition}`,
          `Mounting, visibility, and accessibility: ${accessibilityStatus}`,
        ],
      },
      {
        title: "Inspection Findings",
        items: numberItems(inspectionFindings),
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
          "Record the inspection in the applicable fire protection inspection log.",
          "Attach supporting photographs or maintenance records where appropriate.",
          "Remove an extinguisher from service when its condition requires repair, recharge, replacement, or qualified maintenance.",
          `Verify corrective actions and inspection status by ${nextInspectionDate}.`,
        ],
      },
    ],
    disclaimer:
      "This generated checklist is an informational documentation aid only. It does not certify fire-code compliance, replace required inspections or maintenance by qualified personnel, or supersede applicable OSHA requirements, fire codes, NFPA standards, manufacturer instructions, employer procedures, or authority-having-jurisdiction requirements.",
  };
}
