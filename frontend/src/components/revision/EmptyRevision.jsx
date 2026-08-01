/** @format */

import { Brain, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GradientButton from "../reusable-componets/GradientButton";

function EmptyRevision() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-8 text-center">
      {/* Icon */}

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
      </div>

      {/* Heading */}

      <h2 className="mt-6 text-3xl font-bold text-slate-900">
        You're All Caught Up! 🎉
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-lg text-slate-500">
        Amazing work! You've completed all the revisions scheduled for today.
        Keep this streak going by exploring more topics or adding new learning
        material.
      </p>

      {/* Actions */}

      <div className="mt-8">
        <GradientButton
          onClick={() => navigate("/dashboard/topics")}
        >
          <Brain className="h-4 w-4" />
          Explore Topics
        </GradientButton>
      </div>
    </div>
  );
}

export default EmptyRevision;