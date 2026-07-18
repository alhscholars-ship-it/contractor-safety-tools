export type DailyJobsiteSafetyInspectionInput = {
  companyName: string;
  projectName: string;
  jobsiteLocation: string;
  inspectionDate: string;
  inspectorName: string;
  weatherConditions: string;
  activeTrades: string[];
  inspectionAreas: string[];
  observedHazards: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  followUpDate: string;
};

export type DailyJobsiteSafetyInspectionSection = {
  title: string;
  items: string[];
};

export type DailyJobsiteSafetyInspectionResult = {
  title: string;
  summary: string;
  sections: DailyJobsiteSafetyInspectionSection[];
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

export function generateDailyJobsiteSafetyInspection(
  input: DailyJobsiteSafetyInspectionInput,
): DailyJobsiteSafetyInspectionResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const jobsiteLocation = cleanText(input.jobsiteLocation);
  const inspectionDate = cleanText(input.inspectionDate);
  const inspectorName = cleanText(input.inspectorName);
  const weatherConditions = cleanText(input.weatherConditions);
  const followUpDate = cleanText(input.followUpDate);

  const activeTrades = cleanList(input.activeTrades);
  const inspectionAreas = cleanList(input.inspectionAreas);
  const observedHazards = cleanList(input.observedHazards);
  const correctiveActions = cleanList(input.correctiveActions);
  const responsiblePersons = cleanList(input.responsiblePersons);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!jobsiteLocation) {
    throw new Error("Jobsite location is required.");
  }

  if (!inspectionDate) {
    throw new Error("Inspection date is required.");
  }

  if (!inspectorName) {
    throw new Error("Inspector name is required.");
  }

  if (!weatherConditions) {
    throw new Error("Weather conditions are required.");
  }

  if (activeTrades.length === 0) {
    throw new Error("At least one active trade is required.");
  }

  if (inspectionAreas.length === 0) {
    throw new Error("At least one inspection area is required.");
  }

  if (observedHazards.length === 0) {
    throw new Error("At least one observed hazard is required.");
  }

  if (correctiveActions.length === 0) {
    throw new Error("At least one corrective action is required.");
  }

  if (responsiblePersons.length === 0) {
    throw new Error("At least one responsible person is required.");
  }

  if (!followUpDate) {
    throw new Error("Follow-up date is required.");
  }

  return {
    title: `Daily Jobsite Safety Inspection — ${projectName}`,
    summary: `${companyName} conducted a daily safety inspection at ${jobsiteLocation} on ${inspectionDate}. The inspection was completed by ${inspectorName}.`,
    sections: [
      {
        title: "Inspection Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Jobsite location: ${jobsiteLocation}`,
          `Inspection date: ${inspectionDate}`,
          `Inspector: ${inspectorName}`,
          `Weather conditions: ${weatherConditions}`,
          `Follow-up date: ${followUpDate}`,
        ],
      },
      {
        title: "Active Trades",
        items: activeTrades.map((trade) => `Active trade or crew: ${trade}`),
      },
      {
        title: "Inspection Areas",
        items: inspectionAreas.map(
          (area) => `Inspect and document conditions in: ${area}`,
        ),
      },
      {
        title: "Observed Hazards and Deficiencies",
        items: observedHazards.map(
          (hazard, index) => `${index + 1}. ${hazard}`,
        ),
      },
      {
        title: "Required Corrective Actions",
        items: correctiveActions.map(
          (action, index) => `${index + 1}. ${action}`,
        ),
      },
      {
        title: "Responsible Persons",
        items: responsiblePersons.map(
          (person) => `Corrective-action owner: ${person}`,
        ),
      },
      {
        title: "Daily Inspection Reminders",
        items: [
          "Correct imminent-danger conditions before affected work continues.",
          "Communicate identified hazards and controls to affected workers.",
          "Photograph or otherwise document significant deficiencies when appropriate.",
          "Track incomplete corrective actions through closure.",
          "Retain the completed inspection with project safety records.",
        ],
      },
    ],
    disclaimer:
      "This generated daily jobsite safety inspection is an informational documentation aid only. It does not determine regulatory compliance, certify that a jobsite is safe, replace competent-person inspections, or substitute for OSHA, state, local, manufacturer, project-specific, or qualified safety professional requirements.",
  };
}
