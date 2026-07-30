/** @format */

import { BookOpen, Plus } from "lucide-react";

function EmptySubjects({ onCreateSubject }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <BookOpen className="h-10 w-10 text-orange-500" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        No Subjects Yet
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
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