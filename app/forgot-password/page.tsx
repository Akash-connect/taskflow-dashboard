"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      setMessage("");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      setMessage("");
      return;
    }

    setError("");
    setMessage("Password reset instructions have been sent to your email.");
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email to receive reset instructions."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500"
            placeholder="akash@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
        >
          Send reset link
        </button>

        <Link
          href="/login"
          className="block text-center text-sm font-medium text-blue-600 hover:underline"
        >
          Back to login
        </Link>
      </form>
    </AuthLayout>
  );
}