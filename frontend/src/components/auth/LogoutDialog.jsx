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

        <DialogFooter className="mt-6 gap-3">
          <GradientButton
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </GradientButton>

          <GradientButton
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600"
          >
            Logout
          </GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
