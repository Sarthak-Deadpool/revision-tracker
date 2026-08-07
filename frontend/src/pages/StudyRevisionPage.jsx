/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain } from "lucide-react";
import { toast } from "sonner";

import GradientButton from "@/components/reusable-componets/GradientButton";

import { getRevisionById } from "@/api/revisionApi";
import { completeRevision } from "@/api/revisionApi";

import StudyRevisionSkeleton from "@/components/revision/StudyRevisionSkeleton";

function StudyRevisionPage() {
  const navigate = useNavigate();
  const { revisionId } = useParams();

  const [revision, setRevision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completeLoading, setCompleteLoading] = useState(false);

  useEffect(() => {
    fetchRevision();
  }, [revisionId]);

  async function fetchRevision() {
    try {
      setLoading(true);

      const response = await getRevisionById(revisionId);

      setRevision(response.revision);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load revision.");

      navigate(-1);
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(rating) {
    try {
      setCompleteLoading(true);

      await completeRevision(revisionId, rating);

      toast.success("Revision completed successfully.");

      navigate("/dashboard/revisions");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to complete revision.",
      );
    } finally {
      setCompleteLoading(false);
    }
  }

  if (loading) {
    return <StudyRevisionSkeleton />;
  }

  if (!revision) return null;

  const { topic, subject } = revision;

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}

      <div>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 rounded-4xl p-2 text-sm font-medium transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-7 w-7 " />
        </button>
      </div>

      {/* ================= Hero ================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <h3 className=" font-bold text-slate-700 mb-1 ">
              Revision
            </h3>
            <h2 className="truncate text-3xl font-bold text-slate-900">
              {topic.name}
            </h2>

            <p className="mt-2 text-lg text-slate-500">{subject.name}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                difficultyColor[topic.difficulty]
              }`}
            >
              {topic.difficulty}
            </span>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              Revision #{revision.revisionNumber}
            </span>
          </div>
        </div>
      </div>

      {/* ================= Workspace ================= */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ================= Notes ================= */}

        <section>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm h-full">
            {/* Header */}

            <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-indigo-600" />

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Revision Notes
                  </h2>

                  <p className="text-sm text-slate-500">
                    Read everything once before rating yourself.
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}

            <div
              className="
              overflow-y-auto

              bg-white

              p-8

              whitespace-pre-wrap
              break-words

              text-[17px]
              leading-9
              text-slate-700

              min-h-[55vh]

              md:min-h-[65vh]

              xl:h-full
            
            "
            >
              {topic.notes || (
                <div className="flex h-full items-center justify-center text-slate-400">
                  No notes available.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= Right Sidebar ================= */}

        <aside className="h-fit xl:sticky xl:top-24">
          <div className="space-y-6">
            {/* ================= Rating ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Rate Yourself
              </h3>

              <p className="mb-6 text-sm leading-6 text-slate-500">
                Choose the option that best describes your recall.
              </p>

              <div className="space-y-4">
                {/* Again */}

                <button
                  disabled={completeLoading}
                  onClick={() => handleComplete("Again")}
                  className="
                  group
                  w-full
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                  text-left
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-red-300
                  hover:bg-red-100
                "
                >
                  <div className="text-lg font-semibold text-red-700">
                    🔴 Again
                  </div>

                  <p className="mt-1 text-sm text-red-600">
                    Forgot most of the topic
                  </p>
                </button>

                {/* Good */}

                <button
                  disabled={completeLoading}
                  onClick={() => handleComplete("Good")}
                  className="
                  group
                  w-full
                  rounded-2xl
                  border
                  border-amber-200
                  bg-amber-50
                  p-4
                  text-left
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-amber-300
                  hover:bg-amber-100
                "
                >
                  <div className="text-lg font-semibold text-amber-700">
                    🟡 Good
                  </div>

                  <p className="mt-1 text-sm text-amber-600">
                    Remembered with some effort
                  </p>
                </button>

                {/* Easy */}

                <button
                  disabled={completeLoading}
                  onClick={() => handleComplete("Easy")}
                  className="
                  group
                  w-full
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-4
                  text-left
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-emerald-300
                  hover:bg-emerald-100
                "
                >
                  <div className="text-lg font-semibold text-emerald-700">
                    🟢 Easy
                  </div>

                  <p className="mt-1 text-sm text-emerald-600">
                    Instantly remembered everything
                  </p>
                </button>
              </div>

              {/* Info */}

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <h4 className="mb-2 font-semibold text-slate-900">
                  Smart Scheduling
                </h4>

                <p className="text-sm leading-6 text-slate-600">
                  Your rating automatically decides when this topic will appear
                  again. Lower ratings schedule an earlier revision, while
                  higher ratings increase the interval to strengthen long-term
                  memory.
                </p>
              </div>
            </div>
            {/* ================= Topic Details ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Topic Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subject</span>

                  <span className="font-semibold text-slate-900">
                    {subject.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Difficulty</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      difficultyColor[topic.difficulty]
                    }`}
                  >
                    {topic.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Revision</span>

                  <span className="font-semibold text-slate-900">
                    #{revision.revisionNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* ================= Study Tips ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Study Tips
              </h3>

              <ul className="space-y-4 text-sm  leading-6 text-slate-600">
                <li>Read every note once before rating.</li>

                <li>Try recalling concepts without looking.</li>

                <li>Rate yourself honestly.</li>

                <li>Consistency beats long study sessions.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default StudyRevisionPage;
