"use client";

import { createPdfDocument } from "@/lib/export/pdf-document";

type Section = {
  title: string;
  items: string[];
};

type ExportPdfButtonProps = {
  fileName: string;
  title: string;
  summary: string;
  sections: Section[];
  disclaimer: string;
};

export function ExportPdfButton({
  fileName,
  title,
  summary,
  sections,
  disclaimer,
}: ExportPdfButtonProps) {
  function handleExport() {
    createPdfDocument({
      fileName,
      title,
      summary,
      sections,
      disclaimer,
    });
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-100 transition hover:bg-orange-500/20"
    >
      Export as PDF
    </button>
  );
}
