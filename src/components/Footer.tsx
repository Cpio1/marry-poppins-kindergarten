import { Clock, MapPin, Phone } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { InstagramIcon } from "./ui/BrandIcons";
import { Container } from "./ui/Basics";
import { CloudEdge, Star } from "./ui/Decor";
import { CurrentYear } from "./ui/CurrentYear";
import { ColorfulName } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="relative bg-[#0b2a3d] text-white/80">
      <CloudEdge color="#0b2a3d" className="absolute bottom-full left-0 -mb-px" />
      <Star className="right-[8%] top-10 h-3.5 w-3.5 animate-twinkle" />
      <Star className="left-[45%] top-20 h-3 w-3 animate-twinkle [animation-delay:1.2s]" color="#08AEEA" />

      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr]">
        <div>
          <a href="#home" className="inline-block rounded-[18px_8px_18px_8px] bg-white px-3 py-1.5">
            <ColorfulName className="text-xl" />
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{SITE.slogan}</p>
          <p className="mt-2 text-sm font-semibold text-white/60">{SITE.legalName}</p>
        </div>

        <nav aria-label="Навигация в подвале">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Разделы</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-sun">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Контакты</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden />
              <a href={SITE.phoneHref} className="font-bold text-white transition-colors hover:text-sun">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry" aria-hidden />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-peach" aria-hidden />
              <span>
                {SITE.hours}, {SITE.workDays}
              </span>
            </li>
            <li className="flex gap-2">
              <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
              <a href={SITE.instagramHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-sun">
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-4 text-center text-xs text-white/60">
          © <CurrentYear /> {SITE.legalName}. Все права защищены.
        </Container>
      </div>
    </footer>
  );
}
