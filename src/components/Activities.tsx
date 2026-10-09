import { Gem, Globe, MessagesSquare, Puzzle } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Cloud, Rainbow, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const ACTIVITIES = [
  {
    title: "Казахский язык",
    text: "Знакомство с государственным языком и развитие языковых навыков.",
    icon: MessagesSquare,
    color: "#18B52B",
    soft: "bg-leaf-soft",
  },
  {
    title: "Английский язык",
    text: "Первые шаги в изучении английского языка.",
    icon: Globe,
    color: "#08AEEA",
    soft: "bg-sky-soft",
  },
  {
    title: "Монтессори",
    text: "Развитие самостоятельности, мышления и познавательных навыков.",
    icon: Puzzle,
    color: "#FF9238",
    soft: "bg-peach-soft",
  },
  {
    title: "Соляная комната",
    text: "Специальное пространство для посещения детьми.",
    icon: Gem,
    color: "#EA3B94",
    soft: "bg-rose-soft",
  },
];

export function Activities() {
  return (
    <section id="activities" className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,#fffbeb_50%,#ffffff)] py-16 sm:py-20">
      <Rainbow className="-right-6 top-10 hidden h-20 w-36 opacity-60 md:block" />
      <Cloud className="left-[2%] top-28 h-9 w-18 animate-float-slow" color="#e3f6fd" />
      <Star className="bottom-16 left-[10%] h-4 w-4 animate-twinkle" color="#18B52B" />

      <Container>
        <SectionHeading
          tone="sun"
          eyebrow="Занятия"
          title="Развиваем таланты с детства"
          text="В Mary Poppins дети получают новые знания, развивают свои способности и знакомятся с окружающим миром через интересные занятия."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {ACTIVITIES.map(({ title, text, icon: Icon, color, soft }, i) => (
            <Reveal as="li" key={title} delay={i * 80}>
              <article
                className={`group relative flex h-full items-start gap-4 overflow-hidden border-2 border-transparent bg-white p-5 shadow-[0_12px_30px_-22px_rgba(31,42,68,0.45)] transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                  i % 2 ? "rounded-[14px_44px_14px_44px]" : "rounded-[44px_14px_44px_14px]"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[inherit] border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ borderColor: `${color}55` }}
                />
                <span className={`relative flex h-14 w-14 shrink-0 items-center justify-center ${soft} rounded-[50%_50%_45%_55%/55%_45%_55%_45%] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" style={{ color }} aria-hidden />
                </span>
                <div className="relative">
                  <h3 className="text-lg font-black text-ink">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
