/** @format */

import { Brain, Plus } from "lucide-react";

function EmptyTopic({ onCreateTopic }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <Brain className="h-10 w-10 text-orange-500" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        No Topics Yet
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        Create your first topic to begin tracking revisions, monitor your
        mastery, and build an effective spaced repetition schedule.
      </p>

      <button
        type="button"
        onClick={onCreateTopic}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white transition hover:bg-orange-700"
      >
        <Plus className="h-5 w-5" />
        Create Topic
      </button>
    </div>
  );
}

export default EmptyTopic;