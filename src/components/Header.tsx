"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { Logo } from "./ui/Logo";

const DOT_COLORS = ["bg-sky", "bg-leaf", "bg-sun", "bg-berry", "bg-peach", "bg-rose", "bg-sky", "bg-leaf", "bg-peach"];

export function Header({ logo }: { logo: SiteImage | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_6px_24px_-12px_rgba(8,174,234,0.35)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" aria-label="Mary Poppins — на главную" className="shrink-0 transition-transform hover:scale-[1.03]" onClick={() => setOpen(false)}>
          <Logo logo={logo} />
        </a>

        <nav aria-label="Основное меню" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative block rounded-full px-2.5 py-1.5 text-[13.5px] font-bold transition-colors ${
                      isActive ? "text-sky-deep" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all duration-300 ${DOT_COLORS[i]} ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 rounded-[18px_8px_18px_8px] bg-sky px-3.5 py-2 text-sm font-bold text-white shadow-[0_6px_16px_-6px_rgba(8,174,234,0.7)] transition-all hover:-translate-y-0.5 hover:bg-sky-deep sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 items-center justify-center rounded-[14px_6px_14px_6px] bg-sky-soft text-sky-deep transition-colors hover:bg-sky hover:text-white xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out xl:hidden ${
          open ? "max-h-[calc(100dvh-4rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Мобильное меню" className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-5 sm:px-6">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {NAV.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-[18px_8px_18px_8px] px-3.5 py-2.5 text-[15px] font-bold transition-colors ${
                    active === item.id ? "bg-sky-soft text-sky-deep" : "bg-cream text-ink hover:bg-sky-soft"
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${DOT_COLORS[i]}`} aria-hidden />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SITE.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-[20px_8px_20px_8px] bg-sky px-4 py-3 font-bold text-white sm:hidden"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Позвонить: {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
