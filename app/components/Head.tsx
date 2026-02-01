"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNotification } from "./Notification";


 function Head() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-40  shadow-sm">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">

        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-[#DC143C]  btn "
          onClick={() => showNotification("Welcome to Video Web", "info")}
        >
          <Home className="w-5 h-5" />
          Video Web
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow shrink-0">
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
                className="primary-btn rounded-2xl px-3 py-1  text-white"
                onClick={() => showNotification("Welcome to Admin Dashboard", "info")}
              >
                Upload
              </Link>
              <button
                onClick={handleSignOut}
                className="btn danger-btn text-white rounded-2xl px-3 py-1 "
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

export default Head