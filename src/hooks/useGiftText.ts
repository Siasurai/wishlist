import { useTranslation } from "react-i18next";
import type { Gift } from "@/types";

export function useGiftText(gift: Gift) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("uk") ? "uk" : "ru";

  const title = gift.i18n?.[lang]?.title ?? gift.title;
  const note = gift.i18n?.[lang]?.note ?? gift.note ?? null;

  return { title, note };
}
