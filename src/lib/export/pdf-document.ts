import { jsPDF } from "jspdf";

export type PdfSection = {
  title: string;
  items: string[];
};

export type PdfDocumentInput = {
  fileName: string;
  title: string;
  summary: string;
  sections: PdfSection[];
  disclaimer: string;
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_X = 18;
const TOP_MARGIN = 18;
const BOTTOM_MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

export function createPdfDocument(input: PdfDocumentInput) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let y = TOP_MARGIN;

  const ensureSpace = (requiredHeight: number) => {
    if (y + requiredHeight > PAGE_HEIGHT - BOTTOM_MARGIN) {
      pdf.addPage();
      y = TOP_MARGIN;
    }
  };

  const addWrappedText = (
    text: string,
    fontSize: number,
    lineHeight: number,
    style: "normal" | "bold" = "normal",
  ) => {
    pdf.setFont("helvetica", style);
    pdf.setFontSize(fontSize);

    const lines = pdf.splitTextToSize(text, CONTENT_WIDTH);

    for (const line of lines) {
      ensureSpace(lineHeight);
      pdf.text(line, MARGIN_X, y);
      y += lineHeight;
    }
  };

  addWrappedText(input.title, 18, 8, "bold");
  y += 2;

  addWrappedText(input.summary, 11, 6);
  y += 4;

  for (const section of input.sections) {
    ensureSpace(12);
    addWrappedText(section.title, 13, 7, "bold");
    y += 1;

    for (const item of section.items) {
      const bulletText = `• ${item}`;
      addWrappedText(bulletText, 10, 5.5);
    }

    y += 3;
  }

  ensureSpace(18);
  addWrappedText("Disclaimer", 12, 7, "bold");
  addWrappedText(input.disclaimer, 9, 5);

  pdf.save(input.fileName);
}
