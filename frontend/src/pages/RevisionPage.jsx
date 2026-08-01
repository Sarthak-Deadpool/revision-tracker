/** @format */

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTodayRevisions, completeRevision } from "@/api/revisionApi";

import RevisionGrid from "@/components/revision/RevisionGrid";
import RevisionSkeleton from "@/components/revision/RevisionSkeleton";
import EmptyRevision from "@/components/revision/EmptyRevision";

import StudyRevisionDialog from "@/components/revision/StudyRevisionDialog";

function RevisionPage() {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studyDialogOpen, setStudyDialogOpen] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState(null);
  const [completeLoading, setCompleteLoading] = useState(false);

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
    <div className="space-y-6">
      {/* ================= Header ================= */}

      {/* <div>
        <h1 className="text-2xl font-bold">Today's Revisions</h1>

        <p className="text-slate-500">
          Complete your scheduled revisions and improve your mastery.
        </p>
      </div> */}

      {/* ================= Content ================= */}

      {loading ? (
        <RevisionSkeleton />
      ) : revisions.length === 0 ? (
        <EmptyRevision />
      ) : (
        <RevisionGrid revisions={revisions} onStudy={handleStudy} />
      )}

      <StudyRevisionDialog
        open={studyDialogOpen}
        onOpenChange={(open) => {
          setStudyDialogOpen(open);

          if (!open) {
            setSelectedRevision(null);
          }
        }}
        revision={selectedRevision}
        loading={completeLoading}
        onComplete={handleCompleteRevision}
      />
    </div>
  );
}
export default RevisionPage;
