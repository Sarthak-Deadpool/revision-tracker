/** @format */

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  RotateCw,
  CalendarDays,
  BarChart3,
  User,
  Settings,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useNavigation } from "@/context/NavigationContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Subjects",
    path: "/dashboard/subjects",
    icon: BookOpen,
  },
  {
    name: "Topics",
    path: "/dashboard/topics",
    icon: FileText,
  },
  {
    name: "Revisions",
    path: "/dashboard/revisions",
    icon: RotateCw,
  },
  {
    name: "Calendar",
    path: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useNavigation();

  return (
    <>
      {/* Mobile Backdrop */}

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div className="flex items-center px-5 py-0">
            <img
              src="/logo.png"
              alt="Revision Tracker"
              className="h-10  ml-6 scale-400 w-auto object-contain"
            />
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}

        <div className="border-t border-slate-200 p-4">
          <p className="text-center text-xs text-slate-500">
            Revision Tracker v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
