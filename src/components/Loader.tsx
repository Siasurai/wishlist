import { useTranslation } from "react-i18next";

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 grid place-items-center bg-[#9146ff]">
      <div className="relative">
        <div className="px-6 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            <span className="text-white/90 font-medium">{t("app.loader")}</span>
          </div>
        </div>

        <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/25 blur-3xl" />
      </div>
    </div>
  );
};
