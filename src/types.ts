export type Gift = {
  id: string;
  title: string;
  url: string | undefined;
  image_url?: string | null;
  note?: string | null;
  max_reservations?: number | null;
  created_at: string;
  i18n?: Record<string, { title?: string; note?: string }>;
};

export type Reservation = {
  id: string;
  gift_id: string;
  reserver_name: string;
  message?: string | null;
  created_at: string;
};
