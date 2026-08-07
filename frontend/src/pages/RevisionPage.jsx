/** @format */

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTodayRevisions, completeRevision } from "@/api/revisionApi";

import RevisionGrid from "@/components/revision/RevisionGrid";
import RevisionSkeleton from "@/components/revision/RevisionSkeleton";
import EmptyRevision from "@/components/revision/EmptyRevision";

function RevisionPage() {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRevisions() {
    try {
      setLoading(true);

      const response = await getTodayRevisions();

      setRevisions(response.revisions);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch today's revisions",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRevisions();
  }, []);

  const handleStudy = (revision) => {
    setSelectedRevision(revision);
    setStudyDialogOpen(true);
  };

  async function handleCompleteRevision(rating) {
    if (!selectedRevision) return;

    try {
      setCompleteLoading(true);

      await completeRevision(selectedRevision._id, rating);

      toast.success("Revision completed successfully.");

      setStudyDialogOpen(false);
      setSelectedRevision(null);

      await fetchRevisions();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to complete revision.",
      );
    } finally {
      setCompleteLoading(false);
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Content */}

      {loading ? (
        <RevisionSkeleton />
      ) : revisions.length === 0 ? (
        <EmptyRevision />
      ) : (
        <RevisionGrid revisions={revisions} onStudy={handleStudy} />
      )}
    </div>
  );
}
export default RevisionPage;
