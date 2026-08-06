/** @format */

import ChangePasswordCard from "@/components/setting/ChangePasswordCard";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <ChangePasswordCard />

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900">
          Security Notice
        </h3>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          After changing your password, you'll be signed out automatically and
          will need to log in again using your new password. This helps protect
          your account and ensures all future sessions use your updated
          credentials.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
