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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArchive ? "Archive Topic" : "Restore Topic"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isArchive
              ? "The topic will be moved to Archived Topics."
              : "The topic will be restored to your active topics."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-center font-semibold text-slate-900">
            {topic?.name}
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {isArchive
              ? "You can restore this topic at any time from the Archived tab."
              : "Once restored, the topic will appear in your active topics again."}
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

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
