import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export default async function WithdrawPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/withdraw");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("account_status, role, wallet_balance, package_id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    redirect("/register");
  }

  const inactive = profile.account_status !== "active" && profile.role !== "admin";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_40%),#030712] text-white px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Withdrawals</h1>
          <p className="mt-3 text-slate-400">Request a payout once your account is active and eligible.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Current balance</p>
              <p className="mt-4 text-4xl font-semibold text-white">{formatCurrency(profile.wallet_balance || 0)}</p>
              <p className="mt-2 text-slate-400">Available once your account is active.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Minimum withdrawal</p>
              <p className="mt-4 text-4xl font-semibold text-white">KSh 500</p>
              <p className="mt-2 text-slate-400">Supported method: M-Pesa.</p>
            </div>
          </div>

          {inactive ? (
            <div className="mt-8 rounded-[1.75rem] border border-indigo-500/20 bg-indigo-500/10 p-6 text-slate-100">
              <p className="text-lg font-semibold">Withdrawals are locked</p>
              <p className="mt-2 text-slate-300">Activate your MetaPay account to enable withdrawal requests and premium payout features.</p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link href="/payment" className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Activate account
                </Link>
                <Link href="/dashboard" className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">
                  Back to dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6">
              <p className="text-slate-300">Submit a withdrawal request through the admin panel. Your request will be reviewed and processed within 24 hours.</p>
              <button className="inline-flex w-full items-center justify-center rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Request withdrawal
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
