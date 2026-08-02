/** @format */

import { CheckCircle2, History, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ratingColor = {
  Again: "bg-red-100 text-red-700",
  Good: "bg-amber-100 text-amber-700",
  Easy: "bg-emerald-100 text-emerald-700",
};

function getRelativeDate(date) {
  const today = new Date();
  const completed = new Date(date);

  today.setHours(0, 0, 0, 0);
  completed.setHours(0, 0, 0, 0);

  const diff =
    Math.floor((today - completed) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";

  if (diff === 1) return "Yesterday";

  if (diff < 7) return `${diff} days ago`;

  return completed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function RecentHistory({ revisions }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-100 p-2">
            <History className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Recent Revision History
            </h2>

            <p className="text-sm text-slate-500">
              Your latest completed revision sessions.
            </p>
          </div>
        </div>

        
      </div>

      {/* Empty */}

      {revisions.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 py-12 text-center">
          <History className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-3 text-slate-500">
            No completed revisions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {revisions.map((revision) => (
            <div
              key={revision._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {revision.topic.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {revision.subject.name}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    ratingColor[revision.rating]
                  }`}
                >
                  {revision.rating}
                </span>

                <span className="text-sm text-slate-500">
                  {getRelativeDate(revision.completedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentHistory;