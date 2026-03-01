"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";


const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function RegisterPage() {
  const router = useRouter();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    coverImage: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
    } catch (err) {
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
    <div className="relative min-h-[90vh] w-full flex items-center justify-center bg-[url('/bg-image.jpg')] bg-cover bg-center overflow-hidden text-white">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className=" bg-black/70 p-8 rounded-lg shadow-xl w-full lg:max-w-lg drop-shadow-[0_0_4px_rgba(9,51,60,0.5)] mt-10">
        <h1 className="text-4xl text-white font-bold text-center text-[#0C4A6E]mb-6">
          Register
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <div className="flex flex-col gap-1">
            <label className="text-white">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="border-b border-red-100 p-2 bg-black focus:outline-none focus:ring-0 font-medium text-lg text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="border-b border-red-100 p-2 bg-black focus:outline-none focus:ring-0 font-medium text-lg text-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label className="text-white">Password</label>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="border-b border-red-100 p-2 pr-10 bg-black focus:outline-none focus:ring-0 font-medium text-lg text-gray-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] z-10 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <div className="text-white flex gap-2 cursor-pointer">
            <FileUpload
              fileType="image"
              onProgress={(p) => console.log("Progress:", p)}
              onSuccess={(res) => setUploadedUrl(res.filePath)}
            />
          </div>

          {uploadedUrl && (
            <div className="mt-4 flex gap-5 items-center">
              <p className="text-sm text-white ">Uploaded File:</p>
              <img src={`${urlEndpoint}${uploadedUrl}`} alt="Preview" className="w-20 h-20 rounded shadow" />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="text-white p-2 rounded bg-[#0C4A6E] hover:bg-[#075985]  text-base font-semibold transition duration-200 cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0C4A6E] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
