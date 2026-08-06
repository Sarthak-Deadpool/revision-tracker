/** @format */

import { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, Plus } from "lucide-react";
import { toast } from "sonner";

import LogoutDialog from "../auth/LogoutDialog";
import ProfileDropdown from "./ProfileDropdown";

import { useDashboard } from "@/context/DashboardContext";
import { useNavigation } from "@/context/NavigationContext";
import { useAuth } from "@/context/AuthContext";
import { pageConfig } from "@/config/pageConfig";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user } = useAuth();
  const { primaryAction } = useDashboard();
  const { setSidebarOpen } = useNavigation();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const page = Object.entries(pageConfig)
    .sort(([a], [b]) => b.length - a.length)
    .find(([path]) =>
      matchPath({ path, end: false }, location.pathname),
    )?.[1] ?? {
    title: "Revision Tracker",
    subtitle: "Study smarter every day.",
  };

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully.");

    setLogoutDialogOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md lg:left-64">
        <div className="flex h-full items-center justify-between px-4 sm:px-6">
          {/* Left */}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900 sm:text-2xl">
                {page.title}
              </h1>

              <p className="hidden text-sm text-slate-500 lg:block">
                {page.subtitle}
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Add */}

            {primaryAction && (
              <>
                <button
                  onClick={primaryAction.onClick}
                  className="hidden items-center gap-2 rounded-xl  px-4 py-2 text-sm font-medium bg-orange-50 transition  sm:flex"
                >
                  <Plus className="h-4 w-4" />

                  {primaryAction.label}
                </button>

                {/* Mobile */}

                <button
                  onClick={primaryAction.onClick}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 transition  sm:hidden"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Notification */}

            <button
              onClick={() => navigate("/dashboard/notifications")}
              className="rounded-xl p-2.5 transition hover:bg-slate-100"
            >
              <Bell className="h-5 w-5 text-slate-600" />
            </button>

            {/* Profile */}

            <ProfileDropdown
              user={user}
              navigate={navigate}
              onLogout={() => setLogoutDialogOpen(true)}
            />
          </div>
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
