"use client";
import React from "react";
import { Home, PlaySquare, History, User } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./context/SidebarContext";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: PlaySquare, label: "Subscriptions", href: "/subs" },
  { icon: History, label: "History", href: "/view-history" },
  { icon: User, label: "You", href: "/profile" },
];

export default function Sidebar() {
  const { isExpanded, isMobileOpen, setIsMobileOpen } = useSidebar();

  return (
    <>
     <aside
  className={`fixed left-0 top-18 h-[calc(100vh-56px)] bg-gray-50 border-r border-gray-200 transition-all duration-100 py-6 z-50
    ${isMobileOpen ? "translate-x-0 w-[95vw] " : "-translate-x-full lg:translate-x-0"}
    ${isExpanded ? "lg:w-60" : "lg:w-[72px]"}
  `}
>
        <div className="flex flex-col h-full py-2 overflow-y-auto gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center p-2 lg:py-3 space-x-3 hover:bg-[#0C4A6E]/10 rounded-xl mx-2 transition-all
                ${isExpanded ? "lg:px-6" : "lg:justify-center  lg:px-2"}
              `}
            >
             <div className="bg-[#0C4A6E]/10 p-2 rounded-xl">
                 <item.icon size={24 } strokeWidth={isExpanded ? 1.5 : 2}  />
             </div>
              
              <span 
  className={`transition-all duration-300 ease-in-out truncate
    ${isExpanded || isMobileOpen 
      ? "opacity-100 translate-x-0 text-sm w-auto" 
      : "opacity-100 text-[10px] mt-1 lg:ml-0"
    }
  `}
>
  {item.label}
</span>
            </Link>
          ))}
        </div>
      </aside>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}