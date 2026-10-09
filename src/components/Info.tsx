import { Baby, CalendarCheck, CalendarX, Clock, Languages, Users, Utensils } from "lucide-react";
import { SITE } from "@/data/site";
import { Container, PEBBLE, SectionHeading } from "./ui/Basics";
import { Blob, Cloud, Rainbow, Star, Wave } from "./ui/Decor";
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

// Асимметричные «облачные» формы карточек
const INFO_SHAPES = [
  "34% 66% 40% 60% / 30% 36% 30% 34%",
  "62% 38% 58% 42% / 36% 30% 34% 30%",
  "44% 56% 36% 64% / 34% 34% 28% 36%",
  "58% 42% 62% 38% / 30% 38% 36% 30%",
];
// Положение «пушистой макушки» над карточкой
const CAPS = ["left-[14%]", "right-[12%]", "left-1/2 -translate-x-1/2", "left-[22%]"];

export function Info() {
  return (
    <section id="info" className="relative bg-sky-soft/60">
      <Wave color="#ffffff" flip />
      <Cloud className="right-[4%] top-16 h-10 w-20 animate-float-slow" />
      <Star className="left-[5%] top-24 h-4 w-4 animate-twinkle" color="#FF9238" />
      <Blob className="-left-10 bottom-16 h-32 w-32 opacity-[0.12]" color="#FFD52A" variant={1} />
      <Rainbow className="bottom-14 right-[3%] hidden h-10 w-20 opacity-50 md:block" />

      <Container className="relative py-12 sm:py-16">
        <SectionHeading tone="sky" eyebrow="Информация" title="Основные сведения" text="Всё самое важное о нашем детском саде — коротко и понятно." />

        <ul className="mt-12 flex flex-wrap justify-center gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10">
          {ITEMS.map(({ icon: Icon, label, value, color, soft }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 60}
              className={`md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] ${
                i === ITEMS.length - 1 ? "w-full sm:w-[calc(50%-0.5rem)]" : "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)]"
              }`}
            >
              {/* Карточка-облачко: мягкая форма + «пушистая» макушка; тень повторяет силуэт */}
              <div className="group relative h-full transition-transform duration-500 [filter:drop-shadow(0_10px_18px_rgba(8,120,170,0.16))] hover:-translate-y-1">
                <Cloud className={`-top-5 h-10 w-20 sm:-top-6 sm:h-12 sm:w-24 ${CAPS[i % CAPS.length]}`} />
                <div
                  className="relative flex h-full flex-col items-center overflow-hidden bg-white px-4 pb-6 pt-7 text-center sm:px-5"
                  style={{ borderRadius: INFO_SHAPES[i % INFO_SHAPES.length] }}
                >
                  {/* Мягкое пятно цвета карточки */}
                  <span
                    aria-hidden
                    className={`absolute -bottom-6 -right-6 h-16 w-20 ${soft} transition-transform duration-500 group-hover:scale-150`}
                    style={{ borderRadius: PEBBLE }}
                  />
                  <span
                    className="relative flex h-11 w-11 items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12"
                    style={{ backgroundColor: color, borderRadius: PEBBLE }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="relative mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
                  <p className="relative mt-0.5 text-[15px] font-extrabold leading-snug text-ink sm:text-base">{value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Wave color="#ffffff" />
    </section>
  );
}
