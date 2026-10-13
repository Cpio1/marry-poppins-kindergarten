/* Авторская система декоративных элементов MARY POPPINS.
   Мотивы: зонтик и ветер Мэри Поппинс, фестон купола зонта,
   цветной «веер» из логотипа и мягкие органические формы.
   Все элементы aria-hidden и не перехватывают клики. */

type DecorProps = { className?: string; style?: React.CSSProperties };

const base = "pointer-events-none select-none";

/** Цвета логотипа по порядку букв */
export const BRAND_COLORS = ["#08AEEA", "#18B52B", "#FFD52A", "#FF9238", "#F33442", "#EA3B94"];

/** Фирменный знак: купол зонта-«веер» из шести цветов логотипа */
export function BrandMark({ className = "" }: { className?: string }) {
  const cx = 24;
  const cy = 24;
  const r = 19;
  const pt = (deg: number, rad = r) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy - rad * Math.sin(a)).toFixed(2)}`;
  };
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`${base} ${className}`}>
      {BRAND_COLORS.map((c, i) => {
        const a0 = 180 - i * 30;
        const a1 = a0 - 30;
        return <path key={c} d={`M${cx} ${cy}L${pt(a0)}A${r} ${r} 0 0 1 ${pt(a1)}Z`} fill={c} />;
      })}
      {/* Фестон по краю купола */}
      <path
        d="M5 24q3.17 3 6.33 0t6.34 0 6.33 0 6.33 0 6.34 0 6.33 0"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="2.2"
      />
      <path d="M24 23.5V39a3.5 3.5 0 0 1-7 0" fill="none" stroke="#275B78" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** Определения масок для фотографий (clip-path: url(#mp-…)) */
export function MaskDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        {/* Мягкий органический силуэт — главное фото */}
        <clipPath id="mp-organic" clipPathUnits="objectBoundingBox">
          <path d="M.53.006C.75.012.93.11.975.33c.045.21.03.43-.07.58C.81 1.05.6 1.01.42.996.24.98.08.92.03.74-.02.55.01.33.1.18.19.04.35.002.53.006Z" />
        </clipPath>
        {/* «Галька» — вытянутая асимметричная форма */}
        <clipPath id="mp-pebble" clipPathUnits="objectBoundingBox">
          <path d="M.06.22C.14.06.34 0 .56.01.8.02.97.12.99.38c.02.24-.03.44-.15.55C.72 1.01.5 1 .3.98.12.96.01.86 0 .64-.01.48 0 .34.06.22Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Линия ветра — тонкий росчерк с петлёй (рисуется при появлении) */
export function WindLine({ className = "", style, now = false }: DecorProps & { now?: boolean }) {
  return (
    <svg viewBox="0 0 320 90" fill="none" aria-hidden className={`${base} ${now ? "draw-now" : "draw"} ${className}`} style={style}>
      <path
        pathLength={1}
        d="M2 70C52 74 96 64 134 46c30-14 58-34 82-30 22 4 24 30 4 34-20 4-30-18-14-34 22-22 64-14 112-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Короткие параллельные линии ветра */
export function Breeze({ className = "", now = false }: DecorProps & { now?: boolean }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden className={`${base} ${now ? "draw-now" : "draw"} ${className}`}>
      <path pathLength={1} d="M4 10c24-6 46 6 72 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path pathLength={1} d="M26 22c26-6 52 6 90 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path pathLength={1} d="M10 34c18-4 34 4 52 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Фестон — край купола зонта, используется как тонкий разделитель */
export function Scallop({ className = "", count = 7, now = false }: DecorProps & { count?: number; now?: boolean }) {
  const w = 20;
  const d = `M1 2${Array.from({ length: count }, () => `q${w / 2} 14 ${w} 0`).join("")}`;
  return (
    <svg viewBox={`0 0 ${count * w + 2} 14`} fill="none" aria-hidden className={`${base} ${now ? "draw-now" : "draw"} ${className}`}>
      <path pathLength={1} d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Тонкая четырёхлучевая искра */
export function Spark({ className = "", style }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${base} ${className}`} style={style}>
      <path d="M12 1c.7 6.2 4.8 10.3 11 11-6.2.7-10.3 4.8-11 11-.7-6.2-4.8-10.3-11-11C7.2 11.3 11.3 7.2 12 1Z" fill="currentColor" />
    </svg>
  );
}

