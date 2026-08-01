/** @format */

import { Brain, BookOpen, Tag } from "lucide-react";

import GradientButton from "../reusable-componets/GradientButton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function StudyRevisionDialog({
  open,
  onOpenChange,
  revision,
  loading,
  onComplete,
}) {
  if (!revision) return null;

  const { topic, subject } = revision;

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    // <Dialog
    //   open={open}
    //   onOpenChange={onOpenChange}
    //   disablePointerDismissal
    // >
    //   <DialogContent className="sm:max-w-2xl">
    //     <DialogHeader>
    //       <DialogTitle className="text-xl">
    //         Study Revision
    //       </DialogTitle>

    //       <DialogDescription>
    //         Read the topic carefully and rate how well you remembered it.
    //       </DialogDescription>
    //     </DialogHeader>

    //     {/* Topic */}

    //     <div className="space-y-6">
    //       <div className="rounded-2xl border bg-slate-50 p-5">
    //         <h2 className="text-2xl font-bold text-slate-900">
    //           {topic.name}
    //         </h2>

    //         <p className="mt-1 text-slate-500">
    //           {subject.name}
    //         </p>

    //         <div className="mt-4 flex items-center gap-2">
    //           <span
    //             className={`rounded-full px-3 py-1 text-xs font-semibold ${
    //               difficultyColor[topic.difficulty]
    //             }`}
    //           >
    //             {topic.difficulty}
    //           </span>

    //           <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
    //             Revision #{revision.revisionNumber}
    //           </span>
    //         </div>
    //       </div>

    //       {/* Notes */}

    //       <div className="rounded-2xl border p-5">
    //         <div className="mb-3 flex items-center gap-2">
    //           <BookOpen className="h-5 w-5 text-indigo-600" />

    //           <h3 className="font-semibold">
    //             Notes
    //           </h3>
    //         </div>

    //         <div className="max-h-64 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-600">
    //           {topic.notes || "No notes available."}
    //         </div>
    //       </div>

    //       {/* Rating */}

    //       <div>
    //         <div className="mb-4 flex items-center gap-2">
    //           <Brain className="h-5 w-5 text-indigo-600" />

    //           <h3 className="font-semibold">
    //             How well did you remember this topic?
    //           </h3>
    //         </div>

    //         <div className="grid grid-cols-3 gap-4">
    //           <GradientButton
    //             disabled={loading}
    //             onClick={() => onComplete("Again")}
    //             className="bg-red-500 hover:bg-red-600"
    //           >
    //             Again
    //           </GradientButton>

    //           <GradientButton
    //             disabled={loading}
    //             onClick={() => onComplete("Good")}
    //             className="bg-amber-500 hover:bg-amber-600"
    //           >
    //             Good
    //           </GradientButton>

    //           <GradientButton
    //             disabled={loading}
    //             onClick={() => onComplete("Easy")}
    //             className="bg-emerald-500 hover:bg-emerald-600"
    //           >
    //             Easy
    //           </GradientButton>
    //         </div>

    //         <p className="mt-4 text-center text-sm text-slate-500">
    //           Choose the option that best reflects how easily you recalled the topic.
    //         </p>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>

    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent className="w-[90vw] max-w-[1600px]">
        {/* Header */}

        <DialogHeader className="border-b pb-5">
          <DialogTitle className="text-2xl font-bold">
            Study Revision
          </DialogTitle>

          <DialogDescription>
            Read the topic carefully and rate how well you remembered it.
          </DialogDescription>
        </DialogHeader>

        {/* Workspace */}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_260px]">
          {/* ========================================= */}
          {/* Left Panel */}
          {/* ========================================= */}

          <aside className="space-y-5 mt-2">
            <div className="rounded-2xl border bg-slate-50 p-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {topic.name}
              </h2>

              <p className="mt-2 text-slate-500">{subject.name}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    difficultyColor[topic.difficulty]
                  }`}
                >
                  {topic.difficulty}
                </span>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  Revision #{revision.revisionNumber}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />

                <h3 className="font-semibold">Study Tips</h3>
              </div>

              <ul className="space-y-3 text-sm leading-6 text-slate-600">
                <li>• Read every note once.</li>

                <li>• Recall before scrolling.</li>

                <li>• Rate honestly.</li>

                <li>• Don't guess.</li>
              </ul>
            </div>
          </aside>

          {/* ========================================= */}
          {/* Center Panel */}
          {/* ========================================= */}

          <section className="mt-2">
            <div className="overflow-hidden rounded-2xl border">
              <div className="flex items-center gap-2 border-b bg-slate-50 px-6 py-5">
                <BookOpen className="h-5 w-5 text-indigo-600" />

                <h3 className="text-lg font-semibold">Revision Notes</h3>
              </div>

              <div className="h-[60vh] overflow-y-auto p-8">
                <div className="whitespace-pre-wrap text-[16px] leading-8 text-slate-700">
                  {topic.notes || "No notes available."}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================= */}
          {/* Right Panel */}
          {/* ========================================= */}

          <aside className="sticky top-0 mt-2">
            <div className="rounded-2xl border bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-600" />

                <h3 className="text-lg font-semibold">Rate Yourself</h3>
              </div>

              <p className="mb-6 text-sm leading-6 text-slate-500">
                Choose the option that best reflects how easily you recalled the
                topic.
              </p>

              <div className="space-y-4">
                <GradientButton
                  disabled={loading}
                  onClick={() => onComplete("Again")}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  Forgot it
                </GradientButton>

                <GradientButton
                  disabled={loading}
                  onClick={() => onComplete("Good")}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  Faded
                </GradientButton>

                <GradientButton
                  disabled={loading}
                  onClick={() => onComplete("Easy")}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                >
                  Remembered
                </GradientButton>
              </div>

              <div className="mt-8 rounded-xl bg-slate-50 p-4">
                <p className="text-xs leading-6 text-slate-500">
                  Higher ratings schedule the next revision farther in the
                  future, while lower ratings bring it back sooner for
                  reinforcement.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudyRevisionDialog;
