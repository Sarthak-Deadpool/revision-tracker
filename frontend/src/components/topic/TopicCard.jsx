/** @format */

import { ArrowRight, CalendarClock, Brain, RotateCcw } from "lucide-react";

import TopicDropdown from "./TopicDropDown";

function TopicCard({
  topic,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  onStudy,
}) {
  const {
    name,
    difficulty,
    masteryLevel,
    totalRevisions,
    lastRevisedAt,
    notes,
    subject,
    isArchived,
  } = topic;

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  const formattedLastRevision = lastRevisedAt
    ? new Date(lastRevisedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "--";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Left Accent */}
      <div
        className="absolute left-0 top-0 h-full w-2"
        style={{
          backgroundColor: subject?.color || "#6366F1",
        }}
      />

      <div className="flex h-full flex-col p-6 pl-8">
        {/* ================= Header ================= */}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
              {name}
            </h2>

            <p className="text-sm text-slate-500">
              {subject?.name || "Unknown Subject"}
            </p>
          </div>

          <TopicDropdown
            topic={topic}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
          />
        </div>

        {/* Difficulty */}

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              difficultyColor[difficulty]
            }`}
          >
            {difficulty}
          </span>

          {isArchived && (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Archived
            </span>
          )}
        </div>

        {/* Notes */}

        <div className="mt-5 min-h-[72px]">
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {notes || "No notes added yet."}
          </p>
        </div>

        <div className="mt-auto">
          <div className="my-6 h-px bg-slate-200" />

          {/* ================= Mastery ================= */}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Mastery</span>

              <span className="font-semibold text-slate-900">
                {masteryLevel}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{
                  width: `${masteryLevel}%`,
                }}
              />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          {/* ================= Stats ================= */}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <RotateCcw className="h-4 w-4" />
                Revisions
              </span>

              <span className="font-semibold text-slate-900">
                {totalRevisions}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <CalendarClock className="h-4 w-4" />
                Last Review
              </span>

              <span className="font-medium text-slate-700">
                {formattedLastRevision}
              </span>
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          {/* ================= Footer ================= */}

          {!isArchived && (
            <button
              type="button"
              onClick={() => onStudy?.(topic)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-white transition-all duration-300 hover:gap-3"
              style={{
                backgroundColor: subject?.color || "#6366F1",
              }}
            >
              <Brain className="h-4 w-4" />
              Study Topic
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicCard;
