"use client";

import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Star, Globe, Lock } from "lucide-react";
import LiveActivityTicker from "@/components/LiveActivityTicker";

export default function HomePage() {
  const stats = [
    { value: "64K+", label: "Active Members" },
    { value: "KSh 7.8M", label: "Payouts Delivered" },
    { value: "4.9/5", label: "Member Satisfaction" },
  ];

  const plans = [
    {
      name: "Starter",
      price: "KSh 500",
      details: ["Basic earning tasks", "Account activation", "Daily reports"],
      href: "/register?plan=starter",
      popular: false,
    },
    {
      name: "Bronze",
      price: "KSh 1000",
      details: ["Higher task limits", "Faster payouts", "Referral bonuses"],
      href: "/register?plan=bronze",
      popular: true,
    },
    {
      name: "Gold",
      price: "KSh 3500",
      details: ["VIP campaigns", "Premium rewards", "Priority support"],
      href: "/register?plan=gold",
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_20%),#020617] text-white overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 shadow-xl shadow-cyan-500/20">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold">MetaPay</p>
              <p className="text-sm text-slate-400">Premium earning platform</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#packages" className="transition hover:text-white">Packages</a>
            <a href="#activity" className="transition hover:text-white">Live Activity</a>
            <Link href="/login" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 transition hover:bg-white/10">Login</Link>
            <Link href="/register" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-2 font-semibold text-slate-950 transition hover:brightness-110">Register</Link>
          </nav>
        </header>
      </div>

      <section className="relative z-10 px-6 pb-20 pt-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm shadow-cyan-500/10 backdrop-blur">
              <Zap className="h-4 w-4 text-cyan-300" />
              Fast access to earning tasks and payouts
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Earn smarter with <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">MetaPay</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                MetaPay combines premium task campaigns, referral rewards, in-app payments, and a modern dashboard built for serious earners.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-2xl shadow-cyan-500/20 transition hover:brightness-110">
                Start earning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-7 py-4 text-base text-white transition hover:bg-white/10">
                Existing account
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/10 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-violet-600 to-cyan-500 p-6 text-white shadow-xl shadow-cyan-500/10">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">MetaPay preview</p>
                <h2 className="mt-4 text-3xl font-semibold">Control every earning step</h2>
                <p className="mt-4 text-sm text-cyan-100/90">Track live activity, package progress, referrals, and payout history from one premium dashboard.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.3em]">Balance</p>
                  <p className="mt-3 text-3xl font-semibold text-white">KSh 2,784</p>
                  <p className="text-sm text-slate-400 mt-1">Ready for withdrawal when active</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.3em]">Referrals</p>
                  <p className="mt-3 text-3xl font-semibold text-white">14 active</p>
                  <p className="text-sm text-slate-400 mt-1">Referral reward tracking</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.3em]">Tasks</p>
                  <p className="mt-3 text-3xl font-semibold text-white">8 available</p>
                  <p className="text-sm text-slate-400 mt-1">See task categories and rewards</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                  <p className="text-sm uppercase tracking-[0.3em]">Package</p>
                  <p className="mt-3 text-3xl font-semibold text-white">Bronze</p>
                  <p className="text-sm text-slate-400 mt-1">Unlock premium features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Platform features</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Modern tools for earners who want more</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
              MetaPay blends real-time earnings, referral rewards, secure payments, and premium dashboards to help you maximize every payout.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "In-app payment flow",
                description: "Complete Paynecta activation inside the app without leaving MetaPay.",
                icon: Lock,
              },
              {
                title: "Real-time activity feed",
                description: "Stay updated with every payout, activation, and referral.",
                icon: TrendingUp,
              },
              {
                title: "Premium referrals",
                description: "Earn 10% from referrals and unlock premium rewards.",
                icon: Globe,
              },
            ].map((feature) => (
              <div key={feature.title} className="glass rounded-[2rem] border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Pricing plans</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Choose the right package</h2>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-[2rem] border border-white/10 p-8 shadow-2xl backdrop-blur-xl ${plan.popular ? "bg-gradient-to-br from-violet-600/90 to-cyan-500/80" : "bg-white/5"}`}>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">{plan.name}</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{plan.price}</h3>
                <div className="mt-6 space-y-3 text-slate-300">
                  {plan.details.map((item) => (
                    <p key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
                <Link href={plan.href} className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Activate package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="activity" className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Live activity</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Real-time updates from MetaPay</h2>
          </div>
          <LiveActivityTicker />
        </div>
      </section>
    </main>
  );
}
