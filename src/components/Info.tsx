import { Baby, CalendarCheck, CalendarX, Clock, Languages, Users, Utensils } from "lucide-react";
import { SITE } from "@/data/site";
import { Container, SectionHeading } from "./ui/Basics";
import { Cloud, Star, Wave } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const ITEMS = [
  { icon: Clock, label: "Режим работы", value: SITE.hours, color: "#08AEEA", soft: "bg-sky-soft" },
  { icon: CalendarCheck, label: "Рабочие дни", value: "Понедельник – пятница", color: "#18B52B", soft: "bg-leaf-soft" },
  { icon: CalendarX, label: "Выходные", value: "Суббота, воскресенье", color: "#F33442", soft: "bg-berry-soft" },
  { icon: Users, label: "Количество групп", value: "4", color: "#FF9238", soft: "bg-peach-soft" },
  { icon: Baby, label: "Возраст детей", value: "2–5 лет", color: "#EA3B94", soft: "bg-rose-soft" },
  { icon: Languages, label: "Язык обучения", value: "Русский", color: "#08AEEA", soft: "bg-sky-soft" },
  { icon: Utensils, label: "Питание", value: "5-разовое сбалансированное", color: "#18B52B", soft: "bg-leaf-soft" },
];

// Асимметричные скругления — у каждой карточки своя форма
const SHAPES = [
  "rounded-[28px_10px_28px_10px]",
  "rounded-[10px_28px_10px_28px]",
  "rounded-[28px_28px_10px_28px]",
  "rounded-[28px_10px_28px_28px]",
];

export function Info() {
  return (
    <section id="info" className="relative bg-sky-soft/60">
      <Wave color="#ffffff" flip />
      <Cloud className="right-[4%] top-16 h-10 w-20 animate-float-slow" />
      <Star className="left-[5%] top-24 h-4 w-4 animate-twinkle" color="#FF9238" />

      <Container className="relative py-12 sm:py-16">
        <SectionHeading tone="sky" eyebrow="Информация" title="Основные сведения" text="Всё самое важное о нашем детском саде — коротко и понятно." />

        <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {ITEMS.map(({ icon: Icon, label, value, color, soft }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 60}
              className={`md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] ${
                i === ITEMS.length - 1 ? "w-full sm:w-[calc(50%-0.5rem)]" : "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)]"
              }`}
            >
              <div
                className={`group relative h-full overflow-hidden bg-white p-4 shadow-[0_10px_30px_-20px_rgba(8,120,170,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-18px_rgba(8,120,170,0.55)] sm:p-5 ${SHAPES[i % SHAPES.length]}`}
              >
                <span aria-hidden className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${soft} transition-transform duration-500 group-hover:scale-150`} />
                <span
                  className="relative flex h-10 w-10 items-center justify-center rounded-[14px_6px_14px_6px] text-white transition-transform duration-300 group-hover:rotate-6"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="relative mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
                <p className="relative mt-0.5 text-[15px] font-extrabold leading-snug text-ink sm:text-base">{value}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Wave color="#ffffff" />
    </section>
  );
}
