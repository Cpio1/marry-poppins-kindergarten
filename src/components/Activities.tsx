import { Gem, Globe, MessagesSquare, Puzzle } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Spark } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

/** Линейная иллюстрация Монтессори: «розовая башня» из кубиков и шар */
function MontessoriArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={`draw ${className}`}>
      {[
        [40, 92, 80, 22],
        [50, 70, 60, 22],
        [58, 52, 44, 18],
        [65, 38, 30, 14],
      ].map(([x, y, w, h]) => (
        <path key={y} pathLength={1} d={`M${x} ${y}h${w}v${h}h-${w}Z`} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      ))}
      <circle pathLength={1} cx="130" cy="98" r="15" stroke="currentColor" strokeWidth="1.6" />
      <path pathLength={1} d="M10 114h140" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Линейная иллюстрация соляной комнаты: кристаллы */
function CrystalArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={`draw ${className}`}>
      <path pathLength={1} d="M52 112 38 62l20-30 20 30-14 50Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path pathLength={1} d="M38 62h40M58 32v80" stroke="currentColor" strokeWidth="1.2" />
      <path pathLength={1} d="M92 112 82 80l16-22 16 22-10 32Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path pathLength={1} d="M82 80h32M98 58v54" stroke="currentColor" strokeWidth="1.2" />
      <path pathLength={1} d="M120 112l-6-18 10-12 10 12-6 18Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path pathLength={1} d="M20 112h124" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Activities() {
  return (
    <section id="activities" className="relative py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          index="04"
          tone="coral"
          eyebrow="Занятия"
          title="Развиваем таланты с детства"
          text="В MARY POPPINS дети получают новые знания, развивают свои способности и знакомятся с окружающим миром через интересные занятия."
        />

        <ul className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {/* Казахский язык */}
          <Reveal as="li" className="lg:col-span-7">
            <article className="grain group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[var(--radius-leaf)] bg-green p-8 sm:min-h-[340px] sm:p-10">
              <span
                aria-hidden
                className="absolute right-7 top-[5.5rem] font-display text-[2.9rem] font-extrabold leading-none tracking-[-0.03em] text-green-ink/25 transition-transform duration-1000 ease-soft group-hover:-translate-x-2 sm:right-12 sm:top-10 sm:text-[5.5rem]"
              >
                Сәлем!
              </span>
              <CardHead index="01" icon={<MessagesSquare className="h-5 w-5" strokeWidth={1.7} aria-hidden />} />
              <div className="mt-auto max-w-sm pt-16">
                <h3 className="font-display text-[1.5rem] font-extrabold tracking-[-0.015em] text-ink sm:text-[1.75rem]">Казахский язык</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">
                  Знакомство с государственным языком и развитие языковых навыков.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Английский язык */}
          <Reveal as="li" delay={100} className="lg:col-span-5">
            <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[var(--shadow-soft)] sm:min-h-[340px] sm:p-10">
              <span
                aria-hidden
                className="absolute right-7 top-[5.5rem] font-display text-[2.9rem] font-extrabold leading-none tracking-[-0.03em] text-coral/70 transition-transform duration-1000 ease-soft group-hover:-translate-x-2 sm:top-10 sm:text-[4.5rem]"
              >
                Hello!
              </span>
              <CardHead index="02" icon={<Globe className="h-5 w-5" strokeWidth={1.7} aria-hidden />} />
              <div className="mt-auto max-w-sm pt-16">
                <h3 className="font-display text-[1.5rem] font-extrabold tracking-[-0.015em] text-ink sm:text-[1.75rem]">Английский язык</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">Первые шаги в изучении английского языка.</p>
              </div>
            </article>
          </Reveal>

          {/* Монтессори — овальная карточка */}
          <Reveal as="li" delay={80} className="lg:col-span-5">
            <article className="grain relative mx-auto flex aspect-[1/1.02] max-w-[460px] flex-col items-center justify-center rounded-[50%] bg-yellow px-12 py-12 text-center sm:px-16 lg:max-w-none">
              <MontessoriArt className="w-28 text-deep sm:w-36" />
              <p className="mt-4 font-display text-[13px] font-extrabold text-yellow-ink">03</p>
              <h3 className="mt-1 flex items-center gap-2 font-display text-[1.5rem] font-extrabold tracking-[-0.015em] text-ink sm:text-[1.75rem]">
                <Puzzle className="h-5 w-5 text-yellow-ink" strokeWidth={1.7} aria-hidden />
                Монтессори
              </h3>
              <p className="mt-2 max-w-[17rem] text-base leading-relaxed text-ink-soft">
                Развитие самостоятельности, мышления и познавательных навыков.
              </p>
            </article>
          </Reveal>

          {/* Соляная комната */}
          <Reveal as="li" delay={180} className="lg:col-span-7">
            <article className="grain group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[28px_28px_160px_28px] bg-sky p-8 sm:p-10">
              <CrystalArt className="absolute right-5 top-6 w-32 text-deep/50 sm:bottom-6 sm:right-8 sm:top-auto sm:w-60" />
              <Spark className="absolute right-[30%] top-[22%] h-4 w-4 animate-drift text-coral-ink/60" />
              <Spark className="absolute right-[14%] top-[40%] h-2.5 w-2.5 text-deep/40" />
              <CardHead index="04" icon={<Gem className="h-5 w-5" strokeWidth={1.7} aria-hidden />} />
              <div className="relative mt-auto max-w-[19rem] pt-16">
                <h3 className="font-display text-[1.5rem] font-extrabold tracking-[-0.015em] text-ink sm:text-[1.75rem]">Соляная комната</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">Специальное пространство для посещения детьми.</p>
              </div>
            </article>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}

function CardHead({ index, icon, light = false }: { index: string; icon: React.ReactNode; light?: boolean }) {
  return (
    <div className="relative flex items-center gap-3">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${light ? "bg-cream/12 text-cream" : "bg-cream text-deep"} ${
          light ? "" : "shadow-[0_1px_0_var(--color-line)]"
        }`}
      >
        {icon}
      </span>
      <span className={`font-display text-[13px] font-extrabold ${light ? "text-cream/70" : "text-ink-soft"}`}>{index}</span>
    </div>
  );
}
