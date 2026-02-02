"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, Menu, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useNotification } from "./Notification";


function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };
  return (
    <header className="fixed w-full shadow-sm z-50 bg-black">
      <nav className=" px-4 py-5 flex items-center relative">

        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-[#DC143C] "
          onClick={() => showNotification("Welcome to Video Web", "info")}
        >
          <Home className="w-5 h-5" />
          Video Web
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 ">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-4xl bg-[#1a1a1a] rounded-full border border-gray-800 pl-4 focus-within:ring-1 focus-within:ring-gray-600 transition-all"
          >
            <SlidersHorizontal className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white transition-colors" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search here..."
              className="flex-grow bg-transparent border-none outline-none px-4 text-white placeholder-gray-500 text-base"
            />

            <button
              type="submit"
              className="bg-[#cc1111] hover:bg-[#ff0000] text-white p-3 px-8 rounded-full transition-colors flex items-center justify-center"
            >
              <Search className="w-6 h-6" />
            </button>
          </form>
        </div>

        <div className="ml-auto hidden md:flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-red-200 shadow shrink-0">
                  <img
                    src={`https://ik.imagekit.io/anisha/tr:h-40,w-40/${session.user?.image}`}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border border-white shadow"
                  />
                  {/* <IKImage
                    src={session?.user?.image || ""}
                    transformation={[{ height: "10", width: "10" }]}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border border-white shadow"
                  /> */}
                </div>
                <span className="text-blue-100 text-sm hidden lg:block">
                  {session.user?.email?.split("@")[0]}
                </span>
              </div>

              <Link
                href="/upload"
                className="border-2 border-[#DC143C] text-[#DC143C] font-semibold rounded-2xl px-3 py-2"
                onClick={() => showNotification("Welcome to Admin Dashboard", "info")}
              >
                Upload
              </Link>
              <button
                onClick={handleSignOut}
                className=" bg-[#DC143C]  text-white font-semibold rounded-2xl p-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className=" border-2 border-[#DC143C] text-[#DC143C] font-semibold rounded-2xl px-3 py-2"
                onClick={() => showNotification("Please login in to continue", "info")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className=" bg-[#DC143C]  text-white font-semibold rounded-2xl p-2"
                onClick={() => showNotification("Please sign in to continue", "info")}
              >
                Register
              </Link>
            </>
          )}
        </div>


        <button
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-base-200 px-10 py-4 space-y-3 shadow-inner">
          {session ? (
            <>
              <div className="text-sm opacity-70">{session.user?.email?.split("@")[0]}</div>
              <Link
                href="/upload"
                className="block btn btn-sm btn-outline w-full text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  showNotification("Welcome to Admin Dashboard", "info");
                }}
              >
                Upload
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="btn btn-sm btn-error text-white w-full text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn btn-sm btn-primary w-full text-left"
              onClick={() => {
                setMobileMenuOpen(false);
                showNotification("Please sign in to continue", "info");
              }}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header