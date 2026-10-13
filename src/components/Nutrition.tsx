import { Apple, Cookie, EggFried, Salad, Soup } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Reveal } from "./ui/Reveal";

const MEALS = [
  { name: "Завтрак", icon: EggFried, tone: "bg-yellow" },
  { name: "Второй завтрак", note: "витаминный", icon: Apple, tone: "bg-coral/70" },
  { name: "Обед", icon: Soup, tone: "bg-green" },
  { name: "Полдник", icon: Cookie, tone: "bg-pink" },
  { name: "Ужин", icon: Salad, tone: "bg-sky" },
];

/* Точки на дуге «путь солнца» (viewBox 220×100, центр 110;95, радиус 88) */
const ARC_POINTS = [162, 126, 90, 54, 18].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { left: `${((110 + 88 * Math.cos(a)) / 220) * 100}%`, top: `${95 - 88 * Math.sin(a)}%` };
});

function MealIcon({ icon: Icon, tone, index }: { icon: (typeof MEALS)[number]["icon"]; tone: string; index: number }) {
  return (
    <span
      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${tone} text-deep ring-[6px] ring-cream transition-transform duration-700 ease-soft group-hover:-translate-y-1 group-hover:rotate-[-8deg] lg:h-20 lg:w-20`}
    >
      <Icon className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.6} aria-hidden />
      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-deep font-display text-[11px] font-extrabold text-cream">
        {index + 1}
      </span>
    </span>
  );
}

function MealLabel({ name, note }: { name: string; note?: string }) {
  return (
    <span className="block">
      <span className="block font-display text-[1.1rem] font-bold tracking-[-0.01em] text-ink lg:text-[1.15rem]">{name}</span>
      {note && <span className="mt-0.5 block text-[13px] font-medium text-coral-ink">{note}</span>}
    </span>
  );
}

export function Nutrition() {
  return (
    <section id="food" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading
          index="05"
          tone="green"
          align="center"
          eyebrow="Питание"
          title="Вкусно, полезно и с заботой"
          text="В нашем детском саду организовано 5-разовое сбалансированное питание."
        />

        {/* Десктоп: приёмы пищи на дуге дня */}
        <Reveal variant="fade" className="relative mx-auto mt-16 hidden max-w-[980px] pt-6 lg:block">
          <div className="relative aspect-[220/100]">
            <svg viewBox="0 0 220 100" fill="none" aria-hidden className="draw absolute inset-0 h-full w-full overflow-visible">
              <path
                pathLength={1}
                d="M22 95A88 88 0 0 1 198 95"
                stroke="var(--color-deep)"
                strokeOpacity=".35"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute bottom-[2%] left-[10%] -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              утро
            </span>
            <span className="absolute bottom-[2%] left-[90%] -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              вечер
            </span>

            <ol>
              {MEALS.map(({ name, note, icon, tone }, i) => (
                <li
                  key={name}
                  className="group absolute flex w-44 -translate-x-1/2 -translate-y-10 flex-col items-center text-center"
                  style={ARC_POINTS[i]}
                >
                  <MealIcon icon={icon} tone={tone} index={i} />
                  <span className="mt-2 rounded-full bg-cream px-3 py-1">
                    <MealLabel name={name} note={note} />
                  </span>
                </li>
              ))}
            </ol>

            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-center">
              <p className="font-display text-[6.5rem] font-extrabold leading-[0.85] tracking-[-0.05em] text-deep">5</p>
              <p className="mt-3 text-[15px] text-ink-soft">приёмов пищи в день</p>
            </div>
          </div>
        </Reveal>

        {/* Мобильные и планшеты: вертикальная линия дня */}
        <ol className="relative mx-auto mt-12 max-w-md lg:hidden">
          <span aria-hidden className="absolute bottom-8 left-8 top-8 w-px bg-deep/20" />
          {MEALS.map(({ name, note, icon, tone }, i) => (
            <Reveal as="li" key={name} delay={i * 70} className="group relative flex items-center gap-5 py-3">
              <MealIcon icon={icon} tone={tone} index={i} />
              <MealLabel name={name} note={note} />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
