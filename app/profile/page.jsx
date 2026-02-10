"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // 🔹 Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center mt-10">
        <p>Loading...</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!session) {
    return (
      <div className="flex justify-center mt-10">
        <p>Please login first</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]">
        <div className="flex flex-col items-center pb-10">

          <img
            className="w-24 h-24 mb-3 rounded-full mt-2 shadow-lg"
            src={`https://ik.imagekit.io/anisha/tr:h-40,w-40/${session.user?.image}`}
            alt="Profile Pic"
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {session.user?.email?.split("@")[0]}
          </h5>

          <span className="text-sm text-gray-600">
            {session.user?.name}
          </span>

          <div className="flex mt-4">
            <Link
              href="/upload"
              className="inline-flex items-center px-4 py-2 text-sm font-medium secondary-bg rounded-lg hover:scale-105"
            >
              Upload Video
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
