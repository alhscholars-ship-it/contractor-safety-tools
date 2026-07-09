"use client";

import { createPlainTextDocument } from "@/lib/export/plain-text-document";

type Section = {
  title: string;
  items: string[];
};

type ExportTextButtonProps = {
  fileName: string;
  title: string;
  summary: string;
  sections: Section[];
  disclaimer: string;
};

export function ExportTextButton({
  fileName,
  title,
  summary,
  sections,
  disclaimer,
}: ExportTextButtonProps) {
  function handleExport() {
    const text = createPlainTextDocument({
      title,
      summary,
      sections,
      disclaimer,
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-500"
    >
      Export as TXT
    </button>
  );
}
