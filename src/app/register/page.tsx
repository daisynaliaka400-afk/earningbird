"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Star, Loader2, AlertCircle } from "lucide-react";
import { registerUser } from "@/lib/auth-service";

export default function RegisterPage() {
  return <RegisterClient />;
}

function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageQuery = searchParams.get("plan") || "starter";

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referral_code: searchParams.get("ref") || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError("Full name is required.");
      return false;
    }
    if (!formData.username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        full_name: formData.full_name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        referral_code: formData.referral_code.trim() || undefined,
      });

      if (!result.success) {
        setError(result.error || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created. Continue to payment to activate your dashboard.");
      router.push(`/payment?plan=${packageQuery}`);
    } catch (err: unknown) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.15),_transparent_25%),#050816] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 shadow-xl shadow-cyan-500/20">
              <Star className="h-5 w-5" />
            </div>
            <span className="text-2xl font-semibold">MetaPay</span>
          </Link>
          <h1 className="mt-6 text-4xl font-bold">Create your MetaPay account</h1>
          <p className="mt-3 text-slate-400">Join the platform and unlock dashboard access with a premium package.</p>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
          {error && (
            <div className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <AlertCircle className="inline-block h-5 w-5 align-middle" />
              <span className="ml-2 align-middle">{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Full name
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Username
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="john_doe"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Email
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Phone
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254712345678"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Password
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
              <label className="block text-sm text-slate-300">
                Confirm password
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-300">
              Referral code (optional)
              <input
                name="referral_code"
                value={formData.referral_code}
                onChange={handleChange}
                placeholder="Enter code or leave blank"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-white hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
