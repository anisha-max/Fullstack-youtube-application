"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/bg-image.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/30 z-0"></div>
      <div className="bg-white/70 p-8 rounded-lg shadow-xl w-full lg:max-w-lg drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]">
        <h1 className="text-4xl font-bold text-center text-[#0C4A6E]mb-6">
          Login
        </h1>

        {error && <p className="text-red-900 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-8 ">
          <div className="flex flex-col gap-1">
            <label className="">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border-b border-sky-300 p-2  focus:outline-none focus:ring-0 font-medium text-lg "
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border-b border-sky-300  p-2 focus:outline-none focus:ring-0 font-medium text-lg "
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#0C4A6E
]p-2 rounded hover:bg-[#DC143C]/90 text-base font-semibold transition duration-200 ${loading && "opacity-50 cursor-not-allowed"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="[#0C4A6E]font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
