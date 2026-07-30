/** @format */

import { Outlet } from "react-router-dom";

import Sidebar from "@/components/dashboard-components/Sidebar";
import Navbar from "@/components/dashboard-components/Navbar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
