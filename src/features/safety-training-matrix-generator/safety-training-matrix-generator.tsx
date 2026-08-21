"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateSafetyTrainingMatrix,
  type SafetyTrainingMatrixResult,
} from "./generate-safety-training-matrix";

type TrainingAssignmentForm = {
  id: number;
  workerGroup: string;
  trainingTopic: string;
  hazardOrTask: string;
  trainingTiming: string;
  trainerQualification: string;
  verificationMethod: string;
  recordOwner: string;
};

type AssignmentField =
  | "workerGroup"
  | "trainingTopic"
  | "hazardOrTask"
  | "trainingTiming"
  | "trainerQualification"
  | "verificationMethod"
  | "recordOwner";

const DEFAULT_ASSIGNMENTS: TrainingAssignmentForm[] = [
  {
    id: 1,
    workerGroup:
      "Employees exposed to fall hazards",
    trainingTopic:
      "Fall hazard recognition and controls",
    hazardOrTask:
      "Work where employees may be exposed to fall hazards",
    trainingTiming:
      "Before initial exposure and when retraining is required by the applicable standard or conditions",
    trainerQualification:
      "Person qualified under the applicable training requirement",
    verificationMethod:
      "Knowledge questions, practical demonstration, and supervisor observation",
    recordOwner:
      "Project safety manager",
  },
  {
    id: 2,
    workerGroup:
      "Employees using ladders and stairways",
    trainingTopic:
      "Ladder and stairway hazard recognition",
    hazardOrTask:
      "Selection, placement, use, inspection, and care of ladders and stairways",
    trainingTiming:
      "Before assigned use as necessary and when knowledge or understanding is no longer maintained",
    trainerQualification:
      "Competent person",
    verificationMethod:
      "Practical demonstration and knowledge questions",
    recordOwner:
      "Site superintendent",
  },
];

const DEFAULT_CONTACTS = [
  "Safety manager",
  "Project superintendent",
].join("\n");

const DEFAULT_CHANGE_TRIGGERS = [
  "A worker receives a new task or role",
  "Facilities, equipment, materials, processes, or controls change",
  "A new hazard is identified",
  "Observation indicates that knowledge or practical skill is not maintained",
  "An incident, near miss, audit, or corrective action indicates a training gap",
].join("\n");

const DEFAULT_DOCUMENTATION_FIELDS = [
  "Worker name or identifier",
  "Worker group or assigned role",
  "Training topic and hazard or task basis",
  "Training date and duration",
  "Trainer name and qualification basis",
  "Knowledge or practical verification evidence",
  "Corrective follow-up or retraining decision",
  "Record owner and retention location",
].join("\n");

function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function createDefaultAssignments():
  TrainingAssignmentForm[] {
  return DEFAULT_ASSIGNMENTS.map(
    (assignment) => ({
      ...assignment,
    }),
  );
}

