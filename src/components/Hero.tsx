import { Languages, Puzzle } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { BTN_PRIMARY, BTN_SECONDARY, ButtonArrow, Container } from "./ui/Basics";
import { BrandDots, Scallop, Scene, Shape, Spark, UmbrellaLine, WindLine } from "./ui/Decor";

const FACTS = [
  { value: "2–5", unit: "лет", label: "возраст детей" },
  { value: "4", unit: "группы", label: "по возрастам" },
  { value: SITE.hours, unit: "", label: "пн – пт" },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Мягкая асимметричная форма для высоких изображений: скругляет только углы, не задевая содержимое */
const TALL_SHAPE = "34% 50% 30% 26% / 9% 10% 8% 7%";

export function Hero({ hero }: { hero: SiteImage | null }) {
  // Высокое изображение (например, вертикальная афиша) показываем целиком, в его собственных пропорциях
  const ratio = hero ? hero.width / hero.height : 0.8;
  const tall = ratio < 0.7;

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Мягкий фон: одна крупная форма, уходящая за край */}
      <Shape
        variant="drop"
        className="absolute -right-[30%] -top-[12%] h-[620px] w-[620px] text-sky/45 sm:-right-[12%] lg:-right-[6%] lg:-top-[18%] lg:h-[860px] lg:w-[860px]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        {/* Текст */}
        <div className="relative z-10 max-w-xl">
          <div className="rise flex items-center gap-3" style={d(0)}>
            <BrandDots />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Детский сад · {SITE.city}, Карагайлы
            </span>
          </div>

          <h1 className="rise mt-6 font-display font-extrabold text-deep" style={d(80)}>
            <span className="block text-[3.15rem] leading-[0.95] tracking-[-0.035em] sm:text-[4.4rem] lg:text-[5.1rem]">MARY</span>
            <span className="relative inline-block text-[3.15rem] leading-[0.95] tracking-[-0.035em] sm:text-[4.4rem] lg:text-[5.1rem]">
              POPPINS
              <Scallop now count={9} className="absolute -bottom-4 left-0.5 h-3 w-[96%] text-coral sm:-bottom-5 sm:h-4" />
            </span>
            <span className="sr-only"> — детский сад в Алматы</span>
          </h1>

          <p className="rise mt-10 font-display text-[1.35rem] font-semibold leading-snug text-ink sm:text-[1.6rem]" style={d(180)}>
            Мир счастливого детства начинается здесь
          </p>

          <p className="rise mt-4 max-w-[34rem] text-base leading-relaxed text-ink-soft sm:text-[17px]" style={d(260)}>
            {SITE.description}
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(340)}>
            <a href="#contacts" className={BTN_PRIMARY}>
              Связаться с нами
              <ButtonArrow light />
            </a>
            <a href="#about" className={BTN_SECONDARY}>
              Узнать больше
            </a>
          </div>

          <dl className="rise mt-12 grid max-w-md grid-cols-[auto_auto_auto] justify-start border-t border-line pt-6" style={d(420)}>
            {FACTS.map(({ value, unit, label }, i) => (
              <div key={label} className={i ? "border-l border-line pl-4 pr-4 sm:pl-6 sm:pr-6" : "pr-4 sm:pr-6"}>
                <dt className="sr-only">{label}</dt>
                <dd className="whitespace-nowrap font-display text-[1.15rem] font-extrabold leading-none tracking-[-0.01em] text-ink sm:text-[1.4rem]">
                  {value}
                  {unit && <span className="ml-1 text-[13px] font-bold text-ink-soft sm:text-sm">{unit}</span>}
                </dd>
                <dd aria-hidden className="mt-2 text-[12px] text-ink-soft sm:text-[13px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Композиция с фото */}
        <div
          className="relative mx-auto w-full max-w-[400px] [--hero-h:600px] sm:max-w-[480px] lg:max-w-[540px] lg:[--hero-h:720px]"
          style={tall ? { width: `min(100%, calc(var(--hero-h) * ${ratio.toFixed(4)}))` } : undefined}
        >
          <Shape
            variant="pebble"
            className="absolute -bottom-6 -left-8 h-40 w-40 animate-drift-slow text-yellow sm:-left-14 sm:h-52 sm:w-52"
            style={d(300)}
          />
          <Shape variant="leaf" className="rise-photo absolute -right-4 top-6 h-24 w-24 text-pink sm:-right-8 sm:h-32 sm:w-32" style={d(400)} />

          <div className="rise-photo parallax relative [filter:drop-shadow(0_30px_40px_rgb(39_91_120/0.18))]" style={d(150)}>
            <div
              className={`relative w-full overflow-hidden ${tall ? "" : "aspect-[4/5] [clip-path:url(#mp-organic)]"}`}
              style={tall && hero ? { aspectRatio: `${hero.width} / ${hero.height}`, borderRadius: TALL_SHAPE } : undefined}
            >
              {hero ? (
                <Image
                  src={hero.src}
                  alt="Детский сад MARY POPPINS в Алматы"
                  fill
                  priority
                  sizes={tall ? "(min-width: 1024px) 345px, 290px" : "(min-width: 1024px) 540px, (min-width: 640px) 480px, 90vw"}
                  className="object-cover"
                />
              ) : (
                <Scene variant="hero" className="absolute inset-0 h-full w-full" />
              )}
            </div>
          </div>

          {/* Тонкие линейные акценты */}
          {hero && (
            <UmbrellaLine
              now
              fill="var(--color-coral)"
              className="absolute -left-3 -top-8 h-24 w-20 rotate-[-16deg] text-deep sm:-left-10 sm:-top-10 sm:h-32 sm:w-28"
            />
          )}
          <WindLine
            now
            className={`absolute w-[70%] text-deep/70 ${tall ? "-bottom-12 -left-16 sm:-left-28" : "-left-10 bottom-[18%] sm:-left-20"}`}
            style={d(900)}
          />
          <Spark className="absolute right-[8%] top-[-4%] h-5 w-5 animate-drift text-coral-ink/70" />
          <Spark className="absolute -right-2 bottom-[30%] h-3 w-3 text-deep/40" />

          {/* Плашка с особенностями (не перекрывает высокое изображение-афишу) */}
          {!tall && (
            <div
              className="rise absolute -bottom-6 right-0 flex max-w-[15.5rem] items-center gap-3 rounded-[var(--radius-soft)] border border-white/70 bg-white/85 p-3 pr-4 shadow-[var(--shadow-lift)] backdrop-blur-md sm:-bottom-4 sm:-right-4"
              style={d(700)}
            >
              <span className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green text-green-ink ring-2 ring-white">
                  <Languages className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-yellow-ink ring-2 ring-white">
                  <Puzzle className="h-4 w-4" aria-hidden />
                </span>
              </span>
              <span className="text-[13px] leading-snug text-ink-soft">
                <span className="block font-semibold text-ink">Казахский и английский</span>
                Монтессори-занятия
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
