import { ArrowRight, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { Container } from "./ui/Basics";
import { Balloon, Cloud, CloudEdge, Rainbow, Sparkle, Star, UmbrellaDecor } from "./ui/Decor";
import { Logo } from "./ui/Logo";

const PHOTO_SHAPE = "58% 42% 46% 54% / 46% 52% 48% 54%";

export function Hero({ logo, hero }: { logo: SiteImage | null; hero: SiteImage | null }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e3f6fd_0%,#f3fbff_60%,#ffffff_100%)] pt-24 sm:pt-28"
    >
      {/* Плывущие облака */}
      <Cloud className="top-24 h-10 w-20 animate-drift opacity-90 [animation-delay:-8s]" />
      <Cloud className="top-[55%] h-7 w-14 animate-drift opacity-80 [animation-delay:-26s] [animation-duration:55s]" />
      <Cloud className="-left-6 top-36 hidden h-16 w-32 animate-float-slow sm:block" />
      <Star className="left-[8%] top-[68%] h-4 w-4 animate-twinkle" />
      <Star className="right-[46%] top-24 h-3.5 w-3.5 animate-twinkle [animation-delay:1s]" color="#FF9238" />
      <Sparkle className="left-[44%] bottom-24 hidden h-4 w-4 animate-twinkle [animation-delay:.5s] md:block" color="#EA3B94" />
      <Balloon className="right-[3%] top-24 hidden h-20 w-9 animate-float lg:block" color="#F33442" />
      <Balloon className="right-[7%] top-32 hidden h-16 w-7 animate-float [animation-delay:1.2s] lg:block" color="#FFD52A" />

      <Container className="relative grid items-center gap-10 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <div className="rise">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-extrabold text-sky-deep shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-berry text-berry" aria-hidden />
              Детский сад в Алматы
            </span>
          </div>

          <div className="rise" style={{ "--d": "80ms" } as React.CSSProperties}>
            <h1 className="mt-4">
              <span className="sr-only">{SITE.name} — детский сад в Алматы</span>
              <span aria-hidden className="inline-block">
                <Logo logo={logo} size="lg" />
              </span>
            </h1>
          </div>

          <div className="rise" style={{ "--d": "160ms" } as React.CSSProperties}>
            <p className="mt-4 text-xl font-extrabold leading-snug text-ink sm:text-2xl">{SITE.slogan}</p>
          </div>

          <div className="rise" style={{ "--d": "240ms" } as React.CSSProperties}>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base lg:mx-0">
              {SITE.description}
            </p>
          </div>

          <div className="rise mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ "--d": "320ms" } as React.CSSProperties}>
            <a
              href="#contacts"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 font-bold text-white shadow-[0_10px_24px_-10px_rgba(8,174,234,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-deep sm:w-auto"
            >
              <MessageCircle className="h-4.5 w-4.5" aria-hidden />
              Связаться с нами
            </a>
            <a
              href="#about"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-sun bg-white px-6 py-2.5 font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun-soft sm:w-auto"
            >
              Узнать больше
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>

        <div className="rise relative mx-auto w-full max-w-[460px]" style={{ "--d": "200ms" } as React.CSSProperties}>
          <Rainbow className="-left-6 -top-8 h-16 w-28 sm:-left-10 sm:h-20 sm:w-36" />
          <UmbrellaDecor className="-right-2 -top-6 z-10 h-16 w-14 animate-sway sm:h-20 sm:w-16" />
          <Sparkle className="-left-3 bottom-10 z-10 h-5 w-5 animate-twinkle" color="#18B52B" />

          {/* Цветной «ореол» вокруг фото */}
          <div
            aria-hidden
            className="absolute -inset-3 rotate-6 animate-morph bg-[conic-gradient(from_200deg,#08AEEA,#18B52B,#FFD52A,#FF9238,#F33442,#EA3B94,#08AEEA)] opacity-25 blur-[2px]"
            style={{ borderRadius: PHOTO_SHAPE }}
          />
          <div
            className="relative aspect-square animate-morph overflow-hidden border-[6px] border-white bg-sky-soft shadow-[0_24px_50px_-24px_rgba(8,120,170,0.55)]"
            style={{ borderRadius: PHOTO_SHAPE }}
          >
            {hero ? (
              <Image
                src={hero.src}
                alt="Детский сад Mary Poppins в Алматы"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
            ) : (
              <HeroIllustration />
            )}
          </div>

          <Cloud className="-bottom-5 -left-4 h-12 w-24 drop-shadow-[0_6px_10px_rgba(8,174,234,0.25)]" />
          <Cloud className="-bottom-2 right-6 h-9 w-16 drop-shadow-[0_6px_10px_rgba(8,174,234,0.2)]" />
        </div>
      </Container>

      <CloudEdge className="relative -mb-px" />
    </section>
  );
}

/** Иллюстрация на случай, если главного фото ещё нет */
function HeroIllustration() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#bfe9fb_0%,#e9f8fe_70%,#d8f3dc_70%,#c4ecca_100%)]">
      <Cloud className="left-[8%] top-[12%] h-12 w-24 animate-float-slow" />
      <Cloud className="right-[10%] top-[24%] h-9 w-18 animate-float [animation-delay:1s]" />
      <svg viewBox="0 0 64 64" className="absolute right-[14%] top-[8%] h-14 w-14 animate-[spin_30s_linear_infinite]">
        <circle cx="32" cy="32" r="14" fill="#FFD52A" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="30" y="4" width="4" height="10" rx="2" fill="#FFD52A" transform={`rotate(${i * 45} 32 32)`} />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-[30%] flex justify-center">
        <UmbrellaDecor className="relative! h-32 w-28 animate-float" />
      </div>
      <Balloon className="left-[16%] top-[38%] h-20 w-9 animate-float [animation-delay:.6s]" color="#EA3B94" />
      <Balloon className="right-[18%] top-[42%] h-16 w-8 animate-float [animation-delay:1.4s]" color="#FF9238" />
      <Star className="left-[30%] top-[20%] h-4 w-4 animate-twinkle" />
      <Star className="right-[34%] top-[60%] h-3 w-3 animate-twinkle [animation-delay:.8s]" color="#F33442" />
    </div>
  );
}
