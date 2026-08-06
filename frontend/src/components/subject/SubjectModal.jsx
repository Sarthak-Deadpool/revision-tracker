/** @format */

import SubjectForm from "./SubjectForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function SubjectModal({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
  onSubmit,
}) {
  const isEditMode = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent
        className="w-[95vw] max-w-md rounded-2xl p-5 sm:max-w-lg sm:p-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-1 pb-2">
          <DialogTitle>
            {isEditMode ? "Edit Subject" : "Create Subject"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update your subject details."
              : "Add a new subject."}
          </DialogDescription>
        </DialogHeader>

        <SubjectForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitButtonText={isEditMode ? "Update Subject" : "Create Subject"}
        />
      </DialogContent>
    </Dialog>
  );
}

export default SubjectModal;
