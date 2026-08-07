/** @format */

import { ArrowRight, Brain, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RevisionCard({ revision, onStudy }) {
  const { topic, subject, revisionNumber, scheduledDate } = revision;
  const navigate = useNavigate();

  const formattedDate = new Date(scheduledDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Accent */}

      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{
          backgroundColor: subject?.color || "#6366F1",
        }}
      />

      <div className="flex h-full flex-col p-5 pl-7">
        {/* ================= Header ================= */}

        <div>
          <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
            {topic?.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{subject?.name}</p>
        </div>

        {/* ================= Badges ================= */}

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              difficultyColor[topic?.difficulty]
            }`}
          >
            {topic?.difficulty}
          </span>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Revision #{revisionNumber}
          </span>
        </div>

        {/* Divider */}

        <div className="my-5 border-t border-slate-200" />

        {/* Scheduled */}

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <CalendarClock className="h-4 w-4" />
            Scheduled
          </span>

          <span className="font-medium text-slate-700">{formattedDate}</span>
        </div>

        {/* Push Button Down */}

        <div className="mt-auto">
          <div className="my-5 border-t border-slate-200" />

          <button
            type="button"
            onClick={() => navigate(`/dashboard/revisions/${revision._id}`)}
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:brightness-95
            "
            style={{
              backgroundColor: subject?.color || "#6366F1",
            }}
          >
            <Brain className="h-4 w-4" />
            Start Revision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RevisionCard;
