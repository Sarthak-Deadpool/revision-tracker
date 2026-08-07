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
      <DialogContent
        className="
          w-[95vw]
          max-w-lg

          max-h-[90vh]
          overflow-y-auto

          rounded-3xl

          p-0

          sm:w-full
        "
         
      >
        {/* Header */}

        <div className="border-b border-slate-200 px-6 py-5">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {isEditMode ? "Edit Topic" : "Create Topic"}
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-slate-500">
              {isEditMode
                ? "Update your topic details."
                : "Add a new topic to start tracking your revisions."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}

        <div className="px-6 py-6">
          <TopicForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            submitButtonText={isEditMode ? "Update Topic" : "Create Topic"}
            showSubjectField={showSubjectField}
            subjects={subjects}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TopicModal;
