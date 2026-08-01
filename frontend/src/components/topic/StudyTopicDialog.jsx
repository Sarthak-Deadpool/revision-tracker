/** @format */

import { useEffect, useState } from "react";
import { BookOpen, CalendarClock, RotateCcw, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { getNextRevision } from "@/api/revisionApi";

import TopicInfoRow from "./TopicInfoRow";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getNextRevisionText = (date) => {
  if (!date) return "No upcoming revision";

  const today = new Date();
  const revisionDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  revisionDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round((revisionDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "🟠 Due Today";
  if (diffDays === 1) return "🟢 Tomorrow";
  if (diffDays > 1) return `🟢 In ${diffDays} days`;

  return `🔴 Overdue by ${Math.abs(diffDays)} day${
    Math.abs(diffDays) > 1 ? "s" : ""
  }`;
};

function StudyTopicDialog({ open, onOpenChange, topic }) {
  const [nextRevision, setNextRevision] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !topic) return;

    fetchNextRevision();
  }, [open, topic]);

  async function fetchNextRevision() {
    try {
      setLoading(true);

      const response = await getNextRevision(topic._id);

      setNextRevision(response.nextRevision);
    } catch (error) {
      console.error(error);

      setNextRevision(null);

      if (error?.response?.status !== 404) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch next revision.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (!topic) return null;

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  const lastRevision = topic.lastRevisedAt
    ? new Date(topic.lastRevisedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "--";

  const nextRevisionDate = nextRevision?.scheduledDate
    ? new Date(nextRevision.scheduledDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No upcoming revision";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent className="w-[80vw] max-w-7xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">{topic.name}</DialogTitle>

          <DialogDescription>
            Read your notes before your next revision.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ================= LEFT PANEL ================= */}

          <div className="space-y-5">
            {/* Subject */}

            <div className="rounded-2xl border bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Subject</p>

              <h3 className="mt-2 text-xl font-semibold">
                {topic.subject?.name}
              </h3>

              <span
                className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  difficultyColor[topic.difficulty]
                }`}
              >
                {topic.difficulty}
              </span>
            </div>

            {/* Mastery */}

            <div className="rounded-2xl border bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-slate-600">Mastery</span>

                <span className="font-bold">{topic.masteryLevel}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${topic.masteryLevel}%`,
                  }}
                />
              </div>
            </div>

            {/* Stats */}

            <div className="rounded-2xl border bg-white">
              <TopicInfoRow
                label="Total Revisions"
                value={topic.totalRevisions}
              />

              <TopicInfoRow label="Last Revision" value={lastRevision} />

              <TopicInfoRow
                label="Next Revision"
                value={
                  loading
                    ? "Loading..."
                    : getNextRevisionText(nextRevision?.scheduledDate)
                }
              />
            </div>
          </div>

          {/* ================= NOTES ================= */}

          <div className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl border">
              <div className="flex items-center gap-2 border-b p-5">
                <BookOpen className="h-5 w-5 text-indigo-600" />

                <h3 className="text-lg font-semibold">Notes</h3>
              </div>

              <div className="h-[60vh] overflow-y-auto bg-slate-50 p-6">
                <div className="whitespace-pre-wrap text-base leading-8 text-slate-700">
                  {topic.notes || "No notes available."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudyTopicDialog;
