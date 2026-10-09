/* Детские декоративные элементы: облака, звёзды, шарики, радуга, волны.
   Все они aria-hidden и не перехватывают клики. */

type DecorProps = { className?: string; color?: string };

const base = "pointer-events-none absolute select-none";

export function Cloud({ className = "", color = "#ffffff" }: DecorProps) {
  return (
    <svg viewBox="0 0 120 64" aria-hidden className={`${base} ${className}`}>
      <path
        d="M28 60h68a22 22 0 0 0 3-43.8A28 28 0 0 0 46.5 9 20 20 0 0 0 16 24.6 18 18 0 0 0 28 60Z"
        fill={color}
      />
    </svg>
  );
}

export function Star({ className = "", color = "#FFD52A" }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${base} ${className}`}>
      <path
        d="M12 2.5c.6 0 1 .4 1.3 1l2.2 4.6 5 .7c1.2.2 1.6 1.6.8 2.4l-3.7 3.6.9 5c.2 1.2-1 2.1-2.1 1.5L12 19l-4.4 2.3c-1.1.6-2.3-.3-2.1-1.5l.9-5-3.7-3.6c-.8-.8-.4-2.2.8-2.4l5-.7 2.2-4.6c.3-.6.7-1 1.3-1Z"
        fill={color}
      />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#08AEEA" }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${base} ${className}`}>
      <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0Z" fill={color} />
    </svg>
  );
}

export function Balloon({ className = "", color = "#F33442" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 90" aria-hidden className={`${base} ${className}`}>
      <path d="M20 50c-1 8 3 12 0 20s2 14 0 20" stroke="#c7d3e3" strokeWidth="1.2" fill="none" />
      <ellipse cx="20" cy="22" rx="17" ry="21" fill={color} />
      <path d="M17 42h6l-3 5Z" fill={color} />
      <ellipse cx="13" cy="14" rx="4" ry="6.5" fill="#fff" opacity=".35" transform="rotate(-20 13 14)" />
    </svg>
  );
}

export function Rainbow({ className = "" }: { className?: string }) {
  const arcs = ["#F33442", "#FF9238", "#FFD52A", "#18B52B", "#08AEEA"];
  return (
    <svg viewBox="0 0 120 64" aria-hidden className={`${base} ${className}`}>
      {arcs.map((c, i) => {
        const r = 54 - i * 8;
        return (
          <path
            key={c}
            d={`M${60 - r} 60a${r} ${r} 0 0 1 ${r * 2} 0`}
            stroke={c}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
    </svg>
  );
}

/** Зонтик Мэри Поппинс */
export function UmbrellaDecor({ className = "", color = "#EA3B94" }: DecorProps) {
  return (
    <svg viewBox="0 0 64 72" aria-hidden className={`${base} ${className}`}>
      <path d="M32 6C16 6 4 18 4 32c3-3 6.5-4 10-4s7 1 9 4c2-3 5.5-4 9-4s7 1 9 4c2-3 5.5-4 9-4s7 1 10 4C60 18 48 6 32 6Z" fill={color} />
      <path d="M32 6c-6 6-9 15-9 26M32 6c6 6 9 15 9 26" stroke="#fff" strokeOpacity=".45" strokeWidth="1.6" fill="none" />
      <path d="M32 4v58a6 6 0 0 1-12 0" stroke="#1f2a44" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Волна-разделитель между секциями */
export function Wave({ className = "", color = "#ffffff", flip = false }: DecorProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none block h-8 w-full sm:h-12 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 32c120-22 240-30 360-18s240 38 360 34 240-34 360-38 240 14 360 22v28H0Z"
        fill={color}
      />
    </svg>
  );
}

/** Цепочка облаков — граница секции */
export function CloudEdge({ className = "", color = "#ffffff" }: DecorProps) {
  return (
    <svg viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden className={`pointer-events-none block h-10 w-full sm:h-16 ${className}`}>
      <path
        d="M0 70V44c40-24 90-28 130-8 30-30 90-34 125-6 35-26 95-24 125 6 40-22 95-20 130 6 32-30 92-32 128-4 38-26 96-22 126 8 40-24 92-22 126 4 34-28 94-30 128-2 36-24 92-20 122 8 36-22 86-22 120 2 26-16 56-20 90-14 30-22 64-24 90-4V70Z"
        fill={color}
      />
    </svg>
  );
}
