/** @format */

import { Outlet } from "react-router-dom";
import LeftPanel from "@/components/reusable-componets/LeftPannel";

function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-[1600px]
          overflow-hidden
          bg-white

          lg:min-h-screen
          
          lg:shadow-2xl
        "
      >
        {/* Left Panel */}

        <section
          className="
            hidden
            lg:flex
            lg:w-1/2
            bg-[#15111A]
          "
        >
          <LeftPanel />
        </section>

        {/* Right Panel */}

        <section
          className="
            flex
            w-full
            justify-center
            bg-white

            lg:w-1/2
          "
        >
          <div
            className="
              w-full
              max-w-162.5
            "
          >
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
