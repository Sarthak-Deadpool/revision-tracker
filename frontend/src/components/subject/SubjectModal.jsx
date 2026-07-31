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
    <Dialog open={open} onOpenChange={onOpenChange}  disablePointerDismissal>
      <DialogContent
        className="sm:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Subject" : "Create Subject"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update your subject details."
              : "Add a new subject to organize your topics and revisions."}
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
