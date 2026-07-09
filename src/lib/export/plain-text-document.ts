export type PlainTextSection = {
  title: string;
  items: string[];
};

export type PlainTextDocumentInput = {
  title: string;
  summary: string;
  sections: PlainTextSection[];
  disclaimer: string;
};

export function createPlainTextDocument(input: PlainTextDocumentInput) {
  const lines = [
    input.title,
    "",
    input.summary,
    "",
    ...input.sections.flatMap((section) => [
      section.title,
      ...section.items.map((item) => `- ${item}`),
      "",
    ]),
    "Disclaimer",
    input.disclaimer,
  ];

  return lines.join("\n").trim() + "\n";
}
