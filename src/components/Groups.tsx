import { Feather, Lightbulb, Rocket, TreePine } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Spark } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const GROUPS = [
  {
    name: "Ангелочки",
    level: "Младшая группа",
    age: "Дети 2 лет",
    years: 2,
    icon: Feather,
    bg: "bg-sky",
    ink: "text-sky-ink",
    height: "lg:h-[380px]",
    offset: "mt-14 lg:mt-0",
  },
  {
    name: "Гномики",
    level: "Средняя группа",
    age: "Дети 3 лет",
    years: 3,
    icon: TreePine,
    bg: "bg-green",
    ink: "text-green-ink",
    height: "lg:h-[420px]",
    offset: "mt-0",
  },
  {
    name: "Непоседы",
    level: "Старшая группа",
    age: "Дети 4 лет",
    years: 4,
    icon: Rocket,
    bg: "bg-yellow",
    ink: "text-yellow-ink",
    height: "lg:h-[460px]",
    offset: "mt-14 lg:mt-0",
  },
  {
    name: "Умняшки",
    level: "Предшкольная группа",
    age: "Дети 5 лет",
    years: 5,
    icon: Lightbulb,
    bg: "bg-pink",
    ink: "text-pink-ink",
    height: "lg:h-[500px]",
    offset: "mt-0",
  },
];

export function Groups() {
  return (
    <section id="groups" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            tone="yellow"
            eyebrow="Группы"
            title="Наши группы"
            text="Четыре группы для детей от 2 до 5 лет."
          />
          <Reveal delay={120} className="flex items-center gap-3 text-sm text-ink-soft lg:pb-2">
            <span className="font-display font-bold text-ink">2 года</span>
            <span aria-hidden className="relative h-px w-24 bg-ink/25 sm:w-32">
              <span className="absolute -right-0.5 -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-ink/40" />
            </span>
            <span className="font-display font-bold text-ink">5 лет</span>
          </Reveal>
        </div>

        <div className="relative mt-14 lg:mt-16">
          {/* Кривая роста над арками */}
          <svg
            viewBox="0 0 1000 140"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 -top-10 hidden h-36 w-full lg:block"
          >
            <Reveal as="g" variant="fade" className="draw">
              <path
                pathLength={1}
                d="M20 132C150 128 210 120 300 98s170-40 260-56 190-28 300-36 120-6 130-6"
                stroke="var(--color-coral)"
                strokeWidth="1.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </Reveal>
          </svg>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-0 sm:gap-x-5 lg:grid-cols-4 lg:items-end lg:gap-6">
            {GROUPS.map(({ name, level, age, years, icon: Icon, bg, ink, height, offset }, i) => (
              <Reveal as="li" key={name} delay={i * 110} className={`${offset} mb-3 sm:mb-5 lg:mb-0`}>
                <article
                  className={`grain group relative flex h-[300px] flex-col items-center overflow-hidden rounded-[var(--radius-arch)] ${bg} px-4 pb-6 pt-8 text-center transition-transform duration-700 ease-soft hover:-translate-y-2 sm:h-[360px] sm:px-6 sm:pb-8 ${height}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/80 text-deep transition-transform duration-700 ease-soft group-hover:rotate-[-10deg] sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} aria-hidden />
                  </span>

                  <span
                    aria-hidden
                    className="mt-auto font-display text-[5rem] font-extrabold leading-none tracking-[-0.05em] text-deep/90 transition-transform duration-700 ease-soft group-hover:-translate-y-1 sm:text-[6.5rem] lg:text-[7.5rem]"
                  >
                    {years}
                  </span>
                  <p className={`mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] ${ink}`}>{age}</p>

                  <span aria-hidden className="my-4 h-px w-10 bg-deep/20 sm:my-5" />

                  <h3 className="font-display text-[1.2rem] font-extrabold tracking-[-0.01em] text-ink sm:text-[1.45rem]">{name}</h3>
                  <p className="mt-1 text-[13px] text-ink-soft sm:text-[15px]">{level}</p>
                </article>
              </Reveal>
            ))}
          </ul>
          <Spark className="absolute -right-2 top-0 hidden h-5 w-5 text-coral-ink/60 lg:block" />
        </div>
      </Container>
    </section>
  );
}
