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

  const handleLogin = async (e: React.FormEvent) => {
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
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]">
        <h1 className="text-3xl font-bold text-center text-sky-900 mb-6">
          Login
        </h1>

        {error && <p className="text-red-900 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-sky-900 text-white p-2 rounded hover:bg-sky-900 transition duration-200 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-black mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-sky-900 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
