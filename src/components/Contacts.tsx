import { ArrowUpRight, Building2, Clock, MapPin, Phone } from "lucide-react";
import { MAP, SITE } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { BTN_PRIMARY, BTN_SECONDARY, Container, SectionHeading } from "./ui/Basics";
import { Shape, Spark } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const DETAILS = [
  { icon: MapPin, label: "Адрес", value: SITE.address, tone: "bg-coral/60 text-coral-ink" },
  { icon: Clock, label: "Режим работы", value: `${SITE.hours}, ${SITE.workDays}`, tone: "bg-yellow text-yellow-ink" },
  { icon: Building2, label: "Официальное название", value: SITE.legalName, tone: "bg-sky text-sky-ink" },
];

export function Contacts() {
  return (
    <section id="contacts" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="08"
            tone="coral"
            eyebrow="Контакты"
            title="Приходите в гости!"
            text="Будем рады ответить на ваши вопросы и познакомиться."
          />

          <Reveal delay={80} className="mt-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">Телефон</p>
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-block font-display text-[1.9rem] font-extrabold tracking-[-0.02em] text-deep transition-colors hover:text-deep-dark sm:text-[2.4rem]"
            >
              <span className="link-underline">{SITE.phone}</span>
            </a>
          </Reveal>

          <Reveal as="address" delay={140} className="mt-8 not-italic">
            <ul>
              {DETAILS.map(({ icon: Icon, label, value, tone }) => (
                <li key={label} className="flex gap-4 border-t border-line py-5">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
                    <span className="mt-1 block text-base font-semibold leading-snug text-ink">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={SITE.phoneHref} className={BTN_PRIMARY}>
              <Phone className="h-4 w-4" aria-hidden />
              Позвонить
            </a>
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#1f9e55]" />
              WhatsApp
            </a>
            <a href={SITE.instagramHref} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
              <InstagramIcon className="h-[18px] w-[18px] text-pink-ink" />
              Instagram
            </a>
          </Reveal>
        </div>

        <div className="relative flex flex-col">
          <Shape variant="pebble" className="absolute -right-16 -top-12 h-56 w-56 text-pink sm:-right-20" />
          <Spark className="absolute -left-3 top-8 hidden h-5 w-5 text-coral-ink/60 lg:block" />
          <Reveal variant="scale" delay={120} className="relative flex flex-1 flex-col">
            <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-[160px_28px_28px_28px] border border-line bg-white shadow-[var(--shadow-lift)] sm:min-h-[420px] lg:min-h-[480px]">
              <iframe
                src={MAP.embedUrl}
                title={`Карта: ${SITE.name}, ${SITE.addressShort}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAP.firmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 self-start text-[15px] font-semibold text-deep lg:self-end"
            >
              <span className="link-underline">Открыть в 2ГИС и построить маршрут</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
