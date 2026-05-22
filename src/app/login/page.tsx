"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Star, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { loginWithCredentials } from "@/lib/auth-service";

export default function LoginPage() {
  return <LoginClient />;
}

function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username.trim() && !phone.trim()) {
      setError("Please enter your username or phone number.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const result = await loginWithCredentials({
        username,
        phone,
        password,
      });

      if (!result.success) {
        setError(result.error || "Login failed. Please try again.");
        return;
      }

      toast.success("Welcome back! Redirecting...");
      const target = result.user?.role === "admin" ? "/admin" : redirectTo;
      router.push(target);
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.15),_transparent_25%),#050816] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 shadow-xl shadow-cyan-500/20">
              <Star className="h-5 w-5" />
            </div>
            <span className="text-2xl font-semibold">MetaPay</span>
          </Link>
          <h1 className="text-4xl font-bold">Welcome back</h1>
          <p className="mt-3 text-slate-400">Login with your username, phone number, and password.</p>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
          {error && (
            <div className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-300" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block text-sm font-medium text-slate-300">
              Username
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="john_doe"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Phone number
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254712345678"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Password
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-4 inline-flex items-center text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{' '}
            <Link href="/register" className="font-semibold text-white hover:text-cyan-300">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
