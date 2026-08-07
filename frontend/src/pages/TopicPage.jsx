/** @format */

import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Archive } from "lucide-react";

import { useDashboard } from "@/context/DashboardContext";

import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
  archiveTopic,
  unArchiveTopic,
} from "@/api/topicApi";

import { getSubjects } from "@/api/subjectApi";

import TopicGrid from "@/components/topic/TopicGrid";
import TopicModal from "@/components/topic/TopicModal";
import TopicSkeleton from "@/components/topic/TopicSkeleton";
import EmptyTopic from "@/components/topic/EmptyTopic";
import DeleteTopicDialog from "@/components/topic/DeleteTopicDialog";
import ArchiveTopicDialog from "@/components/topic/ArchiveTopicDialog";
import TopicToolbar from "@/components/topic/TopicToolbar";

function TopicPage() {
  const { subjectId } = useParams();

  const isGlobalView = !subjectId;

  const { setPrimaryAction } = useDashboard();

  /* ====================== State ====================== */

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("active");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingTopic, setEditingTopic] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);

  const [studyTopicOpen, setStudyTopicOpen] = useState(false);

  /* ====================== Fetch ====================== */

  async function fetchTopics() {
    try {
      setLoading(true);

      const response = await getTopics({
        ...(isGlobalView ? {} : { subject: subjectId }),
        search,
        difficulty,
        archived: status === "archived" ? "true" : "false",
      });

      setTopics(response.topics);
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to fetch topics.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubjects() {
    try {
      const response = await getSubjects();

      setSubjects(response.subjects);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch subjects.",
      );
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTopics();
    }, 300);

    if (isGlobalView) {
      fetchSubjects();
    }

    return () => clearTimeout(timer);
  }, [subjectId, search, difficulty, status]);

  /* ====================== Default Values ====================== */

  const topicDefaultValues = useMemo(() => {
    if (!editingTopic) return undefined;

    return {
      name: editingTopic.name,
      difficulty: editingTopic.difficulty,
      subject: editingTopic.subject?._id || editingTopic.subject,
      notes: editingTopic.notes || "",
    };
  }, [editingTopic]);

  /* ====================== Modal ====================== */

  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setEditingTopic(null);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    setPrimaryAction({
      label: isGlobalView ? "Add Topic" : "Add Subject Topic",

      onClick: openCreateModal,
    });

    return () => setPrimaryAction(null);
  }, [isGlobalView, setPrimaryAction, openCreateModal]);

  const openEditModal = (topic) => {
    setModalMode("edit");
    setEditingTopic(topic);
    setIsModalOpen(true);
  };

  /* ====================== Create ====================== */

  async function handleCreateTopic(data) {
    try {
      await createTopic({
        ...data,
        subject: isGlobalView ? data.subject : subjectId,
      });

      toast.success("Topic created successfully.");

      setIsModalOpen(false);

      await fetchTopics();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create topic.");
    }
  }

  /* ====================== Update ====================== */

  async function handleUpdateTopic(data) {
    if (!editingTopic) return;

    try {
      await updateTopic(editingTopic._id, data);

      toast.success("Topic updated successfully.");

      setEditingTopic(null);
      setIsModalOpen(false);

      await fetchTopics();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update topic.");
    }
  }

  /* ====================== Delete ====================== */

  const handleDeleteClick = (topic) => {
    setSelectedTopic(topic);
    setDeleteDialogOpen(true);
  };

  async function handleDeleteTopic() {
    if (!selectedTopic) return;

    try {
      setDeleteLoading(true);

      await deleteTopic(selectedTopic._id);

      setTopics((prev) =>
        prev.filter((topic) => topic._id !== selectedTopic._id),
      );

      toast.success("Topic deleted successfully.");

      setDeleteDialogOpen(false);
      setSelectedTopic(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete topic.");
    } finally {
      setDeleteLoading(false);
    }
  }

  /* ====================== Archive ====================== */

  const handleArchiveClick = (topic) => {
    setSelectedTopic(topic);
    setArchiveDialogOpen(true);
  };

  const handleUnarchiveClick = async (topic) => {
    try {
      await unArchiveTopic(topic._id);

      toast.success("Topic restored successfully.");

      fetchTopics();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to restore topic.");
    }
  };

  async function handleArchiveTopic() {
    if (!selectedTopic) return;

    try {
      setArchiveLoading(true);

      await archiveTopic(selectedTopic._id);

      setTopics((prev) =>
        prev.filter((topic) => topic._id !== selectedTopic._id),
      );

      toast.success("Topic archived successfully.");

      setArchiveDialogOpen(false);
      setSelectedTopic(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to archive topic.");
    } finally {
      setArchiveLoading(false);
    }
  }

  /* ====================== Study ====================== */

  const handleStudyTopic = (topic) => {
    setSelectedTopic(topic);
    setStudyTopicOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    // Optional UX improvement
    setSearch("");
  };
  return (
    <div className="space-y-5 lg:space-y-6">
      {/* ================= Header ================= */}

      <TopicToolbar
        search={search}
        onSearchChange={setSearch}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        tab={status}
        onTabChange={handleStatusChange}
        activeCount={topics.filter((topic) => !topic.isArchived).length}
        archivedCount={topics.filter((topic) => topic.isArchived).length}
      />

      {/* ================= Content ================= */}

      {loading ? (
        <TopicSkeleton />
      ) : topics.length === 0 ? (
        status === "archived" ? (
          <div
            className="
              flex min-h-[60vh] flex-col items-center
              justify-center rounded-2xl border border-dashed
            border-slate-300 bg-white px-6 py-14 sm:py-20 text-center"
          >
            <div className="mb-4 rounded-full bg-orange-100 p-3 sm:p-4">
              <Archive className="h-7 w-7 sm:h-8 sm:w-8 text-orange-500 " />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              No archived topics
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Archived topics will appear here once you archive them.
            </p>
          </div>
        ) : (
          <EmptyTopic onCreateTopic={openCreateModal} />
        )
      ) : (
        <TopicGrid
          topics={topics}
          onEdit={openEditModal}
          onDelete={handleDeleteClick}
          onArchive={handleArchiveClick}
          onUnarchive={handleUnarchiveClick}
          onStudy={handleStudyTopic}
        />
      )}

      {/* ================= Modal ================= */}

      <TopicModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);

          if (!open) {
            setEditingTopic(null);
            setModalMode("create");
          }
        }}
        mode={modalMode}
        defaultValues={
          modalMode === "create"
            ? {
                name: "",
                difficulty: "Easy",
                subject: isGlobalView ? "" : subjectId,
                notes: "",
              }
            : topicDefaultValues
        }
        showSubjectField={isGlobalView}
        subjects={subjects}
        onSubmit={
          modalMode === "create" ? handleCreateTopic : handleUpdateTopic
        }
      />

      {/* ================= Delete Dialog ================= */}

      <DeleteTopicDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        topic={selectedTopic}
        loading={deleteLoading}
        onConfirm={handleDeleteTopic}
      />

      {/* ================= Archive Dialog ================= */}

      <ArchiveTopicDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        topic={selectedTopic}
        loading={archiveLoading}
        mode="archive"
        onConfirm={handleArchiveTopic}
      />
    </div>
  );
}

export default TopicPage;
