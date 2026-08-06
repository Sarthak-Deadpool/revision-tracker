/** @format */

import { useEffect, useState, useMemo, useCallback } from "react";

import SubjectModal from "@/components/subject/SubjectModal";

import { useDashboard } from "@/context/DashboardContext";

import {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/api/subjectApi";

import SubjectGrid from "@/components/subject/SubjectGrid";

import DeleteSubjectDialog from "@/components/subject/DeleteSubjectDialog";
import { toast } from "sonner";

import SubjectSkeleton from "@/components/subject/SubjectSkeleton";
import EmptySubjects from "@/components/subject/EmptySubjects";
import { useNavigate, useSearchParams } from "react-router-dom";

function SubjectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingSubject, setEditingSubject] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const shouldOpen = searchParams.get("create") === "true";
  async function fetchSubject() {
    try {
      setLoading(true);

      const response = await getSubjects();

      setSubjects(response.subjects);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  }

  const { setPrimaryAction } = useDashboard();

  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setEditingSubject(null);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    fetchSubject();
  }, []);

  useEffect(() => {
    if (!shouldOpen) return;

    openCreateModal();

    navigate("/dashboard/subjects", {
      replace: true,
    });
  }, [shouldOpen, openCreateModal, navigate]);

  useEffect(() => {
    setPrimaryAction({
      label: "Add Subject",
      onClick: openCreateModal,
    });

    return () => setPrimaryAction(null);
  }, [setPrimaryAction, openCreateModal]);

  const subjectDefaultValues = useMemo(() => {
    if (!editingSubject) return undefined;

    return {
      name: editingSubject.name,
      description: editingSubject.description || "",
      color: editingSubject.color,
    };
  }, [editingSubject]);

  async function handleCreateSubject(data) {
    try {
      await createSubject(data);
      setIsModalOpen(false);
      await fetchSubject();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create subject.",
      );
    }
  }

  const handleEditSubject = (subject) => {
    setModalMode("edit");
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleUpdateSubject = async (data) => {
    if (!editingSubject) return;

    try {
      await updateSubject(editingSubject._id, data);

      toast.success("Subject updated successfully.");

      setIsModalOpen(false);
      setEditingSubject(null);

      await fetchSubject();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update subject.",
      );
    }
  };

  const handleStudySubject = (subject) => {
    navigate(`/dashboard/subjects/${subject._id}/topics`);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSubject = async () => {
    if (!selectedSubject) return;

    try {
      setDeleteLoading(true);

      await deleteSubject(selectedSubject._id);

      setSubjects((prev) =>
        prev.filter((subject) => subject._id !== selectedSubject._id),
      );

      toast.success("Subject deleted successfully.");

      setDeleteDialogOpen(false);
      setSelectedSubject(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete subject.",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-5 lg:space-y-6">
      {loading ? (
        <SubjectSkeleton />
      ) : subjects.length === 0 ? (
        <EmptySubjects onCreateSubject={openCreateModal} />
      ) : (
        <SubjectGrid
          subjects={subjects}
          onEdit={handleEditSubject}
          onDelete={handleDeleteClick}
          onStudy={handleStudySubject}
        />
      )}

      <SubjectModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);

          if (!open) {
            setEditingSubject(null);
            setModalMode("create");
          }
        }}
        mode={modalMode}
        defaultValues={subjectDefaultValues}
        onSubmit={
          modalMode === "create" ? handleCreateSubject : handleUpdateSubject
        }
      />

      <DeleteSubjectDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        subject={selectedSubject}
        loading={deleteLoading}
        onConfirm={handleDeleteSubject}
      />
    </div>
  );
}

export default SubjectPage;
