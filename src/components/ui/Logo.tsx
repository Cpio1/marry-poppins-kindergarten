import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { BrandMark } from "./Decor";

/** Текстовый логотип: фирменный знак-зонтик + название заглавными. */
export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className="h-9 w-9 shrink-0" />
      <span
        className={`font-display text-[17px] font-extrabold leading-none tracking-[0.06em] ${light ? "text-cream" : "text-deep"}`}
      >
        MARY POPPINS
      </span>
    </span>
  );
}

export function Logo({ logo }: { logo: SiteImage | null }) {
  if (logo) {
    const height = 44;
    const width = Math.round((logo.width / logo.height) * height);
    return (
      <Image
        src={logo.src}
        alt="Логотип детского сада MARY POPPINS"
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain"
        style={{ height, width: "auto", maxWidth: "100%" }}
      />
    );
  }

  return <Wordmark />;
}
