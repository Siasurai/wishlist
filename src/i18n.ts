import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  ru: {
    translation: {
      app: {
        title: "Мой список идей для подарков. Буду рада любому вниманию",
        loader: "Загружаю список…",
      },
      gift: {
        link: "Поглядеть на подарок",
        reserve: "Хочу подарить",
        limitReached: "Лимит достигнут",
        reservedCount: "Зарезервировано",
        remaining: "Можно зарезервировать ещё",
        times: "раз",
        cancelReservation: "Отменить",
        reservationCanceled: "Бронь отменена",
        reservedSuccess: "Успешно зарезервировано",
      },
      dialog: {
        title: "Зарезервировать: {{title}}",
        nameLabel: "Ваше имя*",
        link: "Купить например можно тут",
        msgLabel: "Сообщение (необязательно)",
        cancel: "Назад",
        submit: "Зарезервировать",
        saving: "Сохраняю…",
        desc: "Заполните имя. Сообщение — необязательно.",
        errNoName: "Введите имя",
        errLimit:
          "Похоже, лимит для этого подарка уже исчерпан 💜 Обнови список.",
        errGeneric: "Не удалось сохранить бронь",
      },
      lang: { uk: "Укр", ru: "Рус" },
    },
  },
  uk: {
    translation: {
      app: {
        title: "Мій список ідей для подарунків. Буду рада рада будь-якій увазі",
        loader: "Завантажую список...",
      },
      gift: {
        link: "Посилання на подарунок",
        reserve: "Хочу подарувати",
        limitReached: "Ліміт вичерпано",
        reservedCount: "Зарезервовано",
        remaining: "Можна зарезервувати ще",
        times: "разів",
        cancelReservation: "Скасувати",
        reservationCanceled: "Бронь скасована",
        reservedSuccess: "Успішно зарезервовано",
      },
      dialog: {
        title: "Зарезервувати: {{title}}",
        nameLabel: "Ваше ім'я*",
        link: "Купити наприклад можна тут",
        msgLabel: "Повідомлення (необов’язково)",
        cancel: "Назад",
        submit: "Зарезервувати",
        saving: "Зберігаю…",
        desc: "Заповніть ім'я. Повідомлення не є обов’язковим.",
        errNoName: "Введіть ім’я",
        errLimit:
          "Схоже, ліміт для цього подарунка вже вичерпано 💜 Оновіть список.",
        errGeneric: "Не вдалося зберегти бронь",
      },
      lang: { uk: "Укр", ru: "Рус" },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
    },
  });

export default i18n;
