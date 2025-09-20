import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Gift } from "@/types";
import { GiftReservationInfo } from "./GiftReservationInfo";
import { useTranslation } from "react-i18next";
import { useGiftText } from "@/hooks/useGiftText";

export function GiftCard({
  gift,
  reservedCount,
  onReserve,
}: {
  gift: Gift;
  reservedCount: number;
  onReserve: (gift: Gift) => void;
}) {
  const { t } = useTranslation();
  const limit = gift.max_reservations ?? Infinity;
  const isFull = reservedCount >= limit;
  const { title, note } = useGiftText(gift);

  return (
    <Card className={isFull ? "opacity-70 cursor-not-allowed" : ""}>
      {gift.image_url && (
        <img
          src={gift.image_url}
          alt={gift.title}
          className="w-full h-40 object-contain rounded-t-lg"
        />
      )}
      <div className="grid gap-4 h-full content-between">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {note && <p className="text-sm text-muted-foreground">{note}</p>}
        </CardHeader>

        <CardContent className="text-center">
          {gift.url && (
            <a
              href={gift.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline underline-offset-4 text-[#9146ff] hover:text-[#9146ff]"
            >
              {t("gift.link")}
            </a>
          )}

          <GiftReservationInfo gift={gift} reservedCount={reservedCount} />

          <Button
            onClick={() => onReserve(gift)}
            disabled={isFull}
            className="w-full"
          >
            {isFull ? "Уже зарезервировано" : t("gift.reserve")}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
