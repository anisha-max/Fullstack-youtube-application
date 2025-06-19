"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [uploadedUrl, setUploadedUrl] = useState("");

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
    const updatedForm = { ...form, coverImage: uploadedUrl };
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/login");
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong");
  }
} finally {
  setLoading(false);
}
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-blue-100 shadow-xl rounded-2xl drop-shadow-[0_0_4px_rgba(9,51,60,0.5)]">
        <h1 className="text-3xl font-bold text-center text-sky-900 mb-6">
          Register
        </h1>

        {error && <p className="text-red-900 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
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
          <FileUpload
            fileType="image"
            onProgress={(p) => console.log("Progress:", p)}
            onSuccess={(res) => setUploadedUrl(res.filePath)}
          />

          {uploadedUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Uploaded File:</p>
              <img src={uploadedUrl} alt="Preview" className="w-64 rounded shadow" />
            </div>
          )}
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
          <Link href="/login" className="text-sky-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
