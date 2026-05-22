import { redirect } from "next/navigation";
import { createClientWithFallback as createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, referral_code")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    redirect("/register");
  }

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      transactions={transactions || []}
    />
  );
}
