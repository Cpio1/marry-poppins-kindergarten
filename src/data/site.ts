export const SITE = {
  name: "Mary Poppins",
  legalName: 'ТОО "Mary Poppins"',
  slogan: "Мир счастливого детства начинается здесь!",
  description:
    "Добро пожаловать в Mary Poppins — пространство заботы, радости и открытий, где каждый ребёнок растёт, учится и развивается в атмосфере любви и внимания.",
  city: "Алматы",
  address: "г. Алматы, Наурызбайский район, микрорайон Карагайлы, улица Кали Надырова, 98/1",
  addressShort: "ул. Кали Надырова, 98/1, мкр Карагайлы",
  phone: "+7 747 549 87 88",
  phoneHref: "tel:+77475498788",
  whatsappHref: "https://wa.me/77475498788",
  instagramHref: "https://www.instagram.com/sadik_marypoppins",
  instagramHandle: "@sadik_marypoppins",
  hours: "08:00–18:00",
  workDays: "понедельник – пятница",
  daysOff: "суббота, воскресенье",
} as const;

/** Адрес сайта для SEO (canonical, Open Graph). На Vercel берётся из переменных окружения. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Ссылка на папку Google Drive с документами.
 * Пока ссылка не предоставлена — оставьте пустой строкой, кнопка будет неактивной.
 * Пример: "https://drive.google.com/drive/folders/XXXXXXXX"
 */
export const DOCUMENTS_URL = "";

/** Точка детского сада по данным карточки организации в 2ГИС (ул. Кали Надырова, 98/1). */
export const MAP = {
  lat: 43.181963,
  lon: 76.844312,
  firmId: "9429940001093401",
  get embedUrl() {
    const options = {
      pos: { lat: this.lat, lon: this.lon, zoom: 17 },
      opt: { city: "almaty" },
      org: this.firmId,
    };
    return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
  },
  get firmUrl() {
    return `https://2gis.kz/almaty/firm/${this.firmId}`;
  },
};

export const NAV = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О садике" },
  { id: "info", label: "Информация" },
  { id: "groups", label: "Группы" },
  { id: "activities", label: "Занятия" },
  { id: "food", label: "Питание" },
  { id: "gallery", label: "Галерея" },
  { id: "documents", label: "Документы" },
  { id: "contacts", label: "Контакты" },
] as const;
