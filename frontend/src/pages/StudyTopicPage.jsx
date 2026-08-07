/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";

import { getTopicById } from "@/api/topicApi";
import { getNextRevision } from "@/api/revisionApi";

import TopicInfoRow from "@/components/topic/TopicInfoRow";
import StudyTopicSkeleton from "@/components/topic/StudyTopicSkeleton";

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

function StudyTopicPage() {
  const navigate = useNavigate();
  const { topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextRevision, setNextRevision] = useState(null);

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  async function fetchTopic() {
    try {
      setLoading(true);

      const response = await getTopicById(topicId);

      setTopic(response.topic);

      fetchNextRevision(topicId);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load topic.");

      navigate(-1);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextRevision(id) {
    try {
      const response = await getNextRevision(id);

      setNextRevision(response.nextRevision);
    } catch {
      setNextRevision(null);
    }
  }

  if (loading) {
    return <StudyTopicSkeleton />;
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

  return (
    <div className="min-h-screen">
      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 rounded-4xl p-2 text-sm font-medium transition hover:bg-slate-50"
      >
        <ArrowLeft className="h-7 w-7 " />
      </button>

      {/* Layout */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-5">
          {/*Topic*/}
          <div className="rounded-3xl border bg-slate-50 p-6">
            <h2 className="text-3xl font-bold text-slate-900">{topic.name}</h2>

            <p className="mt-2 text-slate-500">
              Read your notes before your next revision.
            </p>
          </div>
          {/* Subject */}

          <div className="rounded-3xl border bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Subject</p>

            <h2 className="mt-2 text-2xl font-bold">{topic.subject?.name}</h2>

            <span
              className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${difficultyColor[topic.difficulty]}`}
            >
              {topic.difficulty}
            </span>
          </div>

          {/* Mastery */}

          <div className="rounded-3xl border bg-white p-6">
            <div className="mb-3 flex justify-between">
              <span className="font-medium text-slate-600">Mastery</span>

              <span className="font-bold">{topic.masteryLevel}%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{
                  width: `${topic.masteryLevel}%`,
                }}
              />
            </div>
          </div>

          {/* Stats */}

          <div className="rounded-3xl border bg-white">
            <TopicInfoRow
              label="Total Revisions"
              value={topic.totalRevisions}
            />

            <TopicInfoRow label="Last Revision" value={lastRevision} />

            <TopicInfoRow
              label="Next Revision"
              value={getNextRevisionText(nextRevision?.scheduledDate)}
            />
          </div>
        </div>
        {/* RIGHT */}

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            {/* Header */}

            <div className="flex items-center gap-3 border-b px-6 py-5">
              <BookOpen className="h-5 w-5 text-indigo-600" />

              <h2 className="text-lg font-semibold text-slate-900">
                Revision Notes
              </h2>
            </div>

            {/* Notes */}

            <div
              className="
                whitespace-pre-wrap
                wrap-break-words

                bg-slate-50

                p-6

                leading-8
                text-slate-700

                min-h-87.5

                lg:min-h-150
              "
            >
              {topic.notes || (
                <div className="flex h-full items-center justify-center text-slate-400">
                  No notes available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyTopicPage;
