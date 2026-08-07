/** @format */

import GradientButton from "../reusable-componets/GradientButton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function LogoutDialog({ open, onOpenChange, onConfirm, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Logout</DialogTitle>

          <DialogDescription>
            Are you sure you want to logout from your account?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="
      flex-1
      rounded-xl
      border
      border-slate-200
      bg-white
      py-3
      text-sm
      font-semibold
      text-slate-700
      transition
      hover:bg-slate-50
      disabled:opacity-50
    "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="
      flex-1
      rounded-xl
      bg-red-500
      py-3
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-red-600
      disabled:opacity-50
    "
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
