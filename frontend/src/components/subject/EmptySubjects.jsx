/** @format */

import { BookOpen, Plus } from "lucide-react";

function EmptySubjects({ onCreateSubject }) {
  return (
    <div
      className="
    flex
    min-h-[65vh]

    flex-col
    items-center
    justify-center

    rounded-2xl
    sm:rounded-3xl

    border
    border-dashed
    border-slate-300

    bg-white

    px-5
    py-14

    sm:px-8
    sm:py-20

    text-center
  "
    >
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-100">
        <BookOpen className="h-8 w-8 text-orange-500 sm:h-10 sm:w-10" />
      </div>
      <h2
        className="mt-6 text-xl
      sm:text-2xl font-semibold text-slate-900"
      >
        No Subjects Yet
      </h2>
      s
      <p className="mt-3 max-w-sm sm:max-w-md text-sm leading-6 text-slate-500 sm:text-base">
        Create your first subject to organize your revision journey and start
        tracking your learning progress.
      </p>
      <button
        onClick={onCreateSubject}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-600"
      >
        <Plus className="h-5 w-5" />
        Create Subject
      </button>
    </div>
  );
}

export default EmptySubjects;
