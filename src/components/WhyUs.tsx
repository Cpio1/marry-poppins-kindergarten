import { Apple, HeartHandshake, Languages, Puzzle, Smile, Sparkles } from "lucide-react";
import { Container } from "./ui/Basics";
import { Balloon, Cloud, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const REASONS = [
  { label: "Индивидуальный подход", icon: Smile, color: "#08AEEA" },
  { label: "Развивающие занятия", icon: Sparkles, color: "#FF9238" },
  { label: "Изучение казахского и английского языков", icon: Languages, color: "#18B52B" },
  { label: "Методика Монтессори", icon: Puzzle, color: "#EA3B94" },
  { label: "5-разовое питание", icon: Apple, color: "#F33442" },
  { label: "Заботливая атмосфера", icon: HeartHandshake, color: "#d9a900" },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative py-6 sm:py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[56px_20px_56px_20px] bg-[linear-gradient(135deg,#08AEEA,#0796cc)] px-5 py-10 text-white sm:px-10 sm:py-12">
          <Cloud className="-left-4 -top-2 h-14 w-28 opacity-20" />
          <Cloud className="-bottom-3 right-10 h-16 w-32 opacity-15" />
          <Star className="right-[6%] top-8 h-5 w-5 animate-twinkle" />
          <Balloon className="bottom-6 left-[3%] hidden h-16 w-7 animate-float md:block" color="#FFD52A" />

          <div className="relative">
            <Reveal className="text-center">
              <h2 id="why-title" className="text-2xl font-black sm:text-3xl">
                Почему выбирают Mary Poppins?
              </h2>
            </Reveal>

            <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {REASONS.map(({ label, icon: Icon, color }, i) => (
                <Reveal as="li" key={label} delay={i * 60}>
                  <div className="group flex h-full items-center gap-3 rounded-[22px_8px_22px_8px] bg-white/95 px-4 py-3 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:rounded-[8px_22px_8px_22px] hover:bg-white">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${color}1f`, color }}
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-[15px] font-bold leading-snug">{label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
