import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Reservation } from "../types";

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) console.error(error);
      if (!ignore && data) setReservations(data);
    })();

    const channel = supabase
      .channel("reservations-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          setReservations((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new as Reservation];
            }
            if (payload.eventType === "DELETE") {
              return prev.filter(
                (r) => r.id !== (payload.old as Reservation).id
              );
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

  const createReservation = async (
    giftId: string,
    reserverName: string,
    message?: string
  ) => {
    const { data, error } = await supabase
      .from("reservations")
      .insert({ gift_id: giftId, reserver_name: reserverName, message })
      .select()
      .single();
    if (error) throw error;
    return data as Reservation;
  };

  async function deleteReservation(reservationId: string) {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId);
    if (error) throw error;
  }

  return { reservations, createReservation, deleteReservation };
}
