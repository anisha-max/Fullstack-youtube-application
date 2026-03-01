"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Search, SlidersHorizontal, X } from "lucide-react";
import { useNotification } from "./Notification";
import { useSearch } from "./context/SearchContext";
import { useSidebar } from "./context/SidebarContext";
import { usePathname } from "next/navigation";

function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const { query, setQuery } = useSearch();
  const pathname = usePathname();
  const { toggleSidebar, isMobileOpen, setIsMobileOpen } = useSidebar();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-50 backdrop-blur border-b border-[#BAE6FD] h-[10vh]">
      <nav className="px-4 py-4 flex items-center gap-4 relative">
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full text-[#0C4A6E]"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-[#0C4A6E]"
          onClick={() => showNotification("Welcome to Video Web", "info")}
        >
          <span className="hidden sm:inline">Video Web</span>
        </Link>

        {/* Search */}
        {pathname === "/" && (<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full rounded-full border border-[#BAE6FD] pl-4 focus-within:ring-2 focus-within:ring-[#075985] transition bg-white"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#0C4A6E]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="flex-grow bg-transparent outline-none px-4 py-2 text-sm placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] p-3 px-6 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>)}

        {/* Right section */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/upload"
                className="border border-[#0C4A6E] text-[#0C4A6E] hover:bg-[#0C4A6E] hover:text-[#E0F2FE] transition rounded-xl px-4 py-2 text-sm font-medium"
              >
                Upload
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login"    className="border border-[#0C4A6E] text-[#0C4A6E] hover:bg-[#0C4A6E] hover:text-[#E0F2FE] transition rounded-xl px-4 py-2 text-sm font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] rounded-xl px-4 py-2 text-sm font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;