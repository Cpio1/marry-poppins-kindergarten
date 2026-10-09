import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { SITE, SITE_URL } from "@/data/site";
import { getSiteImages } from "@/lib/images";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const TITLE = "MARY POPPINS — детский сад в Алматы | Карагайлы, Наурызбайский район";
const DESCRIPTION =
  "Детский сад MARY POPPINS в Алматы (мкр Карагайлы, ул. Кали Надырова, 98/1). 4 группы для детей 2–5 лет, казахский и английский языки, Монтессори, соляная комната, 5-разовое питание. Пн–Пт 08:00–18:00.";

export function generateMetadata(): Metadata {
  const { hero, logo } = getSiteImages();
  const ogImage = hero ?? logo;

  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      "детский сад Алматы",
      "MARY POPPINS",
      "Мэри Поппинс детский сад",
      "частный детский сад Алматы",
      "детский сад Карагайлы",
      "детский сад Наурызбайский район",
      "Монтессори Алматы",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: "/",
      siteName: SITE.name,
      title: TITLE,
      description: DESCRIPTION,
      ...(ogImage && {
        images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: "Детский сад MARY POPPINS" }],
      }),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: TITLE,
      description: DESCRIPTION,
      ...(ogImage && { images: [ogImage.src] }),
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, address: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#08AEEA",
  width: "device-width",
  initialScale: 1,
};

// Структурированные данные — только реальные сведения о садике
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  telephone: "+77475498788",
  sameAs: [SITE.instagramHref],
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Кали Надырова, 98/1, микрорайон Карагайлы",
    addressLocality: "Алматы",
    addressRegion: "Наурызбайский район",
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: 43.181963, longitude: 76.844312 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={nunito.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
