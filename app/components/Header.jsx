"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, Menu, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useNotification } from "./Notification";
import { useSearch } from "./SearchContext";


function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { query, setQuery } = useSearch();
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
 <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#BAE6FD]">
  <nav className="px-4 py-4 flex items-center gap-4 relative">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-xl text-[#0C4A6E]"
      onClick={() => showNotification("Welcome to Video Web", "info")}
    >
      <Home className="w-5 h-5" />
      Video Web
    </Link>

    {/* Search */}
    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full rounded-full border border-[#BAE6FD] pl-4 focus-within:ring-2 focus-within:ring-[#075985] transition"
      >
        <SlidersHorizontal className="w-5 h-5 text-[#0C4A6E]" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="flex-grow bg-transparent outline-none px-4 text-sm placeholder-gray-400"
        />

        <button
          type="submit"
          className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] p-3 px-6 rounded-full transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>

    {/* Right section */}
    <div className="ml-auto hidden md:flex items-center gap-4">
      {session ? (
        <>
          {/* <div className="flex items-center gap-2">
            <img
              src={`https://ik.imagekit.io/anisha/tr:h-40,w-40/${session.user?.image}`}
              className="w-9 h-9 rounded-full border border-[#BAE6FD]"
              alt="user"
            />
            <span className="text-sm text-[#0C4A6E]">
              {session.user?.email?.split("@")[0]}
            </span>
          </div> */}
          

          <Link
            href="/upload"
            className="border border-[#0C4A6E] text-[#0C4A6E] hover:bg-[#0C4A6E] hover:text-[#E0F2FE] transition rounded-xl px-4 py-2"
          >
            Upload
          </Link>
           <Link
            href="/view-history"
            className="border border-[#0C4A6E] text-[#0C4A6E] hover:bg-[#0C4A6E] hover:text-[#E0F2FE] transition rounded-xl px-4 py-2"
          >
            History
          </Link>

          <button
            onClick={handleSignOut}
            className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] rounded-xl px-4 py-2 transition"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="border border-[#0C4A6E] text-[#0C4A6E] hover:bg-[#0C4A6E] hover:text-[#E0F2FE] transition rounded-xl px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#0C4A6E] hover:bg-[#075985] text-[#E0F2FE] rounded-xl px-4 py-2 transition"
          >
            Register
          </Link>
        </>
      )}
    </div>

    {/* Mobile menu button */}
    <button
      className="md:hidden ml-auto text-[#0C4A6E]"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {mobileMenuOpen ? <X /> : <Menu />}
    </button>
  </nav>

  {/* Mobile menu */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-white border-t border-[#BAE6FD] px-6 py-4 space-y-3">
      {session ? (
        <>
          <p className="text-sm text-[#0C4A6E]">
            {session.user?.email?.split("@")[0]}
          </p>
          <Link href="/upload" className="block text-[#0C4A6E]">
            Upload
          </Link>
          <button onClick={handleSignOut} className="text-red-500">
            Sign Out
          </button>
        </>
      ) : (
        <Link href="/login" className="text-[#0C4A6E]">
          Login
        </Link>
      )}
    </div>
  )}
</header>

  );
}

export default Header