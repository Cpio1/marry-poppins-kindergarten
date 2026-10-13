import { Apple, HeartHandshake, Languages, Puzzle, Smile, Sparkles } from "lucide-react";
import { Container, Eyebrow } from "./ui/Basics";
import { SoftEdge, Spark, UmbrellaLine, WindLine } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const REASONS = [
  { label: "Индивидуальный подход", icon: Smile },
  { label: "Развивающие занятия", icon: Sparkles },
  { label: "Изучение казахского и английского языков", icon: Languages },
  { label: "Методика Монтессори", icon: Puzzle },
  { label: "5-разовое питание", icon: Apple },
  { label: "Заботливая атмосфера", icon: HeartHandshake },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative">
      <SoftEdge color="var(--color-deep)" className="-mb-px" />
      <div className="relative overflow-hidden bg-deep py-20 text-cream sm:py-24 lg:py-28">
        <Reveal variant="fade" className="absolute -left-10 top-10">
          <WindLine className="w-[420px] text-cream/20" />
        </Reveal>
        <Spark className="absolute right-[6%] top-12 h-5 w-5 animate-drift text-yellow/70" />

        <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative">
            <Eyebrow tone="yellow" light>
              Наши преимущества
            </Eyebrow>
            <h2
              id="why-title"
              className="mt-4 max-w-md text-[1.85rem] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[2.35rem] lg:text-[2.6rem]"
            >
              Почему выбирают MARY POPPINS?
            </h2>
            <UmbrellaLine fill="var(--color-coral)" className="mt-10 hidden h-36 w-32 rotate-[-12deg] text-cream/80 lg:block" />
          </Reveal>

          <ol className="grid sm:grid-cols-2 sm:gap-x-10">
            {REASONS.map(({ label, icon: Icon }, i) => (
              <Reveal
                as="li"
                key={label}
                delay={i * 70}
                className="group flex items-center gap-4 border-t border-cream/15 py-5 sm:py-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-yellow transition-colors duration-500 group-hover:bg-cream group-hover:text-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="text-[16px] font-semibold leading-snug sm:text-[17px]">{label}</span>
                <span aria-hidden className="ml-auto self-start font-display text-xs font-bold text-cream/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>
            ))}
          </ol>
        </Container>
      </div>
      <SoftEdge color="var(--color-deep)" flip className="-mt-px" />
    </section>
  );
}
