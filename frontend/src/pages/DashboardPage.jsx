/** @format */

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDashboard } from "@/api/dashboardApi";
import { useDashboard } from "@/context/DashboardContext";

import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import TodayRevisions from "@/components/dashboard/TodayRevisions";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import UpcomingRevisions from "@/components/dashboard/UpcomingRevisions";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import RecentHistory from "@/components/dashboard/RecentHistory";
function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const { primaryAction } = useDashboard();

  async function fetchDashboard() {
    try {
      setLoading(true);

      const response = await getDashboard();

      setDashboard(response);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!dashboard) {
    return null;
  }

  if (dashboard.stats.totalSubjects === 0) {
    return <EmptyDashboard onCreateSubject={primaryAction?.onClick} />;
  }

  return (
    <div className="space-y-8">
      <DashboardWelcome stats={dashboard.stats} />

      <DashboardStats stats={dashboard.stats} />

      {/* Left */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TodayRevisions
          revisions={dashboard.todayRevisions}
          count={dashboard.todayRevisionCount}
        />

        <SubjectProgress subjects={dashboard.subjectProgress} />
      </div>

      <UpcomingRevisions revisions={dashboard.upcomingRevisions} />
      <RecentHistory revisions={dashboard.recentHistory} />
    </div>
  );
}

export default DashboardPage;
