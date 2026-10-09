import { Apple, Cookie, EggFried, Salad, Soup } from "lucide-react";
import { Container, SectionHeading } from "./ui/Basics";
import { Cloud, Sparkle, Star, Wave } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const MEALS = [
  { name: "Завтрак", icon: EggFried, color: "#FFD52A", ring: "#f5c400" },
  { name: "Второй завтрак", note: "витаминный", icon: Apple, color: "#F33442", ring: "#F33442" },
  { name: "Обед", icon: Soup, color: "#FF9238", ring: "#FF9238" },
  { name: "Полдник", icon: Cookie, color: "#EA3B94", ring: "#EA3B94" },
  { name: "Ужин", icon: Salad, color: "#18B52B", ring: "#18B52B" },
];

export function Nutrition() {
  return (
    <section id="food" className="relative bg-leaf-soft/60">
      <Wave color="#ffffff" flip />
      <Cloud className="right-[5%] top-20 h-10 w-20 animate-float-slow" />
      <Star className="left-[6%] top-28 h-4 w-4 animate-twinkle" color="#FF9238" />
      <Sparkle className="bottom-20 right-[10%] h-4 w-4 animate-twinkle [animation-delay:1s]" color="#08AEEA" />

      <Container className="relative py-12 sm:py-16">
        <SectionHeading
          tone="leaf"
          eyebrow="Питание"
          title="Вкусно, полезно и с заботой"
          text="В нашем детском саду организовано 5-разовое сбалансированное питание."
        />

        <ol className="relative mt-10 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {/* Пунктирная «дорожка» между приёмами пищи */}
          <span aria-hidden className="absolute left-[10%] right-[10%] top-9 hidden border-t-2 border-dashed border-leaf/30 lg:block" />
          {MEALS.map(({ name, note, icon: Icon, color, ring }, i) => (
            <Reveal
              as="li"
              key={name}
              delay={i * 80}
              className={`relative text-center ${i === MEALS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="group mx-auto flex flex-col items-center">
                <span
                  className="relative flex h-[72px] w-[72px] items-center justify-center bg-white shadow-[0_12px_24px_-14px_rgba(24,181,43,0.6)] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
                  style={{ borderRadius: "48% 52% 44% 56% / 56% 44% 56% 44%", outline: `3px solid ${ring}33`, outlineOffset: 4 }}
                >
                  <Icon className="h-8 w-8" style={{ color: color === "#FFD52A" ? "#e0a800" : color }} aria-hidden />
                  <span
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black text-white"
                    style={{ backgroundColor: color === "#FFD52A" ? "#e0a800" : color }}
                  >
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 text-base font-black text-ink">{name}</h3>
                {note && (
                  <span className="mt-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-berry">{note}</span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>

      <Wave color="#ffffff" />
    </section>
  );
}
