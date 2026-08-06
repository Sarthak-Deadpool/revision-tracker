/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import LogoutDialog from "../auth/LogoutDialog";

import { Bell, LogOut, Plus, UserCircle } from "lucide-react";
import { matchPath, useLocation } from "react-router-dom";

import { useDashboard } from "@/context/DashboardContext";
import { pageConfig } from "@/config/pageConfig";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { primaryAction } = useDashboard();

  const { user } = useAuth();

  const page = Object.entries(pageConfig)
    .sort(([pathA], [pathB]) => pathB.length - pathA.length)
    .find(([path]) =>
      matchPath({ path, end: false }, location.pathname),
    )?.[1] ?? {
    title: "Revision Tracker",
    subtitle: "Study smarter every day.",
  };

  const handleLogout = () => {
    logout();

    setLogoutDialogOpen(false);

    toast.success("Logged out successfully.");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
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

          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
          </button>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <UserCircle className="h-10 w-10 text-slate-500" />
            )}

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </Link>

          <button
            onClick={() => setLogoutDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>
      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleLogout}
        loading={false}
      />
    </>
  );
}

export default Navbar;