export function SafetyTrainingMatrixGenerator() {
  const [companyName, setCompanyName] =
    useState("ABC Contractors");

  const [projectName, setProjectName] =
    useState("Central Plant Expansion");

  const [preparedBy, setPreparedBy] =
    useState("Safety Manager");

  const [reviewDate, setReviewDate] =
    useState("");

  const [
    programContacts,
    setProgramContacts,
  ] = useState(DEFAULT_CONTACTS);

  const [
    assignments,
    setAssignments,
  ] = useState<TrainingAssignmentForm[]>(
    createDefaultAssignments,
  );

  const [
    changeTriggers,
    setChangeTriggers,
  ] = useState(DEFAULT_CHANGE_TRIGGERS);

  const [
    documentationFields,
    setDocumentationFields,
  ] = useState(
    DEFAULT_DOCUMENTATION_FIELDS,
  );

  const [result, setResult] =
    useState<SafetyTrainingMatrixResult | null>(
      null,
    );

  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return result.sections.map(
      (section) => ({
        title: section.title,
        items: [...section.items],
      }),
    );
  }, [result]);

  function updateAssignment(
    id: number,
    field: AssignmentField,
    value: string,
  ) {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              [field]: value,
            }
          : assignment,
      ),
    );
  }

  function addAssignment() {
    setAssignments((current) => {
      const nextId =
        Math.max(
          0,
          ...current.map(
            (assignment) =>
              assignment.id,
          ),
        ) + 1;

      return [
        ...current,
        {
          id: nextId,
          workerGroup: "",
          trainingTopic: "",
          hazardOrTask: "",
          trainingTiming: "",
          trainerQualification: "",
          verificationMethod: "",
          recordOwner: "",
        },
      ];
    });
  }

  function removeAssignment(id: number) {
    setAssignments((current) =>
      current.length > 1
        ? current.filter(
            (assignment) =>
              assignment.id !== id,
          )
        : current,
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const generatedResult =
        generateSafetyTrainingMatrix({
          companyName,
          projectName,
          preparedBy,
          reviewDate,
          programContacts:
            splitLines(programContacts),
          trainingAssignments:
            assignments.map(
              (assignment) => ({
                workerGroup:
                  assignment.workerGroup,
                trainingTopic:
                  assignment.trainingTopic,
                hazardOrTask:
                  assignment.hazardOrTask,
                trainingTiming:
                  assignment.trainingTiming,
                trainerQualification:
                  assignment
                    .trainerQualification,
                verificationMethod:
                  assignment
                    .verificationMethod,
                recordOwner:
                  assignment.recordOwner,
              }),
            ),
          changeTriggers:
            splitLines(changeTriggers),
          documentationFields:
            splitLines(
              documentationFields,
            ),
        });

      setResult(generatedResult);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the safety training matrix.",
      );
    }
  }

  function handleReset() {
    setCompanyName("ABC Contractors");
    setProjectName(
      "Central Plant Expansion",
    );
    setPreparedBy("Safety Manager");
    setReviewDate("");
    setProgramContacts(DEFAULT_CONTACTS);
    setAssignments(
      createDefaultAssignments(),
    );
    setChangeTriggers(
      DEFAULT_CHANGE_TRIGGERS,
    );
    setDocumentationFields(
      DEFAULT_DOCUMENTATION_FIELDS,
    );
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
      >
        <h2 className="text-2xl font-display font-black">
          Define the training program
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-steel-200">
          Connect each worker group with the
          applicable task or hazard, training
          timing, trainer qualification,
          verification method, and responsible
          record owner.
        </p>

        <fieldset className="mt-8 grid gap-5 rounded-3xl border border-white/10 p-5 sm:grid-cols-2">
          <legend className="px-2 text-lg font-display font-black text-orange-500">
            Program information
          </legend>

          <label
            htmlFor="training-company-name"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Company name
            </span>

            <input
              id="training-company-name"
              type="text"
              required
              value={companyName}
              onChange={(event) =>
                setCompanyName(
                  event.target.value,
                )
              }
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />
          </label>

          <label
            htmlFor="training-project-name"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Project or operation
            </span>

            <input
              id="training-project-name"
              type="text"
              required
              value={projectName}
              onChange={(event) =>
                setProjectName(
                  event.target.value,
                )
              }
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />
          </label>

          <label
            htmlFor="training-prepared-by"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Prepared by
            </span>

            <input
              id="training-prepared-by"
              type="text"
              required
              value={preparedBy}
              onChange={(event) =>
                setPreparedBy(
                  event.target.value,
                )
              }
              aria-describedby="training-prepared-by-help"
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="training-prepared-by-help"
              className="text-xs leading-5 text-steel-400"
            >
              Enter the responsible person or
              role. This field does not certify
              their qualifications.
            </span>
          </label>

          <label
            htmlFor="training-review-date"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Matrix review date
            </span>

            <input
              id="training-review-date"
              type="date"
              required
              value={reviewDate}
              onChange={(event) =>
                setReviewDate(
                  event.target.value,
                )
              }
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />
          </label>

          <label
            htmlFor="training-program-contacts"
            className="grid gap-2 sm:col-span-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Training program contacts
            </span>

            <textarea
              id="training-program-contacts"
              required
              rows={4}
              value={programContacts}
              onChange={(event) =>
                setProgramContacts(
                  event.target.value,
                )
              }
              aria-describedby="training-program-contacts-help"
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="training-program-contacts-help"
              className="text-xs leading-5 text-steel-400"
            >
              Enter one contact or responsible
              resource per line.
            </span>
          </label>
        </fieldset>

        <section
          aria-labelledby="training-assignments-heading"
          className="mt-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3
                id="training-assignments-heading"
                className="text-xl font-display font-black"
              >
                Training assignments
              </h3>

              <p className="mt-2 text-sm leading-6 text-steel-400">
                Verify every row against the
                requirement and workplace
                conditions that actually apply.
              </p>
            </div>

            <button
              type="button"
              onClick={addAssignment}
              className="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-sm font-display font-black text-orange-100 transition hover:bg-orange-500/20"
            >
              Add training assignment
            </button>
          </div>

          <div className="mt-6 grid gap-6">
            {assignments.map(
              (assignment, index) => (
                <fieldset
                  key={assignment.id}
                  className="grid gap-5 rounded-3xl border border-white/10 bg-navy-950/40 p-5 sm:grid-cols-2"
                >
                  <legend className="px-2 text-base font-display font-black text-orange-500">
                    Assignment {index + 1}
                  </legend>

                  <label
                    htmlFor={`training-worker-group-${assignment.id}`}
                    className="grid gap-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Worker group or role
                    </span>

                    <input
                      id={`training-worker-group-${assignment.id}`}
                      type="text"
                      required
                      value={
                        assignment.workerGroup
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "workerGroup",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <label
                    htmlFor={`training-topic-${assignment.id}`}
                    className="grid gap-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Training topic
                    </span>

                    <input
                      id={`training-topic-${assignment.id}`}
                      type="text"
                      required
                      value={
                        assignment.trainingTopic
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "trainingTopic",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <label
                    htmlFor={`training-hazard-task-${assignment.id}`}
                    className="grid gap-2 sm:col-span-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Hazard or task basis
                    </span>

                    <textarea
                      id={`training-hazard-task-${assignment.id}`}
                      required
                      rows={3}
                      value={
                        assignment.hazardOrTask
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "hazardOrTask",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <label
                    htmlFor={`training-timing-${assignment.id}`}
                    className="grid gap-2 sm:col-span-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Training timing or review
                      trigger
                    </span>

                    <textarea
                      id={`training-timing-${assignment.id}`}
                      required
                      rows={3}
                      value={
                        assignment.trainingTiming
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "trainingTiming",
                          event.target.value,
                        )
                      }
                      aria-describedby={`training-timing-help-${assignment.id}`}
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />

                    <span
                      id={`training-timing-help-${assignment.id}`}
                      className="text-xs leading-5 text-steel-400"
                    >
                      Verify timing against the
                      applicable requirement. Do
                      not invent an annual
                      interval.
                    </span>
                  </label>

                  <label
                    htmlFor={`training-trainer-${assignment.id}`}
                    className="grid gap-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Trainer qualification
                    </span>

                    <input
                      id={`training-trainer-${assignment.id}`}
                      type="text"
                      required
                      value={
                        assignment
                          .trainerQualification
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "trainerQualification",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <label
                    htmlFor={`training-record-owner-${assignment.id}`}
                    className="grid gap-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Record owner
                    </span>

                    <input
                      id={`training-record-owner-${assignment.id}`}
                      type="text"
                      required
                      value={
                        assignment.recordOwner
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "recordOwner",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <label
                    htmlFor={`training-verification-${assignment.id}`}
                    className="grid gap-2 sm:col-span-2"
                  >
                    <span className="text-sm font-bold text-slate-200">
                      Knowledge or skill
                      verification method
                    </span>

                    <textarea
                      id={`training-verification-${assignment.id}`}
                      required
                      rows={3}
                      value={
                        assignment
                          .verificationMethod
                      }
                      onChange={(event) =>
                        updateAssignment(
                          assignment.id,
                          "verificationMethod",
                          event.target.value,
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
                    />
                  </label>

                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      disabled={
                        assignments.length === 1
                      }
                      onClick={() =>
                        removeAssignment(
                          assignment.id,
                        )
                      }
                      className="rounded-full border border-red-300/30 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-300/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove assignment
                    </button>
                  </div>
                </fieldset>
              ),
            )}
          </div>
        </section>

        <fieldset className="mt-8 grid gap-6 rounded-3xl border border-white/10 p-5 lg:grid-cols-2">
          <legend className="px-2 text-lg font-display font-black text-orange-500">
            Review and documentation
          </legend>

          <label
            htmlFor="training-change-triggers"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Change and retraining review
              triggers
            </span>

            <textarea
              id="training-change-triggers"
              required
              rows={10}
              value={changeTriggers}
              onChange={(event) =>
                setChangeTriggers(
                  event.target.value,
                )
              }
              aria-describedby="training-change-triggers-help"
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="training-change-triggers-help"
              className="text-xs leading-5 text-steel-400"
            >
              Enter one review condition per
              line. These are not automatic
              findings of noncompliance.
            </span>
          </label>

          <label
            htmlFor="training-documentation-fields"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Documentation fields
            </span>

            <textarea
              id="training-documentation-fields"
              required
              rows={10}
              value={documentationFields}
              onChange={(event) =>
                setDocumentationFields(
                  event.target.value,
                )
              }
              aria-describedby="training-documentation-fields-help"
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="training-documentation-fields-help"
              className="text-xs leading-5 text-steel-400"
            >
              Enter one record field per line.
              Verify retention requirements
              separately.
            </span>
          </label>
        </fieldset>

        <article className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
          <h3 className="font-display font-black text-orange-100">
            Do not treat this as a universal
            compliance list
          </h3>

          <p className="mt-2 text-sm leading-7 text-orange-100/90">
            Requirements differ by standard,
            jurisdiction, industry, role,
            equipment, substance, task, and
            workplace hazard. Verify every
            assignment before use.
          </p>
        </article>

        {error ? (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-orange-600 px-6 py-3 text-sm font-display font-black text-slate-950 transition hover:bg-orange-500"
          >
            Generate Training Matrix
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-display font-black text-white transition hover:bg-white/10"
          >
            Reset Example
          </button>
        </div>
      </form>

      <section
        aria-labelledby="training-matrix-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
      >
        <h2
          id="training-matrix-result-heading"
          className="text-2xl font-display font-black"
        >
          Generated safety training matrix
        </h2>

        {result ? (
          <div className="mt-6 space-y-7">
            <article className="rounded-3xl border border-orange-500/25 bg-navy-800 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                Planning document
              </p>

              <h3 className="mt-3 text-3xl font-display font-black text-white">
                {result.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-steel-200">
                {result.summary}
              </p>
            </article>

            <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Generated worker training
                  assignments
                </caption>

                <thead className="bg-slate-900">
                  <tr>
                    {[
                      "#",
                      "Worker group",
                      "Topic",
                      "Hazard or task",
                      "Timing or trigger",
                      "Trainer qualification",
                      "Verification",
                      "Record owner",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b border-white/10 px-4 py-4 font-display font-black text-orange-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {result.matrixRows.map(
                    (row) => (
                      <tr
                        key={row.rowNumber}
                        className="align-top"
                      >
                        <th
                          scope="row"
                          className="border-b border-white/10 px-4 py-4 font-display font-black text-white"
                        >
                          {row.rowNumber}
                        </th>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {row.workerGroup}
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {row.trainingTopic}
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {row.hazardOrTask}
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {row.trainingTiming}
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {
                            row.trainerQualification
                          }
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {
                            row.verificationMethod
                          }
                        </td>

                        <td className="border-b border-white/10 px-4 py-4 text-steel-200">
                          {row.recordOwner}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {result.sections
                .filter(
                  (section) =>
                    section.title !==
                    "Training Assignment Matrix",
                )
                .map((section) => (
                  <article
                    key={section.title}
                    className="rounded-3xl border border-white/10 bg-navy-950/50 p-6"
                  >
                    <h3 className="text-lg font-display font-black text-white">
                      {section.title}
                    </h3>

                    <ul className="mt-4 grid gap-3 text-sm leading-7 text-steel-200">
                      {section.items.map(
                        (item) => (
                          <li
                            key={item}
                            className="flex gap-3"
                          >
                            <span
                              aria-hidden="true"
                              className="text-orange-500"
                            >
                              •
                            </span>

                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </article>
                ))}
            </div>

            <article className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">
              <h3 className="font-display font-black text-orange-100">
                Professional limitation
              </h3>

              <p className="mt-3 text-xs leading-6 text-orange-100/90">
                {result.disclaimer}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="safety-training-matrix.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={
                    result.disclaimer
                  }
                />

                <ExportPdfButton
                  fileName="safety-training-matrix.pdf"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={
                    result.disclaimer
                  }
                />
              </div>
            </article>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-steel-200">
            Complete the program information and
            training assignments to generate a
            structured matrix for review and
            documentation.
          </p>
        )}
      </section>
    </div>
  );
}
