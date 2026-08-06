export type IncidentCostInput = Readonly<{
  medicalCosts: number;
  wageReplacementCosts: number;
  propertyDamageCosts: number;
  emergencyResponseCosts: number;
  replacementLaborCosts: number;
  legalAndAdministrativeCosts: number;
  otherDirectCosts: number;
  investigationHours: number;
  investigationHourlyCost: number;
  lostProductivityHours: number;
  productivityHourlyValue: number;
  additionalIndirectCostMultiplier: number;
}>;

export type IncidentCostResult = Readonly<{
  medicalCosts: number;
  wageReplacementCosts: number;
  propertyDamageCosts: number;
  emergencyResponseCosts: number;
  replacementLaborCosts: number;
  legalAndAdministrativeCosts: number;
  otherDirectCosts: number;
  investigationHours: number;
  investigationHourlyCost: number;
  investigationCost: number;
  lostProductivityHours: number;
  productivityHourlyValue: number;
  productivityLossCost: number;
  directCostSubtotal: number;
  documentedIndirectCostSubtotal: number;
  documentedCostTotal: number;
  additionalIndirectCostMultiplier: number;
  estimatedAdditionalIndirectCosts: number;
  estimatedTotalIncidentCost: number;
  directCostEquation: string;
  investigationCostEquation: string;
  productivityLossEquation: string;
  totalCostEquation: string;
  interpretation: string;
  disclaimer: string;
}>;

function validateNonNegativeNumber(
  value: number,
  label: string,
): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (value < 0) {
    throw new Error(`${label} must not be negative.`);
  }
}

function toCents(
  value: number,
  label: string,
): number {
  validateNonNegativeNumber(value, label);

  const cents = Math.round(
    (value + Number.EPSILON) * 100,
  );

  if (!Number.isSafeInteger(cents)) {
    throw new Error(
      `${label} is too large to calculate safely.`,
    );
  }

  return cents;
}

function fromCents(cents: number): number {
  return cents / 100;
}

function sumCents(
  values: readonly number[],
  label: string,
): number {
  const total = values.reduce(
    (currentTotal, value) =>
      currentTotal + value,
    0,
  );

  if (!Number.isSafeInteger(total)) {
    throw new Error(
      `${label} is too large to calculate safely.`,
    );
  }

  return total;
}

function multiplyToCents(
  quantity: number,
  unitValue: number,
  label: string,
): number {
  validateNonNegativeNumber(
    quantity,
    `${label} quantity`,
  );

  validateNonNegativeNumber(
    unitValue,
    `${label} unit value`,
  );

  const product = quantity * unitValue;

  if (!Number.isFinite(product)) {
    throw new Error(
      `${label} is too large to calculate safely.`,
    );
  }

  return toCents(product, label);
}

function applyMultiplierToCents(
  baseCents: number,
  multiplier: number,
  label: string,
): number {
  validateNonNegativeNumber(multiplier, label);

  const result = Math.round(
    baseCents * multiplier,
  );

  if (!Number.isSafeInteger(result)) {
    throw new Error(
      `${label} is too large to calculate safely.`,
    );
  }

  return result;
}

function formatCurrencyFromCents(
  cents: number,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fromCents(cents));
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 20,
  }).format(value);
}

