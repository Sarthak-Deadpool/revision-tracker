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
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-600">
            Delete Topic
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2 text-base text-slate-600">
            <p>
              Are you sure you want to delete this topic?
            </p>

            <p className="rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-900">
              {topic?.name}
            </p>

            <p>
              This action cannot be undone. All revision history and progress
              associated with this topic will be permanently removed.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              onConfirm?.();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete Topic"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTopicDialog;