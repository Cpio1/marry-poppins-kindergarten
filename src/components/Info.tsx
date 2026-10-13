import { Baby, CalendarCheck, CalendarX, Clock, Languages, Users, Utensils } from "lucide-react";
import { SITE } from "@/data/site";
import { Container, SectionHeading } from "./ui/Basics";
import { Breeze, Spark } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const ITEMS = [
  { icon: CalendarCheck, label: "Рабочие дни", value: "Понедельник – пятница", tone: "bg-green text-green-ink" },
  { icon: CalendarX, label: "Выходные", value: "Суббота, воскресенье", tone: "bg-coral/60 text-coral-ink" },
  { icon: Users, label: "Количество групп", value: "4", tone: "bg-sky text-sky-ink" },
  { icon: Baby, label: "Возраст детей", value: "2–5 лет", tone: "bg-pink text-pink-ink" },
  { icon: Languages, label: "Язык обучения", value: "Русский", tone: "bg-yellow text-yellow-ink" },
  { icon: Utensils, label: "Питание", value: "5-разовое сбалансированное", tone: "bg-green text-green-ink" },
];

export function Info() {
  return (
    <section id="info" className="relative bg-cream-deep py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            index="02"
            tone="sky"
            eyebrow="Информация"
            title="Основные сведения"
            text="Всё самое важное о нашем детском саде — коротко и понятно."
          />

          {/* Овальная карточка: режим работы */}
          <Reveal variant="scale" delay={120} className="relative mt-12 max-w-[420px]">
            <div className="grain relative flex aspect-[6/5] flex-col items-center justify-center rounded-[50%] bg-sky px-10 text-center">
              <Breeze className="absolute left-[12%] top-[18%] w-16 text-deep/40" />
              <Spark className="absolute bottom-[20%] right-[14%] h-4 w-4 text-deep/40" />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-deep">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-sky-ink">Режим работы</p>
              <p className="mt-2 font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.02em] text-deep sm:text-[2.75rem]">
                {SITE.hours}
              </p>
              <p className="mt-3 text-[15px] text-ink-soft">{SITE.workDays}</p>
            </div>
          </Reveal>
        </div>

        {/* Список сведений */}
        <ul className="grid content-center sm:grid-cols-2 sm:gap-x-10">
          {ITEMS.map(({ icon: Icon, label, value, tone }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 70}
              className={`flex items-start gap-4 border-t border-ink/10 py-6`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</p>
                <p className="mt-1.5 font-display text-[1.3rem] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[1.45rem]">
                  {value}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
