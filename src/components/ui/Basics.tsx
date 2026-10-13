import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Цвет акцентной точки у подписи раздела */
const TONES = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  coral: "bg-coral",
  pink: "bg-pink",
} as const;

export type Tone = keyof typeof TONES;

/** Подпись раздела: «01 — О садике» */
export function Eyebrow({ index, children, tone = "sky", light = false }: { index?: string; children: ReactNode; tone?: Tone; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] ${
        light ? "text-cream/75" : "text-ink-soft"
      }`}
    >
      {index && (
        <span className={`font-display text-[13px] font-extrabold tracking-normal ${light ? "text-cream" : "text-deep"}`}>{index}</span>
      )}
      <span aria-hidden className={`h-2 w-2 rounded-full ${TONES[tone]}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  text,
  tone = "sky",
  align = "left",
  light = false,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: Tone;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto max-w-2xl text-center [&>p:first-child]:justify-center" : "max-w-xl"} ${className}`}>
      <Eyebrow index={index} tone={tone} light={light}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={`mt-4 text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[2.35rem] lg:text-[2.6rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed sm:text-[17px] ${light ? "text-cream/80" : "text-ink-soft"} ${center ? "mx-auto max-w-lg" : ""}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ── Кнопки ── */

export const BTN_BASE =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-soft active:scale-[0.98]";

export const BTN_PRIMARY = `${BTN_BASE} bg-deep text-cream shadow-[0_12px_28px_-14px_rgb(39_91_120/0.8)] hover:-translate-y-0.5 hover:bg-deep-dark hover:shadow-[0_18px_34px_-16px_rgb(39_91_120/0.9)]`;

export const BTN_SECONDARY = `${BTN_BASE} border border-ink/15 bg-white/60 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white`;

/** Стрелка в кружке, которая сдвигается при наведении на кнопку */
export function ButtonArrow({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`-mr-3 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ${light ? "bg-cream/15" : "bg-ink/[0.06]"}`}
    >
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}
