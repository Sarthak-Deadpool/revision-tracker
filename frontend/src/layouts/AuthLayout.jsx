/** @format */

import { Outlet } from "react-router-dom";
import LeftPanel from "@/components/reusable-componets/LeftPannel";

function AuthLayout() {
  return (
    <main className="min-h-screen bg-[#15111A] lg:h-screen">
      <div
        className="mx-auto flex min-h-screen max-w-[1800px]
        overflow-hidden bg-[#15111A]
        lg:h-screen
        lg:rounded-3xl
        lg:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
      >
        {/* LEFT SIDE */}
        <section className="hidden bg-[#15111A] lg:flex lg:w-[55%]">
          <LeftPanel />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex w-full bg-white lg:w-[45%] lg:rounded-l-[8%]">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
