"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Activity, TrendingUp } from "lucide-react";

const seedEvents = [
  {
    id: "1",
    headline: "John from Nairobi earned KES 200",
    category: "earning",
    meta: "Task completed",
  },
  {
    id: "2",
    headline: "Sarah activated Gold package",
    category: "activation",
    meta: "Package purchase",
  },
  {
    id: "3",
    headline: "Kevin withdrew KES 3,500",
    category: "withdrawal",
    meta: "Payout request",
  },
  {
    id: "4",
    headline: "New member joined MetaPay",
    category: "join",
    meta: "Welcome onboard",
  },
];

type LiveEvent = {
  id: string;
  headline: string;
  category: string;
  meta: string;
};

export default function LiveActivityTicker() {
  const [events, setEvents] = useState<LiveEvent[]>(seedEvents);

  useEffect(() => {
    const supabase = createClient();

    async function loadActivity() {
      const { data } = await supabase
        .from("live_activity")
        .select("id, headline, category, meta")
        .order("created_at", { ascending: false })
        .limit(6);

      if (data && data.length) {
        setEvents(data as LiveEvent[]);
      }
    }

    loadActivity();

    const channel = supabase
      .channel("public:live_activity")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "live_activity" },
        (payload) => {
          setEvents((current) => [
            payload.new as LiveEvent,
            ...current.slice(0, 5),
          ]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-400 p-3 text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Live activity</p>
          <h3 className="text-xl font-bold text-white">Real-time platform updates</h3>
        </div>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-indigo-400/30">
            <div className="mt-1 rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">{event.headline}</p>
              <p className="text-sm text-gray-400">{event.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
