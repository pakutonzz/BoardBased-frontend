import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";

export function Shell() {
  return (
    <div className="flex min-h-screen flex-col bg-bb-dark-bg text-white">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-8 md:px-8 lg:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Shell;
