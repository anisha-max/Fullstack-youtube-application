"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0C4A6E]"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 space-y-4">
        <p className="text-slate-500 text-lg">Please login to view your profile</p>
        <Link href="/login" className="bg-[#0C4A6E] text-white px-6 py-2 rounded-lg">Login</Link>
      </div>
    );
  }

  return (
    <div className=" px-4">
      <div className="rounded-3xl overflow-hidden border border-slate-100">
        <div className="h-32 w-full bg-gradient-to-r from-[#0C4A6E] to-[#073652]"></div>

        <div className="relative px-6 pb-10">
          <div className="relative -mt-12 mb-4 flex justify-between items-end">
            <Image
              className="w-32 h-32 rounded-2xl border-4 border-white shadow-md object-cover bg-white"
              src={`${urlEndpoint}${session?.user?.image}`}
              alt="Profile"
              width={100}
              height={200}
            />
            <Link
              href="/upload"
              className="mb-2 bg-[#0C4A6E] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#073652] transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Video
            </Link>
          </div>

          {/* User Info */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900">
              {session.user?.name || session.user?.email?.split("@")[0]}
            </h1>
            <p className="text-slate-500 font-medium">@{session.user?.email?.split("@")[0]}</p>
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Stats/Overview Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <p className="text-2xl font-bold text-[#0C4A6E]">0</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Videos</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <p className="text-2xl font-bold text-[#0C4A6E]">0</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Views</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <p className="text-2xl font-bold text-[#0C4A6E]">0</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Subscribers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">Your Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* You can map your user's videos here */}
            <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                No videos uploaded yet
            </div>
        </div>
      </div>
    </div>
  );
}