export function calculateIncidentCost(
  input: IncidentCostInput,
): IncidentCostResult {
  const {
    medicalCosts,
    wageReplacementCosts,
    propertyDamageCosts,
    emergencyResponseCosts,
    replacementLaborCosts,
    legalAndAdministrativeCosts,
    otherDirectCosts,
    investigationHours,
    investigationHourlyCost,
    lostProductivityHours,
    productivityHourlyValue,
    additionalIndirectCostMultiplier,
  } = input;

  const directCostCents = [
    toCents(
      medicalCosts,
      "Medical costs",
    ),
    toCents(
      wageReplacementCosts,
      "Wage replacement costs",
    ),
    toCents(
      propertyDamageCosts,
      "Property damage costs",
    ),
    toCents(
      emergencyResponseCosts,
      "Emergency response costs",
    ),
    toCents(
      replacementLaborCosts,
      "Replacement labor costs",
    ),
    toCents(
      legalAndAdministrativeCosts,
      "Legal and administrative costs",
    ),
    toCents(
      otherDirectCosts,
      "Other direct costs",
    ),
  ];

  const investigationCostCents =
    multiplyToCents(
      investigationHours,
      investigationHourlyCost,
      "Investigation cost",
    );

  const productivityLossCostCents =
    multiplyToCents(
      lostProductivityHours,
      productivityHourlyValue,
      "Productivity loss cost",
    );

  const directCostSubtotalCents =
    sumCents(
      directCostCents,
      "Direct cost subtotal",
    );

  const documentedIndirectCostSubtotalCents =
    sumCents(
      [
        investigationCostCents,
        productivityLossCostCents,
      ],
      "Documented indirect cost subtotal",
    );

  const documentedCostTotalCents =
    sumCents(
      [
        directCostSubtotalCents,
        documentedIndirectCostSubtotalCents,
      ],
      "Documented incident cost total",
    );

  const estimatedAdditionalIndirectCostCents =
    applyMultiplierToCents(
      documentedCostTotalCents,
      additionalIndirectCostMultiplier,
      "Estimated additional indirect costs",
    );

  const estimatedTotalIncidentCostCents =
    sumCents(
      [
        documentedCostTotalCents,
        estimatedAdditionalIndirectCostCents,
      ],
      "Estimated total incident cost",
    );

  const investigationCost = fromCents(
    investigationCostCents,
  );

  const productivityLossCost = fromCents(
    productivityLossCostCents,
  );

  const directCostSubtotal = fromCents(
    directCostSubtotalCents,
  );

  const documentedIndirectCostSubtotal =
    fromCents(
      documentedIndirectCostSubtotalCents,
    );

  const documentedCostTotal = fromCents(
    documentedCostTotalCents,
  );

  const estimatedAdditionalIndirectCosts =
    fromCents(
      estimatedAdditionalIndirectCostCents,
    );

  const estimatedTotalIncidentCost =
    fromCents(
      estimatedTotalIncidentCostCents,
    );

  return {
    medicalCosts,
    wageReplacementCosts,
    propertyDamageCosts,
    emergencyResponseCosts,
    replacementLaborCosts,
    legalAndAdministrativeCosts,
    otherDirectCosts,
    investigationHours,
    investigationHourlyCost,
    investigationCost,
    lostProductivityHours,
    productivityHourlyValue,
    productivityLossCost,
    directCostSubtotal,
    documentedIndirectCostSubtotal,
    documentedCostTotal,
    additionalIndirectCostMultiplier,
    estimatedAdditionalIndirectCosts,
    estimatedTotalIncidentCost,
    directCostEquation:
      directCostCents
        .map(formatCurrencyFromCents)
        .join(" + ") +
      ` = ${formatCurrencyFromCents(
        directCostSubtotalCents,
      )}`,
    investigationCostEquation:
      `${formatNumber(investigationHours)} hours × ` +
      `${formatCurrency(investigationHourlyCost)} = ` +
      `${formatCurrencyFromCents(
        investigationCostCents,
      )}`,
    productivityLossEquation:
      `${formatNumber(lostProductivityHours)} hours × ` +
      `${formatCurrency(productivityHourlyValue)} = ` +
      `${formatCurrencyFromCents(
        productivityLossCostCents,
      )}`,
    totalCostEquation:
      `${formatCurrencyFromCents(
        documentedCostTotalCents,
      )} + ` +
      `${formatCurrencyFromCents(
        estimatedAdditionalIndirectCostCents,
      )} = ` +
      `${formatCurrencyFromCents(
        estimatedTotalIncidentCostCents,
      )}`,
    interpretation:
      `The entered and modeled costs produce an estimated total ` +
      `incident cost of ${formatCurrencyFromCents(
        estimatedTotalIncidentCostCents,
      )}. This includes ${formatCurrencyFromCents(
        documentedCostTotalCents,
      )} in documented costs and ${formatCurrencyFromCents(
        estimatedAdditionalIndirectCostCents,
      )} in additional indirect costs generated by the selected multiplier.`,
    disclaimer:
      "This calculator is an internal planning and documentation aid, " +
      "not an OSHA-required cost formula, insurance valuation, accounting " +
      "opinion, legal estimate, workers' compensation determination, or " +
      "compliance assessment. Actual incident costs may include omitted, " +
      "delayed, disputed, confidential, or jurisdiction-specific amounts. " +
      "Use verified organizational records and qualified professional review " +
      "for financial, legal, insurance, tax, or regulatory decisions.",
  };
}
