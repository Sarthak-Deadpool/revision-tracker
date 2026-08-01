/** @format */

import { Outlet } from "react-router-dom";

import Sidebar from "@/components/dashboard-components/Sidebar";
import Navbar from "@/components/dashboard-components/Navbar";

function DashboardLayout() {
  return (
    <div className="bg-slate-100">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="mt-16 min-h-[calc(100vh-4rem)] overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;