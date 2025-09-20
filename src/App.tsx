import { useMemo, useState } from "react";
import { useGifts } from "./hooks/useGifts";
import { useReservations } from "./hooks/useReservations";
import type { Gift } from "./types";
import { ReserveGiftDialog } from "@/components/ReserveGiftDialog";
import { GiftsCarousel } from "@/components/GiftsCarousel";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/Loader";

export default function App() {
  const { gifts, loading } = useGifts();
  const { reservations, createReservation } = useReservations();
  const [activeGift, setActiveGift] = useState<Gift | null>(null);

  const { t } = useTranslation();

  const countByGift = useMemo(() => {
    const map = new Map<string, number>();
    for (const reservation of reservations) {
      map.set(reservation.gift_id, (map.get(reservation.gift_id) || 0) + 1);
    }
    return map;
  }, [reservations]);

  if (loading) {
    return (
      <div className="w-full bg-[#9146ff] mx-auto p-4 md:p-6 min-h-dvh h-full overflow-hidden">
        <div className="grid">
          <h1 className="page-title">WISHLIST</h1>
          <span className="text-sm text-white text-center italic mb-10">
            {t("app.title")}
          </span>
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#9146ff] mx-auto p-4 md:p-6 min-h-dvh h-full overflow-hidden">
      <div className="grid">
        <h1 className="page-title">WISHLIST</h1>
        <span className="text-sm text-white text-center italic mb-20 sm:mb-10">
          {t("app.title")}
        </span>
      </div>
      <GiftsCarousel
        items={gifts.map((gift) => ({
          gift,
          reservedCount: countByGift.get(gift.id) || 0,
        }))}
        onReserve={setActiveGift}
      />

      <ReserveGiftDialog
        open={!!activeGift}
        gift={activeGift}
        onClose={() => setActiveGift(null)}
        createReservation={createReservation}
      />
      <Toaster position="top-center" richColors />
    </div>
  );
}
