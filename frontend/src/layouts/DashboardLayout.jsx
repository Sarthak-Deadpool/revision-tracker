/** @format */

import { Outlet } from "react-router-dom";
import { DashboardProvider } from "@/context/DashboardContext";

import Sidebar from "@/components/dashboard-components/Sidebar";
import Navbar from "@/components/dashboard-components/Navbar";

function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="bg-slate-100">
        <Sidebar />
        <div className="ml-64">
          <Navbar />

          <main className="mt-16 min-h-[calc(100vh-4rem)] overflow-y-auto p-4">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashboardLayout;
