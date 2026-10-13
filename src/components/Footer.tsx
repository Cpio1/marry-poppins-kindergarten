import { ArrowUp } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { Container } from "./ui/Basics";
import { BrandDots, SoftEdge, UmbrellaLine } from "./ui/Decor";
import { CurrentYear } from "./ui/CurrentYear";
import { Wordmark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  return (
    <footer className="relative mt-8">
      <SoftEdge color="var(--color-deep)" className="-mb-px" />
      <div className="relative overflow-hidden bg-deep text-cream/75">
        <Reveal variant="fade" className="absolute right-[3%] top-16 hidden lg:block">
          <UmbrellaLine className="h-48 w-40 rotate-[14deg] text-cream/15" />
        </Reveal>

        <Container className="relative pb-10 pt-14 sm:pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.2fr]">
            <div>
              <a href="#home" aria-label="MARY POPPINS — на главную" className="inline-block rounded-full bg-cream py-2 pl-2 pr-4">
                <Wordmark />
              </a>
              <p className="mt-6 max-w-xs font-display text-[1.25rem] font-bold leading-snug text-cream">{SITE.slogan}</p>
              <p className="mt-3 text-sm text-cream/70">{SITE.legalName}</p>
              <div className="mt-6 flex gap-3">
                <a
                  href={SITE.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${SITE.instagramHandle}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-deep"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Написать в WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-deep"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <nav aria-label="Навигация в подвале">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/65">Разделы</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px]">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="link-underline transition-colors hover:text-cream">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/65">Контакты</h2>
              <a
                href={SITE.phoneHref}
                className="mt-5 block font-display text-[1.5rem] font-extrabold tracking-[-0.01em] text-cream transition-colors hover:text-yellow"
              >
                {SITE.phone}
              </a>
              <p className="mt-3 text-[15px] leading-relaxed">{SITE.address}</p>
              <p className="mt-3 text-[15px]">
                {SITE.hours}, {SITE.workDays}
              </p>
              <a
                href={SITE.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[15px] text-cream transition-colors hover:text-yellow"
              >
                {SITE.instagramHandle}
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col-reverse items-center gap-5 border-t border-cream/15 pt-6 text-[13px] text-cream/70 sm:flex-row sm:justify-between">
            <p>
              © <CurrentYear /> {SITE.legalName}. Все права защищены.
            </p>
            <div className="flex items-center gap-5">
              <BrandDots />
              <a href="#home" className="group inline-flex items-center gap-2 text-cream/80 transition-colors hover:text-cream">
                Наверх
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
