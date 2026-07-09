export type SafetyPlanInput = {
  companyName: string;
  projectName: string;
  trade: string;
  jobsiteLocation: string;
  primaryHazards: string[];
  requiredPpe: string[];
  emergencyContact: string;
};

export type SafetyPlanSection = {
  title: string;
  items: string[];
};

export type SafetyPlanResult = {
  title: string;
  summary: string;
  sections: SafetyPlanSection[];
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

export function generateSafetyPlan(input: SafetyPlanInput): SafetyPlanResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const trade = cleanText(input.trade);
  const jobsiteLocation = cleanText(input.jobsiteLocation);
  const emergencyContact = cleanText(input.emergencyContact);
  const hazards = cleanList(input.primaryHazards);
  const ppe = cleanList(input.requiredPpe);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!trade) {
    throw new Error("Trade is required.");
  }

  if (!jobsiteLocation) {
    throw new Error("Jobsite location is required.");
  }

  if (hazards.length === 0) {
    throw new Error("At least one primary hazard is required.");
  }

  if (ppe.length === 0) {
    throw new Error("At least one PPE item is required.");
  }

  if (!emergencyContact) {
    throw new Error("Emergency contact is required.");
  }

  return {
    title: `${trade} Safety Plan for ${projectName}`,
    summary: `${companyName} should use this safety plan outline to document jobsite expectations, known hazards, PPE requirements, emergency procedures, and corrective action responsibilities for ${jobsiteLocation}.`,
    sections: [
      {
        title: "Project Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Trade or work type: ${trade}`,
          `Jobsite location: ${jobsiteLocation}`,
        ],
      },
      {
        title: "Primary Jobsite Hazards",
        items: hazards.map((hazard) => `Identify, communicate, and control ${hazard}.`),
      },
      {
        title: "Required PPE",
        items: ppe.map((item) => `Require and inspect ${item} before relevant work begins.`),
      },
      {
        title: "Emergency Procedure",
        items: [
          `Post emergency contact information clearly: ${emergencyContact}.`,
          "Stop work immediately when an uncontrolled serious hazard is identified.",
          "Report incidents, near misses, unsafe conditions, and corrective actions in writing.",
        ],
      },
      {
        title: "Supervisor Review",
        items: [
          "Review this plan with affected workers before work begins.",
          "Update the plan when jobsite conditions, tasks, crews, or hazards change.",
          "Keep signed safety meetings, inspections, and incident records with the project file.",
        ],
      },
    ],
    disclaimer:
      "This generated safety plan is an informational documentation aid only. It is not legal advice, certified safety advice, or a substitute for OSHA, state, local, project-specific, or qualified safety professional guidance.",
  };
}
