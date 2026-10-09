import { Building2, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { MAP, SITE } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { Container, SectionHeading } from "./ui/Basics";
import { Balloon, Cloud, Star, Wave } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const DETAILS = [
  { icon: Building2, label: "Официальное название", value: SITE.legalName, color: "#08AEEA" },
  { icon: MapPin, label: "Адрес", value: SITE.address, color: "#F33442" },
  { icon: Phone, label: "Телефон", value: SITE.phone, href: SITE.phoneHref, color: "#18B52B" },
  { icon: Clock, label: "Режим работы", value: `${SITE.hours}, ${SITE.workDays}`, color: "#FF9238" },
];

const BTN =
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5";

export function Contacts() {
  return (
    <section id="contacts" className="relative bg-sky-soft/60">
      <Wave color="#ffffff" flip />
      <Cloud className="left-[4%] top-20 h-10 w-20 animate-float-slow" />
      <Star className="right-[8%] top-24 h-4 w-4 animate-twinkle" />
      <Balloon className="bottom-24 right-[2%] hidden h-16 w-7 animate-float lg:block" color="#EA3B94" />

      <Container className="relative pb-16 pt-10 sm:pb-20 sm:pt-14">
        <SectionHeading tone="berry" eyebrow="Контакты" title="Приходите в гости!" text="Будем рады ответить на ваши вопросы и познакомиться." />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="bg-white px-6 py-7 shadow-[0_16px_36px_-24px_rgba(8,120,170,0.6)] [border-radius:56px_80px_60px_90px/60px_70px_80px_64px] sm:px-9 sm:py-9">
            <address className="not-italic">
              <ul className="space-y-4">
                {DETAILS.map(({ icon: Icon, label, value, href, color }) => (
                  <li key={label} className="flex gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center [border-radius:58%_42%_52%_48%/46%_56%_44%_54%]"
                      style={{ backgroundColor: `${color}1a`, color }}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</span>
                      {href ? (
                        <a href={href} className="font-extrabold text-ink transition-colors hover:text-sky-deep">
                          {value}
                        </a>
                      ) : (
                        <span className="font-bold leading-snug text-ink">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </address>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <a href={SITE.phoneHref} className={`${BTN} rounded-full bg-sky hover:bg-sky-deep`}>
                <Phone className="h-4 w-4" aria-hidden />
                Позвонить
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} rounded-full bg-[#25D366] hover:bg-[#1ebe5b]`}
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                WhatsApp
              </a>
              <a
                href={SITE.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} rounded-full bg-[linear-gradient(45deg,#FF9238,#F33442,#EA3B94)] hover:brightness-110`}
              >
                <InstagramIcon className="h-4.5 w-4.5" />
                Instagram
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col">
            <div className="relative min-h-[320px] flex-1 overflow-hidden border-[5px] border-white [border-radius:30px_90px_36px_80px/30px_70px_36px_60px] bg-white shadow-[0_16px_36px_-24px_rgba(8,120,170,0.6)] sm:min-h-[380px]">
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
              className="mt-3 inline-flex items-center gap-1.5 self-center text-sm font-bold text-sky-deep transition-colors hover:text-ink lg:self-end"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Открыть в 2ГИС и построить маршрут
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
