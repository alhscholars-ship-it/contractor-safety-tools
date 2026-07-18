export type LockoutTagoutChecklistInput = {
  companyName: string;
  projectName: string;
  equipmentName: string;
  equipmentLocation: string;
  authorizedEmployee: string;
  affectedEmployees: string[];
  energySources: string[];
  isolationPoints: string[];
  shutdownSteps: string[];
  verificationSteps: string[];
  restorationSteps: string[];
  requiredDevices: string[];
  supervisorName: string;
};

export type LockoutTagoutChecklistSection = {
  title: string;
  items: string[];
};

export type LockoutTagoutChecklistResult = {
  title: string;
  summary: string;
  sections: LockoutTagoutChecklistSection[];
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

export function generateLockoutTagoutChecklist(
  input: LockoutTagoutChecklistInput,
): LockoutTagoutChecklistResult {
  const companyName = cleanText(input.companyName);
  const projectName = cleanText(input.projectName);
  const equipmentName = cleanText(input.equipmentName);
  const equipmentLocation = cleanText(input.equipmentLocation);
  const authorizedEmployee = cleanText(input.authorizedEmployee);
  const supervisorName = cleanText(input.supervisorName);

  const affectedEmployees = cleanList(input.affectedEmployees);
  const energySources = cleanList(input.energySources);
  const isolationPoints = cleanList(input.isolationPoints);
  const shutdownSteps = cleanList(input.shutdownSteps);
  const verificationSteps = cleanList(input.verificationSteps);
  const restorationSteps = cleanList(input.restorationSteps);
  const requiredDevices = cleanList(input.requiredDevices);

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (!equipmentName) {
    throw new Error("Equipment name is required.");
  }

  if (!equipmentLocation) {
    throw new Error("Equipment location is required.");
  }

  if (!authorizedEmployee) {
    throw new Error("Authorized employee is required.");
  }

  if (affectedEmployees.length === 0) {
    throw new Error("At least one affected employee or work group is required.");
  }

  if (energySources.length === 0) {
    throw new Error("At least one hazardous energy source is required.");
  }

  if (isolationPoints.length === 0) {
    throw new Error("At least one energy isolation point is required.");
  }

  if (shutdownSteps.length === 0) {
    throw new Error("At least one shutdown step is required.");
  }

  if (verificationSteps.length === 0) {
    throw new Error("At least one zero-energy verification step is required.");
  }

  if (restorationSteps.length === 0) {
    throw new Error("At least one restoration step is required.");
  }

  if (requiredDevices.length === 0) {
    throw new Error("At least one lockout or tagout device is required.");
  }

  if (!supervisorName) {
    throw new Error("Supervisor name is required.");
  }

  return {
    title: `Lockout/Tagout Checklist for ${equipmentName}`,
    summary:
      `${companyName} should use this equipment-specific checklist for ` +
      `${equipmentName} at ${equipmentLocation} on the ${projectName} project.`,
    sections: [
      {
        title: "Project and Equipment Information",
        items: [
          `Company: ${companyName}`,
          `Project: ${projectName}`,
          `Equipment: ${equipmentName}`,
          `Equipment location: ${equipmentLocation}`,
          `Authorized employee: ${authorizedEmployee}`,
          `Supervisor: ${supervisorName}`,
        ],
      },
      {
        title: "Affected Employees and Work Groups",
        items: affectedEmployees.map(
          (employee) => `Notify before shutdown and before restart: ${employee}`,
        ),
      },
      {
        title: "Hazardous Energy Sources",
        items: energySources.map(
          (source) => `Identify and control hazardous energy from: ${source}`,
        ),
      },
      {
        title: "Energy Isolation Points",
        items: isolationPoints.map(
          (point) => `Locate, operate, and secure isolation point: ${point}`,
        ),
      },
      {
        title: "Required Lockout and Tagout Devices",
        items: requiredDevices.map(
          (device) => `Provide and inspect before use: ${device}`,
        ),
      },
      {
        title: "Shutdown and Isolation Sequence",
        items: shutdownSteps.map(
          (step, index) => `${index + 1}. ${step}`,
        ),
      },
      {
        title: "Zero-Energy Verification",
        items: verificationSteps.map(
          (step, index) => `${index + 1}. ${step}`,
        ),
      },
      {
        title: "Restoration and Return-to-Service Sequence",
        items: restorationSteps.map(
          (step, index) => `${index + 1}. ${step}`,
        ),
      },
      {
        title: "Documentation Reminders",
        items: [
          "Use only authorized, identifiable, and suitable lockout or tagout devices.",
          "Account for stored, residual, hydraulic, pneumatic, thermal, gravitational, and electrical energy.",
          "Document unusual conditions, deviations, device removal, shift changes, and corrective actions.",
          "Retain completed records according to employer and project procedures.",
        ],
      },
    ],
    disclaimer:
      "This generated lockout/tagout checklist is an informational documentation aid only. It is not legal advice, certified safety advice, an equipment-specific energy control procedure, or a substitute for OSHA, state, local, manufacturer, employer, project-specific, or qualified safety professional requirements.",
  };
}
