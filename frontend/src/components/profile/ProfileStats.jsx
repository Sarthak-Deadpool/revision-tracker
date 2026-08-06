/** @format */

import {
  BookOpen,
  FolderOpen,
  CheckCircle2,
  Flame,
  Trophy,
} from "lucide-react";

function ProfileStats({ profile }) {
  const stats = [
    {
      title: "Current Streak",
      value: profile.streak,
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Longest Streak",
      value: profile.longestStreak,
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      title: "Subjects",
      value: profile.totalSubjects,
      icon: FolderOpen,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Topics",
      value: profile.totalTopics,
      icon: BookOpen,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
    {
      title: "Completed Revisions",
      value: profile.totalCompletedRevisions,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="grid h-full gap-5 sm:grid-cols-2 xl:grid-cols-2">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`mb-4 inline-flex rounded-xl p-3 ${stat.bg}`}>
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>

            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>

            <p className="mt-1 text-sm text-slate-500">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileStats;
