import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import { Outlet, Link } from "react-router-dom";

export function Shell() {
  return (
    <div className="min-h-dvh bg-[#383838] text-white font-noto">
      {/* NAVBAR */}
      <header className="sticky top-0 z-20 w-full bg-[#323232] h-[100px]">
        <div className="h-full flex items-center justify-between px-8">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/BoardBased.png"
              alt="BoardBased"
              className="h-[40px] w-auto"
            />
          </Link>

          {/* Search (centered) */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[853px] h-[50px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full rounded-full bg-white text-gray-900 placeholder-gray-400 pl-4 pr-10 text-base outline-none shadow-sm"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Download CSV button */}
          <a
            href="/backend.csv"
            download
            className="ml-8 inline-flex h-[50px] w-[262px] items-center justify-center gap-3
             rounded-md bg-[#F97316] hover:brightness-110 active:brightness-90
             text-white shadow transition"
          >
            <svg
              className="shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[20px] font-semibold leading-none">
              Download CSV
            </span>
          </a>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="px-8 pt-[25px] pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Shell;
