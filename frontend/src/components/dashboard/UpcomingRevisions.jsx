/** @format */

import { CalendarClock } from "lucide-react";

function getRevisionLabel(date) {
  const today = new Date();
  const revisionDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  revisionDate.setHours(0, 0, 0, 0);

  const diff = (revisionDate - today) / (1000 * 60 * 60 * 24);

  if (diff === 1) return "Tomorrow";

  if (diff <= 7) return `In ${diff} days`;

  return revisionDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function UpcomingRevisions({ revisions }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-orange-500" />

        <div>
          <h2 className="text-xl font-bold">Upcoming Revisions</h2>

          <p className="text-sm text-slate-500">
            Your next scheduled revisions.
          </p>
        </div>
      </div>

      {revisions.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No upcoming revisions.
        </div>
      ) : (
        <div className="space-y-4">
          {revisions.map((revision) => (
            <div
              key={revision._id}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <div>
                <h3 className="font-semibold">{revision.topic.name}</h3>

                <p className="text-sm text-slate-500">
                  {revision.subject.name}
                </p>
              </div>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                {getRevisionLabel(revision.scheduledDate)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingRevisions;
