/** @format */

import { ArrowRight, BookOpen, CalendarClock } from "lucide-react";

import SubjectDropdown from "./SubjectDropDown";

function SubjectCard({ subject, onEdit, onDelete, onStudy }) {
  const {
    name,
    description,
    color,
    createdAt,
    topicCount = 0,
    nextRevision = "--",
  } = subject;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
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
        style={{ backgroundColor: color }}
      />

      <div className="flex h-full flex-col p-6 pl-8">
        {/* ================= Header ================= */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${color}20`,
              }}
            >
              <BookOpen className="h-6 w-6" style={{ color }} />
            </div>

            <div className="min-w-0">
              <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
                {name}
              </h2>

              <p className="text-sm text-slate-500">Subject</p>
            </div>
          </div>

          <SubjectDropdown
            subject={subject}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

        {/* ================= Description ================= */}

        <div className="mt-5 min-h-[72px]">
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">
            {description || "No description added yet."}
          </p>
        </div>

        {/* Push everything below to bottom */}

        <div className="mt-auto">
          <div className="my-6 h-px bg-slate-200" />

          {/* ================= Stats ================= */}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Topics</span>

              <span className="font-semibold text-slate-900">{topicCount}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Next Revision</span>

              <span className="font-semibold text-slate-900">
                {nextRevision}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-500">
                <CalendarClock className="h-4 w-4" />
                Created
              </span>

              <span className="font-medium text-slate-700">
                {formattedDate}
              </span>
            </div>
          </div>

          <div className="my-6 h-px bg-slate-200" />

          {/* ================= Footer ================= */}

          <button
            type="button"
            onClick={() => onStudy?.(subject)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-white transition-all duration-300 hover:gap-3 hover:brightness-95"
            style={{
              backgroundColor: color,
            }}
          >
            Study Subject
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
