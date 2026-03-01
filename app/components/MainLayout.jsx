"use client";
import { useSidebar } from "./context/SidebarContext";
import Header from "./Header";
import Sidebar from "./SideBar";

export default function MainLayout({ children }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ease-in-out pl-0 
            ${isExpanded ? "lg:pl-60" : "lg:pl-[72px]"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}