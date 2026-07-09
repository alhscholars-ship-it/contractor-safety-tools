export type ToolboxTalkInput = {
  topic: string;
  trade: string;
  jobsite: string;
  hazards: string[];
  controls: string[];
  supervisorName: string;
};

export type ToolboxTalkResult = {
  title: string;
  opening: string;
  discussionPoints: string[];
  crewQuestions: string[];
  documentationNotes: string[];
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

export function generateToolboxTalk(input: ToolboxTalkInput): ToolboxTalkResult {
  const topic = cleanText(input.topic);
  const trade = cleanText(input.trade);
  const jobsite = cleanText(input.jobsite);
  const supervisorName = cleanText(input.supervisorName);
  const hazards = cleanList(input.hazards);
  const controls = cleanList(input.controls);

  if (!topic) {
    throw new Error("Topic is required.");
  }

  if (!trade) {
    throw new Error("Trade is required.");
  }

  if (!jobsite) {
    throw new Error("Jobsite is required.");
  }

  if (hazards.length === 0) {
    throw new Error("At least one hazard is required.");
  }

  if (controls.length === 0) {
    throw new Error("At least one control is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  return {
    title: `${topic} Toolbox Talk for ${trade}`,
    opening: `${supervisorName} should review this ${topic.toLowerCase()} toolbox talk with the ${trade.toLowerCase()} crew before work begins at ${jobsite}.`,
    discussionPoints: [
      `Confirm the crew understands the work area and today's ${topic.toLowerCase()} risks.`,
      ...hazards.map((hazard) => `Discuss how ${hazard} can affect workers, equipment, or the public.`),
      ...controls.map((control) => `Use ${control} as a required control before and during the task.`),
      "Stop work and notify supervision if conditions change or a serious uncontrolled hazard is found.",
    ],
    crewQuestions: [
      "What is the biggest hazard we expect today?",
      "What PPE or controls must be in place before work starts?",
      "Who should be notified if a near miss, injury, or unsafe condition occurs?",
    ],
    documentationNotes: [
      `Meeting leader: ${supervisorName}`,
      `Jobsite: ${jobsite}`,
      "Record meeting date, attendee names, signatures, and corrective actions.",
      "Keep toolbox talk records with the project safety file.",
    ],
    disclaimer:
      "This generated toolbox talk is an informational documentation aid only. It is not legal advice, certified safety training, or a substitute for OSHA, state, local, project-specific, or qualified safety professional guidance.",
  };
}
