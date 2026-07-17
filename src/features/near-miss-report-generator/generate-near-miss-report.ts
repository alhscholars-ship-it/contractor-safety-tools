export type NearMissReportInput = {
  companyName: string;
  projectName: string;
  eventDate: string;
  eventLocation: string;
  reportedBy: string;
  supervisorName: string;
  eventDescription: string;
  potentialOutcome: string;
  whatPreventedInjury: string[];
  contributingFactors: string[];
  immediateActions: string[];
  correctiveActions: string[];
  responsiblePersons: string[];
  followUpDate: string;
  witnesses: string[];
};

export type NearMissReportSection = {
  title: string;
  items: string[];
};

export type NearMissReportResult = {
  title: string;
  summary: string;
  sections: NearMissReportSection[];
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

export function generateNearMissReport(
  input: NearMissReportInput,
): NearMissReportResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const eventDate = cleanText(input.eventDate);
  const eventLocation = cleanText(input.eventLocation);
  const reportedBy = cleanText(input.reportedBy);
  const supervisorName = cleanText(input.supervisorName);
  const eventDescription = cleanText(input.eventDescription);
  const potentialOutcome = cleanText(input.potentialOutcome);
  const followUpDate = cleanText(input.followUpDate);

  const whatPreventedInjury = cleanList(input.whatPreventedInjury);
  const contributingFactors = cleanList(input.contributingFactors);
  const immediateActions = cleanList(input.immediateActions);
  const correctiveActions = cleanList(input.correctiveActions);
  const responsiblePersons = cleanList(input.responsiblePersons);
  const witnesses = cleanList(input.witnesses);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!eventDate) {
    throw new Error("Near-miss date is required.");
  }

  if (!eventLocation) {
    throw new Error("Near-miss location is required.");
  }

  if (!reportedBy) {
    throw new Error("Reporter name is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  if (!eventDescription) {
    throw new Error("Near-miss description is required.");
  }

  if (!potentialOutcome) {
    throw new Error("Potential outcome is required.");
  }

  if (whatPreventedInjury.length === 0) {
    throw new Error("At least one injury-prevention factor is required.");
  }

  if (contributingFactors.length === 0) {
    throw new Error("At least one contributing factor is required.");
  }

  if (immediateActions.length === 0) {
    throw new Error("At least one immediate action is required.");
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
    title: `Near Miss Report for ${projectName}`,
    summary: `${companyName} should review this near-miss report for the event documented at ${eventLocation} on ${eventDate}, verify the facts, assign corrective actions, and retain the completed record.`,
    sections: [
      {
        title: "Report Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Event date: ${eventDate}`,
          `Location: ${eventLocation}`,
          `Reported by: ${reportedBy}`,
          `Supervisor: ${supervisorName}`,
          `Follow-up date: ${followUpDate}`,
        ],
      },
      {
        title: "Near-Miss Description",
        items: [eventDescription],
      },
      {
        title: "Potential Outcome",
        items: [potentialOutcome],
      },
      {
        title: "What Prevented Injury or Damage",
        items: whatPreventedInjury,
      },
      {
        title: "Contributing Factors",
        items: contributingFactors,
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
        items: correctiveActions.map((action) => `Corrective action: ${action}`),
      },
      {
        title: "Action Owners",
        items: responsiblePersons,
      },
      {
        title: "Follow-Up Reminders",
        items: [
          "Verify that each corrective action is completed and documented.",
          "Communicate relevant lessons learned to affected workers.",
          "Review related procedures, training, equipment, and job hazard analyses.",
          "Escalate high-potential events through the required company or project process.",
        ],
      },
    ],
    disclaimer:
      "This generated near-miss report is an informational documentation aid only. It is not legal advice, medical advice, certified safety advice, an OSHA determination, or a substitute for employer, insurer, client, regulatory, or qualified professional requirements.",
  };
}
