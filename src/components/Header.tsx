"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { InstagramIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { BrandDots } from "./ui/Decor";
import { Logo } from "./ui/Logo";

export function Header({ logo }: { logo: SiteImage | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid ? "bg-cream/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8 ${
            solid ? "h-16" : "h-[4.5rem] lg:h-20"
          }`}
        >
          <a
            href="#home"
            aria-label="MARY POPPINS — на главную"
            className="shrink-0 transition-opacity hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <Logo logo={logo} />
          </a>

          <nav aria-label="Основное меню" className="hidden xl:block">
            <ul className="flex items-center">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block whitespace-nowrap px-2.5 py-2 text-[14px] font-medium transition-colors duration-300 ${
                        isActive ? "text-deep" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-2.5 bottom-0.5 h-[1.5px] origin-left rounded-full bg-deep transition-transform duration-500 ease-soft ${
                          isActive ? "scale-x-100" : "scale-x-0"
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
              className="hidden h-10 items-center gap-2 rounded-full bg-deep pl-1.5 pr-4 text-[14px] font-semibold text-cream transition-colors duration-300 hover:bg-deep-dark sm:inline-flex"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/15">
                <Phone className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="whitespace-nowrap xl:hidden 2xl:inline">{SITE.phone}</span>
              <span className="hidden whitespace-nowrap xl:inline 2xl:hidden">Позвонить</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/70 transition-colors hover:bg-white xl:hidden"
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[1.5px] rounded-full bg-ink transition-all duration-300 ${open ? "w-0 opacity-0" : "w-2.5"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню: полноэкранная панель с нумерованным списком */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 bg-cream transition-[opacity,visibility] duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Мобильное меню" className="flex h-full flex-col overflow-y-auto px-5 pb-8 pt-4 sm:px-8">
          <ul className="border-t border-line">
            {NAV.map((item, i) => (
              <li
                key={item.id}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-soft ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3.5"
                >
                  <span className="w-6 font-display text-xs font-bold text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`font-display text-[1.35rem] font-bold tracking-[-0.01em] ${
                      active === item.id ? "text-deep" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href={SITE.phoneHref}
              onClick={() => setOpen(false)}
              className="flex h-13 items-center justify-center gap-2 rounded-full bg-deep px-5 py-3.5 font-semibold text-cream"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phone}
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-[15px] font-semibold"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#1f9e55]" />
                WhatsApp
              </a>
              <a
                href={SITE.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-[15px] font-semibold"
              >
                <InstagramIcon className="h-4.5 w-4.5 text-pink-ink" />
                Instagram
              </a>
            </div>
            <BrandDots className="mx-auto mt-6 flex w-max" />
          </div>
        </nav>
      </div>
    </header>
  );
}
