import { Heart, Lightbulb, Sparkles } from "lucide-react";
import Image from "next/image";
import { SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { Container, SectionHeading } from "./ui/Basics";
import { BrandMark, Scene, Shape, Spark, WindLine } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const VALUES = [
  { icon: Lightbulb, label: "Самостоятельность", tone: "bg-yellow text-yellow-ink" },
  { icon: Sparkles, label: "Творческое мышление", tone: "bg-pink text-pink-ink" },
  { icon: Heart, label: "Уверенность в себе", tone: "bg-green text-green-ink" },
];

/** Круглая «печать» с текстом по окружности */
function Stamp({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center rounded-full bg-cream shadow-[var(--shadow-soft)] ${className}`}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="stamp-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <text className="fill-deep font-display text-[10px] font-bold uppercase" letterSpacing="2.6">
          <textPath href="#stamp-circle">MARY POPPINS · детский сад ·</textPath>
        </text>
      </svg>
      <BrandMark className="relative h-10 w-10" />
    </div>
  );
}

export function About({ photo }: { photo: SiteImage | null }) {
  return (
    <section id="about" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Фото-арка */}
        <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
          <Shape variant="leaf" className="absolute -bottom-8 -right-10 h-48 w-48 text-green sm:h-60 sm:w-60" />
          <Reveal variant="mask" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-arch)] bg-cream-deep">
              {photo ? (
                <Image
                  src={photo.src}
                  alt="Дети в детском саду MARY POPPINS"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover transition-transform duration-[1.6s] ease-soft hover:scale-[1.03]"
                />
              ) : (
                <Scene variant="about" className="absolute inset-0 h-full w-full" />
              )}
            </div>
          </Reveal>
          <Stamp className="absolute -left-4 bottom-10 h-28 w-28 sm:-left-12 sm:h-32 sm:w-32" />
          <Spark className="absolute -top-3 right-6 h-5 w-5 text-coral-ink/60" />
        </div>

        {/* Текст */}
        <div className="relative">
          <SectionHeading
            index="01"
            tone="green"
            eyebrow="О садике"
            title={
              <>
                Место, где каждый день — <span className="text-deep">маленькое открытие</span>
              </>
            }
          />
          <Reveal variant="fade" delay={150}>
            <WindLine className="mt-2 w-48 text-coral" />
          </Reveal>

          <Reveal delay={100} className="mt-4 max-w-xl space-y-4 text-base leading-relaxed text-ink-soft sm:text-[17px]">
            <p>
              MARY POPPINS — детский сад в Алматы, где каждый день наполнен интересными открытиями, развивающими
              занятиями и радостными моментами.
            </p>
            <p>
              Мы создаём уютную и доброжелательную атмосферу, в которой дети развивают самостоятельность, творческое
              мышление и уверенность в себе.
            </p>
          </Reveal>

          <Reveal as="ul" delay={180} className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-soft)] border border-line bg-line sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, label, tone }) => (
              <li key={label} className="flex items-center gap-3 bg-cream px-4 py-4 sm:flex-col sm:items-start sm:gap-4 sm:px-5 sm:py-5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span className="font-display text-[15px] font-bold leading-snug text-ink">{label}</span>
              </li>
            ))}
          </Reveal>

          <Reveal delay={240} className="mt-8 flex items-center gap-4 text-sm text-ink-soft">
            <span aria-hidden className="h-px w-10 bg-ink/25" />
            <span>
              Официальное название — <span className="font-semibold text-ink">{SITE.legalName}</span>
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
