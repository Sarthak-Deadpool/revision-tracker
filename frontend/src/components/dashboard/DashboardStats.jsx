/** @format */

import { BookOpen, FileText, RotateCw, CheckCircle2 } from "lucide-react";

import StatCard from "./StatCard";

function DashboardStats({ stats }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Subjects"
        value={stats.totalSubjects}
        subtitle="Study Subjects"
        icon={BookOpen}
        iconBg="bg-orange-100"
        iconColor="text-orange-600"
      />

      <StatCard
        title="Topics"
        value={stats.totalTopics}
        subtitle="Learning Topics"
        icon={FileText}
        iconBg="bg-sky-100"
        iconColor="text-sky-600"
      />

      <StatCard
        title="Due Today"
        value={stats.today}
        subtitle="Pending Revisions"
        icon={RotateCw}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />

      <StatCard
        title="Completed Today"
        value={stats.completedToday}
        subtitle="Today's Completed"
        icon={CheckCircle2}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />
    </div>
  );
}

export default DashboardStats;
