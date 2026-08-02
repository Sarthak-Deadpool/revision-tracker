/** @format */

import { Flame, Trophy, Sun } from "lucide-react";

function DashboardWelcome({ stats }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning !"
      : hour < 17
        ? "Good Afternoon !"
        : "Good Evening !";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}

        <div>
          <p className="text-sm font-medium text-orange-100">{today}</p>

          <h1 className="mt-2 text-3xl font-bold">{greeting}</h1>

          <p className="mt-2 max-w-xl text-orange-100">
            Welcome back! Keep your revision streak alive and move one step
            closer to mastery.
          </p>
        </div>

        {/* Right */}

        <div className="flex gap-5">
          <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-5 w-5" />

              <span className="text-sm">Current Streak</span>
            </div>

            <h2 className="text-3xl font-bold">{stats.streak}</h2>

            <p className="text-sm text-orange-100">
              day{stats.streak !== 1 && "s"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Trophy className="h-5 w-5" />

              <span className="text-sm">Best Streak</span>
            </div>

            <h2 className="text-3xl font-bold">{stats.longestStreak}</h2>

            <p className="text-sm text-orange-100">
              day{stats.longestStreak !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardWelcome;
