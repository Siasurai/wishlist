import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Gift } from "../types";

export function useGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) console.error(error);
      if (!ignore && data) setGifts(data);
      setLoading(false);
    })();

    const channel = supabase
      .channel("gifts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gifts" },
        (payload) => {
          setGifts((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new as Gift];
            }
            if (payload.eventType === "UPDATE") {
              return prev.map((g) =>
                g.id === (payload.new as Gift).id ? (payload.new as Gift) : g
              );
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((g) => g.id !== (payload.old as Gift).id);
            }
            return prev;
          });
        }
      )
      .subscribe();
    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { gifts, loading };
}
