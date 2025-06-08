"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    coverImage: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-900">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-sky-900 mb-6">
          Register
        </h1>

        {error && <p className="text-red-900 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <input
            name="coverImage"
            placeholder="Cover Image URL"
            value={form.coverImage}
            onChange={handleChange}
            className="border border-sky-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-900 text-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-900 text-white py-2 rounded hover:bg-sky-900 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center text-black mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-sky-900 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
