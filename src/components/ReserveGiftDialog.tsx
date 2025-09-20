import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Gift } from "@/types";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type Props = {
  open: boolean;
  gift: Gift | null;
  onClose: () => void;
  createReservation: (
    giftId: string,
    name: string,
    message?: string
  ) => Promise<any>;
};

export function ReserveGiftDialog({
  open,
  gift,
  onClose,
  createReservation,
}: Props) {
  const { t } = useTranslation();

  const [name, setName] = React.useState("");
  const [msg, setMessage] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setName("");
      setMessage("");
      setError(null);
      setPending(false);
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!gift) return;
    if (!name.trim()) {
      setError(t("dialog.errNoName"));
      return;
    }
    setError(null);
    setPending(true);

    try {
      await createReservation(gift.id, name.trim(), msg.trim() || undefined);

      toast(t("gift.reservedSuccess"), {
        description: (
          <span>
            {gift.url && (
              <>
                <a
                  href={gift.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  {t("gift.link")}
                </a>
              </>
            )}
          </span>
        ),
      });

      onClose();
    } catch (event: any) {
      if (event?.message?.includes("limit") || event?.code === "P0001") {
        setError(t("dialog.errLimit"));
        toast.error(t("dialog.errLimit"));
      } else {
        const msg = event?.message ?? t("dialog.errGeneric");
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {gift
              ? t("dialog.title", { title: gift.title })
              : t("dialog.submit")}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {gift?.url && (
          <a
            href={gift.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4 text-blue-600"
          >
            {t("gift.link")}
          </a>
        )}

        <div className="space-y-3 mt-3">
          <div className="grid gap-1">
            <label className="text-sm font-medium">
              {t("dialog.nameLabel")}
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose} disabled={pending}>
              {t("dialog.cancel")}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleConfirm} disabled={pending}>
              {pending ? t("dialog.saving") : t("dialog.submit")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
