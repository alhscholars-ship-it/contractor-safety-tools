export type IncidentReportInput = {
  companyName: string;
  projectName: string;
  incidentDate: string;
  incidentLocation: string;
  incidentType: string;
  description: string;
  peopleInvolved: string[];
  witnesses: string[];
  immediateActions: string[];
  correctiveActions: string[];
  supervisorName: string;
};

export type IncidentReportSection = {
  title: string;
  items: string[];
};

export type IncidentReportResult = {
  title: string;
  summary: string;
  sections: IncidentReportSection[];
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

export function generateIncidentReport(
  input: IncidentReportInput,
): IncidentReportResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const incidentDate = cleanText(input.incidentDate);
  const incidentLocation = cleanText(input.incidentLocation);
  const incidentType = cleanText(input.incidentType);
  const description = cleanText(input.description);
  const supervisorName = cleanText(input.supervisorName);
  const peopleInvolved = cleanList(input.peopleInvolved);
  const witnesses = cleanList(input.witnesses);
  const immediateActions = cleanList(input.immediateActions);
  const correctiveActions = cleanList(input.correctiveActions);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!incidentDate) {
    throw new Error("Incident date is required.");
  }

  if (!incidentLocation) {
    throw new Error("Incident location is required.");
  }

  if (!incidentType) {
    throw new Error("Incident type is required.");
  }

  if (!description) {
    throw new Error("Incident description is required.");
  }

  if (peopleInvolved.length === 0) {
    throw new Error("At least one involved person is required.");
  }

  if (immediateActions.length === 0) {
    throw new Error("At least one immediate action is required.");
  }

  if (correctiveActions.length === 0) {
    throw new Error("At least one corrective action is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  return {
    title: `${incidentType} Incident Report for ${projectName}`,
    summary: `${companyName} should review and retain this incident report draft for the ${incidentType.toLowerCase()} event documented at ${incidentLocation} on ${incidentDate}.`,
    sections: [
      {
        title: "Incident Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Date: ${incidentDate}`,
          `Location: ${incidentLocation}`,
          `Incident type: ${incidentType}`,
          `Supervisor: ${supervisorName}`,
        ],
      },
      {
        title: "Incident Description",
        items: [description],
      },
      {
        title: "People Involved",
        items: peopleInvolved,
      },
      {
        title: "Witnesses",
        items: witnesses.length > 0 ? witnesses : ["No witnesses listed."],
      },
      {
        title: "Immediate Actions Taken",
        items: immediateActions,
      },
      {
        title: "Corrective Actions",
        items: correctiveActions.map((action) => `Follow up on: ${action}`),
      },
      {
        title: "Documentation Reminders",
        items: [
          "Preserve photos, statements, inspection notes, and relevant jobsite records.",
          "Document who completed each corrective action and when it was verified.",
          "Review incident trends during future safety meetings.",
        ],
      },
    ],
    disclaimer:
      "This generated incident report is an informational documentation aid only. It is not legal advice, medical advice, certified safety advice, or a substitute for OSHA, state, local, insurance, project-specific, or qualified professional guidance.",
  };
}
