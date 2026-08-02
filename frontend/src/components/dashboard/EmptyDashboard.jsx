/** @format */

import { BookOpen, Plus } from "lucide-react";

function EmptyDashboard({ onCreateSubject }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg text-center">
        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
          <BookOpen className="h-12 w-12 text-orange-500" />
        </div>

        {/* Title */}

        <h2 className="mt-8 text-3xl font-bold text-slate-900">
          Welcome to Revision Tracker
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          Start your learning journey by creating your first subject.
          Organize topics, revise using spaced repetition, and track
          your mastery over time.
        </p>

        {/* Button */}

        <button
          onClick={onCreateSubject}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          <Plus className="h-5 w-5" />

          Create First Subject
        </button>
      </div>
    </div>
  );
}

export default EmptyDashboard;