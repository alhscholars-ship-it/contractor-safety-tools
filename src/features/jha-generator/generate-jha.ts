export type JhaInput = {
  companyName: string;
  projectName: string;
  taskName: string;
  jobsiteLocation: string;
  taskSteps: string[];
  hazards: string[];
  controls: string[];
  requiredPpe: string[];
  supervisorName: string;
};

export type JhaSection = {
  title: string;
  items: string[];
};

export type JhaResult = {
  title: string;
  summary: string;
  sections: JhaSection[];
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

export function generateJha(input: JhaInput): JhaResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const taskName = cleanText(input.taskName);
  const jobsiteLocation = cleanText(input.jobsiteLocation);
  const supervisorName = cleanText(input.supervisorName);
  const taskSteps = cleanList(input.taskSteps);
  const hazards = cleanList(input.hazards);
  const controls = cleanList(input.controls);
  const requiredPpe = cleanList(input.requiredPpe);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!taskName) {
    throw new Error("Task name is required.");
  }

  if (!jobsiteLocation) {
    throw new Error("Jobsite location is required.");
  }

  if (taskSteps.length === 0) {
    throw new Error("At least one task step is required.");
  }

  if (hazards.length === 0) {
    throw new Error("At least one hazard is required.");
  }

  if (controls.length === 0) {
    throw new Error("At least one control is required.");
  }

  if (requiredPpe.length === 0) {
    throw new Error("At least one PPE item is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  return {
    title: `${taskName} JHA for ${projectName}`,
    summary: `${companyName} should review this job hazard analysis before performing ${taskName.toLowerCase()} at ${jobsiteLocation}.`,
    sections: [
      {
        title: "Job Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Task: ${taskName}`,
          `Jobsite location: ${jobsiteLocation}`,
          `Supervisor: ${supervisorName}`,
        ],
      },
      {
        title: "Task Steps",
        items: taskSteps.map((step, index) => `${index + 1}. ${step}`),
      },
      {
        title: "Potential Hazards",
        items: hazards.map((hazard) => `Identify and communicate: ${hazard}`),
      },
      {
        title: "Hazard Controls",
        items: controls.map((control) => `Use or verify control: ${control}`),
      },
      {
        title: "Required PPE",
        items: requiredPpe.map((item) => `Inspect and use: ${item}`),
      },
      {
        title: "Review Notes",
        items: [
          "Review this JHA with affected workers before the task begins.",
          "Stop work if hazards change or controls are missing.",
          "Update the JHA when jobsite conditions, equipment, or task steps change.",
          "Keep the completed JHA with project safety documentation.",
        ],
      },
    ],
    disclaimer:
      "This generated JHA is an informational documentation aid only. It is not legal advice, certified safety advice, or a substitute for OSHA, state, local, project-specific, or qualified safety professional guidance.",
  };
}
