import { Feather, Lightbulb, Rocket, TreePine } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Balloon, Blob, Cloud, Sparkle, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const GROUPS = [
  {
    name: "Ангелочки",
    level: "Младшая группа",
    age: "Дети 2 лет",
    icon: Feather,
    color: "#08AEEA",
    bg: "bg-sky-soft",
    shape: "60% 40% 52% 48% / 44% 40% 60% 56%",
    hover: "48% 52% 60% 40% / 40% 46% 54% 60%",
  },
  {
    name: "Гномики",
    level: "Средняя группа",
    age: "Дети 3 лет",
    icon: TreePine,
    color: "#18B52B",
    bg: "bg-leaf-soft",
    shape: "42% 58% 46% 54% / 56% 44% 56% 44%",
    hover: "56% 44% 52% 48% / 46% 56% 44% 54%",
  },
  {
    name: "Непоседы",
    level: "Старшая группа",
    age: "Дети 4 лет",
    icon: Rocket,
    color: "#FF9238",
    bg: "bg-peach-soft",
    shape: "54% 46% 40% 60% / 40% 56% 44% 60%",
    hover: "44% 56% 52% 48% / 54% 42% 58% 46%",
  },
  {
    name: "Умняшки",
    level: "Предшкольная группа",
    age: "Дети 5 лет",
    icon: Lightbulb,
    color: "#EA3B94",
    bg: "bg-rose-soft",
    shape: "40% 60% 58% 42% / 52% 42% 58% 48%",
    hover: "58% 42% 44% 56% / 44% 54% 46% 56%",
  },
];

export function Groups() {
  return (
    <section id="groups" className="relative overflow-hidden py-16 sm:py-20">
      <Balloon className="left-[3%] top-20 hidden h-16 w-7 animate-float md:block" color="#18B52B" />
      <Star className="right-[8%] top-14 h-4 w-4 animate-twinkle" color="#EA3B94" />
      <Blob className="-right-12 top-1/3 h-36 w-36 opacity-[0.1]" color="#EA3B94" variant={2} />
      <Cloud className="bottom-10 left-[6%] hidden h-9 w-18 animate-float-slow md:block" color="#e3f6fd" />
      <Sparkle className="bottom-14 right-[4%] h-4 w-4 animate-twinkle [animation-delay:.7s]" color="#FFD52A" />

      <Container>
        <SectionHeading tone="peach" eyebrow="Группы" title="Наши группы" text="Четыре группы для детей от 2 до 5 лет." />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map(({ name, level, age, icon: Icon, color, bg, shape, hover }, i) => (
            <Reveal as="li" key={name} delay={i * 90} className={i % 2 ? "lg:mt-6" : ""}>
              <article
                className={`group relative h-full overflow-hidden ${bg} px-6 pb-9 pt-9 text-center transition-all duration-700 [border-radius:var(--shape)] hover:-translate-y-1.5 hover:[border-radius:var(--shape-hover)]`}
                style={{ "--shape": shape, "--shape-hover": hover } as React.CSSProperties}
              >
                {/* Мягкое облако-фон за иконкой */}
                <svg viewBox="0 0 120 64" aria-hidden className="absolute left-1/2 top-5 h-20 w-36 -translate-x-1/2 opacity-80">
                  <path d="M28 60h68a22 22 0 0 0 3-43.8A28 28 0 0 0 46.5 9 20 20 0 0 0 16 24.6 18 18 0 0 0 28 60Z" fill="#fff" />
                </svg>
                <span
                  className="relative mx-auto flex h-14 w-14 items-center justify-center text-white shadow-lg [border-radius:58%_42%_52%_48%/46%_56%_44%_54%] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
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
