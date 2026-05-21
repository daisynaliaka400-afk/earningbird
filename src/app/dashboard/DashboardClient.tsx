'use client';

import Link from "next/link";

type Transaction = {
  id: string;
  amount?: number;
  status?: string;
  created_at?: string;
  description?: string;
  [key: string]: unknown;
};

type Profile = {
  full_name?: string;
  email?: string;
  [key: string]: unknown;
};

type DashboardClientProps = {
  user: {
    id: string;
    email?: string;
  };
  profile: Profile | null;
  transactions: Transaction[];
};

export default function DashboardClient({
  user,
  profile,
  transactions,
}: DashboardClientProps) {
  const displayName = profile?.full_name || user.email || "Your account";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back, {displayName}</h1>
          <p className="mt-2 text-sm text-slate-600">
            Account ID: <span className="font-medium text-slate-800">{user.id}</span>
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
            <dl className="mt-4 space-y-4 text-sm text-slate-700">
              <div>
                <dt className="font-medium text-slate-900">Name</dt>
                <dd>{profile?.full_name ?? "Not provided"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Email</dt>
                <dd>{user.email ?? "Not provided"}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Actions</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <Link href="/payment/register" className="block rounded-xl bg-slate-900 px-4 py-3 text-center text-white transition hover:bg-slate-800">
                Upgrade package
              </Link>
              <Link href="/login" className="block rounded-xl border border-slate-300 px-4 py-3 text-center text-slate-900 transition hover:bg-slate-50">
                Manage account
              </Link>
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent transactions</h2>
            <p className="text-sm text-slate-500">Last {transactions.length} records</p>
          </div>

          {transactions.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">No recent transactions found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{transaction.description ?? "Transaction"}</p>
                      <p className="text-sm text-slate-600">ID: {transaction.id}</p>
                    </div>
                    <div className="text-right text-sm text-slate-700">
                      <p>{transaction.amount !== undefined ? `$${transaction.amount}` : "Amount not available"}</p>
                      <p className="text-slate-500">{transaction.status ?? "Status unknown"}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{transaction.created_at ? new Date(transaction.created_at as string).toLocaleString() : "Date not available"}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
