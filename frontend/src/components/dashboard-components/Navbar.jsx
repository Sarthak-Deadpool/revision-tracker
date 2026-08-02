/** @format */

import { Bell, LogOut, Plus, UserCircle } from "lucide-react";
import { matchPath, useLocation } from "react-router-dom";

import { useDashboard } from "@/context/DashboardContext";
import { pageConfig } from "@/config/pageConfig";

function Navbar() {
  const location = useLocation();

  const { primaryAction } = useDashboard();

  const page = Object.entries(pageConfig)
    .sort(([pathA], [pathB]) => pathB.length - pathA.length)
    .find(([path]) =>
      matchPath({ path, end: false }, location.pathname),
    )?.[1] ?? {
    title: "Revision Tracker",
    subtitle: "Study smarter every day.",
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-md">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">{page.title}</h1>

        <p className="text-sm text-slate-500">{page.subtitle}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            {primaryAction.label}
          </button>
        )}

        <button className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle className="h-9 w-9 text-slate-500" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">User</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-100">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
