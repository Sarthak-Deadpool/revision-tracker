/** @format */

import TopicForm from "./TopicForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function TopicModal({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
  onSubmit,
  showSubjectField = false,
  subjects = [],
}) {
  const isEditMode = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Topic" : "Create Topic"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update your topic details."
              : "Add a new topic to start tracking your revisions."}
          </DialogDescription>
        </DialogHeader>

        <TopicForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          submitButtonText={isEditMode ? "Update Topic" : "Create Topic"}
          showSubjectField={showSubjectField}
          subjects={subjects}
        />
      </DialogContent>
    </Dialog>
  );
}

export default TopicModal;
