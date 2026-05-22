"use client";

import Link from "next/link";
import { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { ArrowRight, ChevronRight, DollarSign, Shield, Sparkles, Lock, BarChart3 } from "lucide-react";

type Transaction = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  description?: string;
};

type Profile = {
  full_name?: string;
  email?: string;
  plan?: string;
  wallet_balance?: number;
  total_earned?: number;
  account_status?: string;
  payment_status?: string;
  referral_code?: string;
};

type DashboardClientProps = {
  user: {
    id: string;
    email?: string | null;
  };
  profile: Profile;
  transactions: Transaction[];
};

const earningsTrend = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 180 },
  { name: "Wed", value: 140 },
  { name: "Thu", value: 210 },
  { name: "Fri", value: 260 },
  { name: "Sat", value: 320 },
  { name: "Sun", value: 290 },
];

const taskCategories = [
  { title: "Surveys", reward: "KES 120", available: 0 },
  { title: "App Testing", reward: "KES 200", available: 0 },
  { title: "Data Annotation", reward: "KES 180", available: 0 },
  { title: "Video Tasks", reward: "KES 210", available: 0 },
];

export default function DashboardClient({ user, profile, transactions }: DashboardClientProps) {
  const displayName = profile.full_name || user.email || "Member";
  const inactive = profile.account_status !== "active";
  const statusLabel = profile.account_status || "inactive";

  const referralLink = useMemo(() => {
    if (!profile.referral_code) return "";
    return `${process.env.NEXT_PUBLIC_APP_URL}/register?ref=${profile.referral_code}`;
  }, [profile.referral_code]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_30%),#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">MetaPay dashboard</p>
                <h1 className="mt-3 text-4xl font-semibold">Welcome back, {displayName}</h1>
                <p className="mt-3 text-slate-300 max-w-2xl">
                  Manage your earnings, activation status, and referral dashboard from a single premium view.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Account status</p>
                <p className="mt-3 text-2xl font-semibold text-white capitalize">{statusLabel}</p>
              </div>
            </div>

            {inactive && (
              <div className="mt-8 rounded-[2rem] border border-indigo-500/20 bg-indigo-500/10 p-6 text-slate-100 shadow-inner shadow-indigo-500/10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">Activate your account to unlock earning</p>
                    <p className="mt-2 text-slate-300">Inactive users can view the dashboard but cannot start tasks, submit earnings, or withdraw funds.</p>
                  </div>
                  <Link href="/payment" className="inline-flex items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                    Activate account
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current balance</p>
              <p className="mt-4 text-4xl font-semibold">{formatCurrency(profile.wallet_balance ?? 0)}</p>
              <p className="mt-3 text-sm text-slate-300">Wallet balance available for withdrawal when active.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Referral earnings</p>
              <p className="mt-4 text-4xl font-semibold">{formatCurrency(0)}</p>
              <p className="mt-3 text-sm text-slate-300">Share your referral link to earn 10% from each activation.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Earnings chart</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Weekly performance</h2>
              </div>
              <div className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-300">Updated now</div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsTrend}>
                  <CartesianGrid stroke="rgba(148,163,184,0.08)" strokeDasharray="3 3" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 16 }} />
                  <Line type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={4} dot={{ r: 3, fill: "#6d28d9" }} activeDot={{ r: 6, fill: "#22c55e" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-3xl bg-cyan-500/10 p-3 text-cyan-300">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Task categories</p>
                <h2 className="text-2xl font-semibold text-white">Ready to explore</h2>
              </div>
            </div>
            <div className="space-y-4">
              {taskCategories.map((task) => (
                <div key={task.title} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">{task.title}</p>
                      <p className="text-sm text-slate-400">Reward: {task.reward}</p>
                    </div>
                    <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                      {inactive ? "Locked" : "Open"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent activity</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Transaction history</h2>
              </div>
              <Link href="/earnings" className="text-cyan-300 transition hover:text-cyan-100">View all</Link>
            </div>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-400">No transactions yet. Activate your account to earn and begin tracking payouts.</div>
              ) : (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{transaction.description ?? "Transaction"}</p>
                        <p className="text-sm text-slate-400">{formatRelativeTime(transaction.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{formatCurrency(transaction.amount)}</p>
                        <p className="text-sm text-slate-400 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-3xl bg-violet-500/10 p-3 text-violet-300">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Referral hub</p>
                <h2 className="text-2xl font-semibold text-white">Share your code</h2>
              </div>
            </div>
            <p className="text-slate-300">Invite friends and earn 10% of their activation amount. You can use up to 3 premium referrals for bonus rewards.</p>
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Referral code</p>
              <p className="mt-3 text-xl font-semibold text-white">{profile.referral_code || "Not generated"}</p>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Link</p>
              <p className="mt-2 break-all">{referralLink || "Connect your profile to generate a referral link."}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
