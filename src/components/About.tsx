import { Building2, Heart, Lightbulb, Sparkles } from "lucide-react";
import Image from "next/image";
import { SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { Container, SectionHeading } from "./ui/Basics";
import { Cloud, Rainbow, Sparkle, Star, UmbrellaDecor } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const VALUES = [
  { icon: Lightbulb, label: "Самостоятельность", color: "bg-sun-soft text-[#c79800]" },
  { icon: Sparkles, label: "Творческое мышление", color: "bg-rose-soft text-rose" },
  { icon: Heart, label: "Уверенность в себе", color: "bg-leaf-soft text-leaf" },
];

export function About({ photo }: { photo: SiteImage | null }) {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20">
      <Star className="right-[6%] top-16 h-4 w-4 animate-twinkle" color="#08AEEA" />
      <Sparkle className="left-[4%] bottom-16 h-4 w-4 animate-twinkle [animation-delay:1s]" color="#FF9238" />

      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-md lg:order-2">
          <div aria-hidden className="absolute -right-3 -top-3 h-full w-full rounded-[46px_16px_46px_16px] bg-sun/40" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[16px_46px_16px_46px] bg-sky-soft shadow-[0_20px_40px_-22px_rgba(8,120,170,0.5)]">
            {photo ? (
              <Image
                src={photo.src}
                alt="Дети в детском саду Mary Poppins"
                fill
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#e3f6fd,#fde8f3)]">
                <Rainbow className="left-1/2 top-1/2 h-24 w-44 -translate-x-1/2 -translate-y-1/2" />
                <Cloud className="left-[10%] top-[14%] h-10 w-20 animate-float-slow" />
                <Cloud className="bottom-[12%] right-[10%] h-12 w-24 animate-float" />
              </div>
            )}
          </div>
          <UmbrellaDecor className="-bottom-6 -left-4 h-16 w-14 animate-sway" color="#08AEEA" />
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            tone="leaf"
            eyebrow="О садике"
            title={
              <>
                Место, где каждый день — <span className="text-sky">маленькое открытие</span>
              </>
            }
          />
          <Reveal delay={100}>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Mary Poppins — детский сад в Алматы, где каждый день наполнен интересными открытиями, развивающими
              занятиями и радостными моментами.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Мы создаём уютную и доброжелательную атмосферу, в которой дети развивают самостоятельность, творческое
              мышление и уверенность в себе.
            </p>
          </Reveal>

          <Reveal delay={180} as="ul" className="mt-6 flex flex-wrap gap-2">
            {VALUES.map(({ icon: Icon, label, color }) => (
              <li key={label} className={`inline-flex items-center gap-1.5 rounded-[16px_6px_16px_6px] px-3 py-1.5 text-sm font-bold ${color}`}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </li>
            ))}
          </Reveal>

          <Reveal delay={240} className="mt-6 inline-flex items-center gap-3 rounded-[22px_10px_22px_10px] border border-sky/20 bg-cream px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[12px_5px_12px_5px] bg-sky text-white">
              <Building2 className="h-4.5 w-4.5" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-semibold text-ink-soft">Официальное название</span>
              <span className="font-extrabold text-ink">{SITE.legalName}</span>
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
