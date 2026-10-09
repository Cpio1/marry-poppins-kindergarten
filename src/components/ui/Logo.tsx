import Image from "next/image";
import type { SiteImage } from "@/lib/images";

const LETTER_COLORS = ["#08AEEA", "#18B52B", "#FF9238", "#F33442", "#EA3B94", "#FFD52A"];

/** Разноцветное название в стиле логотипа (используется, если в public/images нет logo.*). */
export function ColorfulName({ text = "Mary Poppins", className = "" }: { text?: string; className?: string }) {
  let n = 0;
  return (
    <span className={`font-black tracking-tight ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;
        const color = LETTER_COLORS[n++ % LETTER_COLORS.length];
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            // Жёлтые буквы плохо читаются на белом — добавляем тонкую обводку
            style={{ color, WebkitTextStroke: color === "#FFD52A" ? "0.6px #e0a800" : undefined }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

export function Logo({ logo, size = "sm" }: { logo: SiteImage | null; size?: "sm" | "lg" }) {
  if (logo) {
    const height = size === "lg" ? 120 : 44;
    const width = Math.round((logo.width / logo.height) * height);
    return (
      <Image
        src={logo.src}
        alt="Логотип детского сада Mary Poppins"
        width={width}
        height={height}
        priority={size === "sm"}
        className="h-auto w-auto object-contain"
        style={{ height, width: "auto", maxWidth: "100%" }}
      />
    );
  }

  return (
    <span className="relative inline-flex items-center">
      <svg viewBox="0 0 120 64" aria-hidden className={size === "lg" ? "absolute -left-6 -top-4 h-14 w-24 opacity-90" : "absolute -left-3 -top-2 h-8 w-14"}>
        <path d="M28 60h68a22 22 0 0 0 3-43.8A28 28 0 0 0 46.5 9 20 20 0 0 0 16 24.6 18 18 0 0 0 28 60Z" fill="#d6f2fc" />
      </svg>
      <ColorfulName className={`relative ${size === "lg" ? "text-4xl sm:text-5xl" : "text-xl"}`} />
    </span>
  );
}
