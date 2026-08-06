/** @format */

import { Outlet } from "react-router-dom";

import { DashboardProvider } from "@/context/DashboardContext";
import { NavigationProvider } from "@/context/NavigationContext";

import Sidebar from "@/components/dashboard-components/Sidebar";
import Navbar from "@/components/dashboard-components/Navbar";

function DashboardLayout() {
  return (
    <NavigationProvider>
      <DashboardProvider>
        <div className="min-h-screen bg-slate-100">
          <Sidebar />

          <div className="lg:ml-64">
            <Navbar />

            <main className="mt-16 min-h-[calc(100vh-4rem)] px-4 py-5 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </DashboardProvider>
    </NavigationProvider>
  );
}

export default DashboardLayout;
