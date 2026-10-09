import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

const EYEBROW_COLORS = {
  sky: "bg-sky-soft text-sky-deep",
  leaf: "bg-leaf-soft text-leaf",
  sun: "bg-sun-soft text-[#a97f00]",
  berry: "bg-berry-soft text-berry",
  peach: "bg-peach-soft text-[#d96a12]",
  rose: "bg-rose-soft text-rose",
} as const;

/**
 * Органические формы (border-radius в формате «горизонтальные / вертикальные» радиусы).
 * Мягкие, но не слишком сильные — чтобы не срезать текст и изображения.
 */
export const SOFT_SHAPES = [
  "42px 64px 38px 70px / 46px 40px 58px 50px",
  "70px 40px 64px 42px / 52px 58px 40px 46px",
  "56px 56px 36px 72px / 44px 60px 44px 56px",
  "38px 72px 56px 56px / 58px 44px 56px 40px",
  "64px 42px 70px 40px / 40px 54px 46px 58px",
  "48px 68px 44px 60px / 60px 42px 54px 44px",
  "72px 48px 40px 62px / 50px 46px 60px 42px",
];

/** Форма маленьких «камешков» для иконок */
export const PEBBLE = "58% 42% 52% 48% / 46% 56% 44% 54%";

export type Tone = keyof typeof EYEBROW_COLORS;

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "sky",
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: Tone;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <span
        className={`inline-block rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider ${EYEBROW_COLORS[tone]}`}
      >
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-black leading-tight text-ink sm:text-3xl lg:text-[2.1rem]">{title}</h2>
      {text && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">{text}</p>}
    </Reveal>
  );
}
