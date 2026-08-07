/** @format */

import { ArrowRight, BookOpen, Brain, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
          <BookOpen className="h-4 w-4" />
          Smart Revision Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Study Smarter.
          <br />
          <span className="text-orange-500">Remember Longer.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
          Revision Tracker helps you organize subjects, schedule spaced
          repetitions, track mastery, and build a consistent revision habit so
          you never forget what you've learned.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold transition hover:bg-orange-600"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-semibold transition hover:border-orange-500 hover:bg-slate-800"
          >
            Login
          </Link>
        </div>

        {/* Features */}

        <div className="mt-24 grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
            <Brain className="mb-5 h-10 w-10 text-orange-500" />

            <h3 className="text-xl font-semibold">
              Spaced Repetition
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Automatically schedule revisions based on your memory and improve
              long-term retention.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
            <BookOpen className="mb-5 h-10 w-10 text-orange-500" />

            <h3 className="text-xl font-semibold">
              Organize Everything
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Keep subjects, topics, notes, and revision history neatly
              organized in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
            <Clock3 className="mb-5 h-10 w-10 text-orange-500" />

            <h3 className="text-xl font-semibold">
              Daily Revision Plan
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Never miss a revision again with a personalized daily study queue.
            </p>
          </div>
        </div>

        <p className="mt-16 text-sm text-slate-500">
          Built with React • Node.js • Express • MongoDB
        </p>
      </section>
    </div>
  );
}

export default HomePage;