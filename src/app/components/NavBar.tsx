"use client";

import { useState } from "react";
import { NavItem } from "./NavItem";
import { Home, Info, Plus, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <aside
      className={`${
        open ? "w-64" : "w-24"
      } bg-white border-r transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {/* Logo / Title */}
        <div className="flex items-center space-x-2 overflow-hidden">
          <h1
            className={`text-xl font-bold text-blue-600 transition-all duration-300 ${
              open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            Scopetok
          </h1>
        </div>

        {/* Menu Toggle (always visible) */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          Menu
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-3">
        <NavItem
          icon={<Home />}
          text="Home"
          open={open}
          onClick={() => router.push("/")}
        />
        <NavItem
          icon={<Plus />}
          text="New"
          open={open}
          onClick={() => router.push("/new")}
        />
        <NavItem
          icon={<Info />}
          text="Info"
          open={open}
          onClick={() => router.push("/info")}
        />
      </nav>
    </aside>
  );
};
