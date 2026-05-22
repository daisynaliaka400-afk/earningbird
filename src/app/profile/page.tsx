import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, email, username, role, package_id, package_name, account_status, payment_status, wallet_balance, total_earned, referral_code"
    )
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
          <h1 className="text-3xl font-semibold">Account Profile</h1>
          <p className="mt-3 text-slate-400">View your MetaPay account details and upgrade progress.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Profile details</h2>
            <dl className="space-y-5 text-slate-300">
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Full name</dt>
                <dd className="mt-2 text-lg text-white">{profile.full_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Email</dt>
                <dd className="mt-2 text-lg text-white">{profile.email || user.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Username</dt>
                <dd className="mt-2 text-lg text-white">{profile.username || "—"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Referral code</dt>
                <dd className="mt-2 text-lg text-white">{profile.referral_code || "Not available"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Subscription</h2>
            <dl className="space-y-5 text-slate-300">
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Package</dt>
                <dd className="mt-2 text-lg text-white">{profile.package_name || "Not selected"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Status</dt>
                <dd className="mt-2 text-lg text-white capitalize">{profile.account_status || "inactive"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Payment</dt>
                <dd className="mt-2 text-lg text-white">{profile.payment_status || "unpaid"}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Balance</dt>
                <dd className="mt-2 text-lg text-white">{formatCurrency(profile.wallet_balance || 0)}</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.24em] text-slate-500">Total earned</dt>
                <dd className="mt-2 text-lg text-white">{formatCurrency(profile.total_earned || 0)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {inactive && (
          <div className="rounded-[2rem] border border-indigo-500/20 bg-indigo-500/10 p-8 text-slate-100 shadow-inner shadow-indigo-500/10">
            <h2 className="text-xl font-semibold">Activate your account</h2>
            <p className="mt-3 text-slate-300">Your profile is visible, but earning and withdrawal features remain locked until payment verification is complete.</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/payment" className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Continue to payment
              </Link>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10">
                Return to dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
