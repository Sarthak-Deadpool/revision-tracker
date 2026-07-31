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

function ArchiveTopicDialog({
  open,
  onOpenChange,
  topic,
  onConfirm,
  loading = false,
  mode = "archive",
}) {
  const isArchive = mode === "archive";

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            {isArchive ? "Archive Topic" : "Restore Topic"}
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2 text-base text-slate-600">
            <p>
              {isArchive
                ? "Are you sure you want to archive this topic?"
                : "Do you want to restore this topic?"}
            </p>

            <p className="rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-900">
              {topic?.name}
            </p>

            <p>
              {isArchive
                ? "The topic will be moved to Archived Topics. You can restore it at any time."
                : "The topic will be restored and will appear again in your active topics."}
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
          >
            {loading
              ? isArchive
                ? "Archiving..."
                : "Restoring..."
              : isArchive
                ? "Archive Topic"
                : "Restore Topic"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ArchiveTopicDialog;