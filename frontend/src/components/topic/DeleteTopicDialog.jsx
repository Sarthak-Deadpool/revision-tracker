/** @format */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DeleteTopicDialog({
  open,
  onOpenChange,
  topic,
  onConfirm,
  loading = false,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Topic</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Custom Content */}
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Are you sure you want to permanently delete this topic?
          </p>

          <div className="rounded-xl bg-slate-100 px-4 py-3 text-center font-semibold text-slate-900">
            {topic?.name}
          </div>

          <p className="text-sm leading-6 text-slate-600">
            All revision history, mastery progress, and notes associated with
            this topic will be permanently removed. This action cannot be
            undone.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              onConfirm?.();
            }}
          >
            {loading ? "Deleting..." : "Delete Topic"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTopicDialog;
