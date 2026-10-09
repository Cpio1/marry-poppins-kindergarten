import { Feather, Lightbulb, Rocket, TreePine } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Balloon, Sparkle, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const GROUPS = [
  {
    name: "Ангелочки",
    level: "Младшая группа",
    age: "Дети 2 лет",
    icon: Feather,
    color: "#08AEEA",
    bg: "bg-sky-soft",
    shape: "60px 18px 60px 18px",
  },
  {
    name: "Гномики",
    level: "Средняя группа",
    age: "Дети 3 лет",
    icon: TreePine,
    color: "#18B52B",
    bg: "bg-leaf-soft",
    shape: "18px 60px 18px 60px",
  },
  {
    name: "Непоседы",
    level: "Старшая группа",
    age: "Дети 4 лет",
    icon: Rocket,
    color: "#FF9238",
    bg: "bg-peach-soft",
    shape: "60px 60px 18px 60px",
  },
  {
    name: "Умняшки",
    level: "Предшкольная группа",
    age: "Дети 5 лет",
    icon: Lightbulb,
    color: "#EA3B94",
    bg: "bg-rose-soft",
    shape: "60px 18px 60px 60px",
  },
];

export function Groups() {
  return (
    <section id="groups" className="relative overflow-hidden py-16 sm:py-20">
      <Balloon className="left-[3%] top-20 hidden h-16 w-7 animate-float md:block" color="#18B52B" />
      <Star className="right-[8%] top-14 h-4 w-4 animate-twinkle" color="#EA3B94" />
      <Sparkle className="bottom-14 right-[4%] h-4 w-4 animate-twinkle [animation-delay:.7s]" color="#FFD52A" />

      <Container>
        <SectionHeading tone="peach" eyebrow="Группы" title="Наши группы" text="Четыре группы для детей от 2 до 5 лет." />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map(({ name, level, age, icon: Icon, color, bg, shape }, i) => (
            <Reveal as="li" key={name} delay={i * 90} className={i % 2 ? "lg:mt-6" : ""}>
              <article
                className={`group relative h-full overflow-hidden ${bg} px-5 pb-6 pt-7 text-center transition-all duration-500 hover:-translate-y-1.5`}
                style={{ borderRadius: shape }}
              >
                {/* Мягкое облако-фон за иконкой */}
                <svg viewBox="0 0 120 64" aria-hidden className="absolute left-1/2 top-3 h-20 w-36 -translate-x-1/2 opacity-80">
                  <path d="M28 60h68a22 22 0 0 0 3-43.8A28 28 0 0 0 46.5 9 20 20 0 0 0 16 24.6 18 18 0 0 0 28 60Z" fill="#fff" />
                </svg>
                <span
                  className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-[22px_10px_22px_10px] text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ backgroundColor: color, boxShadow: `0 10px 20px -10px ${color}` }}
                >
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-xl font-black" style={{ color }}>
                  {name}
                </h3>
                <p className="relative mt-1 text-[15px] font-bold text-ink">{level}</p>
                <p
                  className="relative mx-auto mt-3 inline-block rounded-full bg-white px-3 py-1 text-sm font-extrabold"
                  style={{ color }}
                >
                  {age}
                </p>
                <span aria-hidden className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full opacity-15 transition-transform duration-500 group-hover:scale-125" style={{ backgroundColor: color }} />
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
