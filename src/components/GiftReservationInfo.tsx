import type { Gift } from "@/types";
import { useTranslation } from "react-i18next";

type ReservationInfoProps = {
  gift: Gift;
  reservedCount: number;
};

export const GiftReservationInfo = ({
  gift,
  reservedCount,
}: ReservationInfoProps) => {
  if (!gift.max_reservations || gift.max_reservations <= 1) return null;
  const { t } = useTranslation();

  const limit = gift.max_reservations;
  const remaining = Math.max(0, limit - reservedCount);

  return (
    <p className="text-sm text-muted-foreground">
      {t("gift.remaining")} <b>{remaining}</b> {t("gift.times")}
    </p>
  );
};
