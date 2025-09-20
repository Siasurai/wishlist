import type { Gift } from "@/types";

export const isGiftFull = (gift: Gift, reservedCount: number) => {
  return (
    gift.max_reservations != null && reservedCount >= gift.max_reservations
  );
};
