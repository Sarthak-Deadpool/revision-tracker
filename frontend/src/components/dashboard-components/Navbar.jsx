/** @format */

import { Bell, LogOut, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back! Ready for today's revision?
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle className="h-9 w-9 text-slate-500" />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              User
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;