/** Линейный зонтик (контурная иллюстрация) */
export function UmbrellaLine({ className = "", fill = "none", now = false }: DecorProps & { fill?: string; now?: boolean }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" aria-hidden className={`${base} ${now ? "draw-now" : "draw"} ${className}`}>
      <path d="M8 62C10 30 34 8 60 8s50 22 52 54q-6.5-9-13-0t-13 0-13 0-13 0-13 0-13 0-13 0-13 0Z" fill={fill} />
      <path
        pathLength={1}
        d="M8 62C10 30 34 8 60 8s50 22 52 54q-6.5-9-13 0t-13 0-13 0-13 0-13 0-13 0-13 0-13 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path pathLength={1} d="M60 8c-12 12-18 32-18 54M60 8c12 12 18 32 18 54" stroke="currentColor" strokeWidth="1.4" />
      <path pathLength={1} d="M60 2v118a9 9 0 0 1-18 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Органические формы для фона и композиций */
const SHAPES = {
  drop: "M112 14c38 6 70 34 76 72 6 40-14 82-52 98-36 16-84 10-110-18C4 140 2 98 18 66 36 30 74 8 112 14Z",
  pebble: "M30 72c10-34 50-54 92-52 40 2 70 26 72 60 2 36-30 70-74 78-44 8-86-10-94-42-3-14 0-30 4-44Z",
  leaf: "M24 150C14 100 36 46 84 24c44-20 96-6 104 30 8 38-22 70-50 94-28 24-64 40-90 32-12-4-20-14-24-30Z",
  cloud: "M38 128c-24 0-34-28-16-44-6-30 26-50 50-34 14-30 62-30 74 4 30-6 46 28 26 46 12 24-8 46-32 38-14 20-46 18-58 0-14 10-34 6-44-10Z",
} as const;

export function Shape({
  className = "",
  style,
  variant = "drop",
  color = "currentColor",
}: DecorProps & { variant?: keyof typeof SHAPES; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={`${base} ${className}`} style={style}>
      <path d={SHAPES[variant]} fill={color} />
    </svg>
  );
}

/** Ряд из шести точек в цветах логотипа */
export function BrandDots({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center gap-1 ${className}`}>
      {BRAND_COLORS.map((c) => (
        <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
      ))}
    </span>
  );
}

/** Плавный край секции (одна мягкая кривая вместо «облачков») */
export function SoftEdge({ className = "", color = "currentColor", flip = false }: { className?: string; color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden
      className={`${base} block h-8 w-full sm:h-12 lg:h-16 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 64V40C240 8 480 0 720 14s480 40 720 10v40Z" fill={color} />
    </svg>
  );
}

/**
 * Иллюстрация вместо фотографии (пока фото не загружено).
 * Пастельный пейзаж и Мэри Поппинс-зонтик, летящий на ветру.
 */
export function Scene({ variant = "hero", className = "" }: { variant?: "hero" | "about"; className?: string }) {
  const hero = variant === "hero";
  return (
    <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden className={`${base} ${className}`}>
      <rect width="400" height="480" fill={hero ? "#CDEBF5" : "#F8F2E7"} />
      <circle cx={hero ? 300 : 110} cy={hero ? 120 : 130} r="52" fill="#F7E5A6" />
      <circle cx={hero ? 300 : 110} cy={hero ? 120 : 130} r="74" fill="none" stroke="#F7E5A6" strokeWidth="1.5" strokeDasharray="2 7" />
      <path d="M-10 350c80-40 170-34 250-12 64 18 116 14 170-6v160H-10Z" fill="#D9EBCF" />
      <path d="M-10 404c96-34 188-24 268-4 58 14 104 12 152 0v92H-10Z" fill={hero ? "#F4D8E5" : "#F3B7A7"} opacity=".85" />
      <path d="M-10 446c120-22 260-18 420 4v40H-10Z" fill="#FFFCF6" opacity=".7" />
      <g fill="none" stroke="#275B78" strokeLinecap="round" opacity=".55">
        <path d="M30 150c40-10 70 8 108-2" strokeWidth="1.6" />
        <path d="M56 172c30-6 54 6 84 0" strokeWidth="1.6" />
        <path d="M250 250c30-8 56 6 92-2" strokeWidth="1.6" />
      </g>
      {hero ? (
        <g transform="rotate(-14 180 190)">
          <path d="M108 200c4-48 38-82 76-82s72 34 76 82q-9.5-12-19 0t-19 0-19 0-19 0-19 0-19 0-19 0-19 0Z" fill="#F3B7A7" />
          <path
            d="M108 200c4-48 38-82 76-82s72 34 76 82q-9.5-12-19 0t-19 0-19 0-19 0-19 0-19 0-19 0-19 0"
            fill="none"
            stroke="#275B78"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M184 118c-18 18-28 48-28 82M184 118c18 18 28 48 28 82" fill="none" stroke="#275B78" strokeWidth="1.6" />
          <path d="M184 110v170a12 12 0 0 1-24 0" fill="none" stroke="#275B78" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <path d="M210 330V210a50 50 0 0 1 100 0v120Z" fill="#FFFCF6" />
          <path d="M210 330V210a50 50 0 0 1 100 0v120" fill="none" stroke="#275B78" strokeWidth="2.4" />
          <path d="M228 330V214a32 32 0 0 1 64 0v116" fill="#D8F0F8" />
          <path d="M260 182v148M228 262h64" stroke="#275B78" strokeWidth="1.6" />
        </g>
      )}
      <path d="M330 300c1.4 12 8 18.6 20 20-12 1.4-18.6 8-20 20-1.4-12-8-18.6-20-20 12-1.4 18.6-8 20-20Z" fill="#275B78" opacity=".5" />
      <path d="M70 250c1 8 5.4 12.4 13 13.4-7.6 1-12 5.4-13 13.4-1-8-5.4-12.4-13-13.4 7.6-1 12-5.4 13-13.4Z" fill="#F3B7A7" />
    </svg>
  );
}
