"use client";

import { ChevronLeft, ChevronRight, Images, Plus, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/lib/images";
import { Container, SectionHeading } from "./ui/Basics";
import { Cloud, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const INITIAL = 6;
// Мягкие асимметричные формы, чередуются по кругу
const SHAPES = [
  "32px 12px 32px 12px",
  "12px 32px 12px 32px",
  "32px 32px 12px 32px",
  "40% 40% 24px 24px / 18% 18% 24px 24px",
  "32px 12px 32px 32px",
  "24px 24px 40% 40% / 24px 24px 18% 18%",
];

const altFor = (i: number) => `Фото из жизни детского сада Mary Poppins — ${i + 1}`;

export function Gallery({ images }: { images: SiteImage[] }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const shown = expanded ? images : images.slice(0, INITIAL);
  const hidden = images.length - shown.length;

  return (
    <section id="gallery" className="relative overflow-hidden py-16 sm:py-20">
      <Cloud className="-left-4 top-24 h-12 w-24 animate-float-slow" color="#e3f6fd" />
      <Star className="right-[6%] top-16 h-4 w-4 animate-twinkle" color="#F33442" />

      <Container>
        <SectionHeading tone="rose" eyebrow="Галерея" title="Моменты из жизни садика" />

        {images.length === 0 ? (
          <Reveal className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-[40px_14px_40px_14px] bg-rose-soft px-6 py-10 text-center">
            <Images className="h-10 w-10 text-rose" aria-hidden />
            <p className="font-semibold text-ink-soft">Фотографии скоро появятся</p>
          </Reveal>
        ) : (
          <>
            {/* Единая сетка: object-cover сохраняет пропорции (без растягивания), полное фото — в просмотре */}
            <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {shown.map((img, i) => (
                <li key={img.src}>
                  <Reveal delay={(i % INITIAL) * 60} className="h-full">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Открыть фото ${i + 1} в увеличенном размере`}
                      className="group relative block aspect-square w-full overflow-hidden bg-sky-soft shadow-[0_14px_28px_-20px_rgba(31,42,68,0.55)] transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/40"
                      style={{ borderRadius: SHAPES[i % SHAPES.length] }}
                    >
                      <Image
                        src={img.src}
                        alt={altFor(i)}
                        fill
                        sizes="(min-width: 1024px) 330px, (min-width: 768px) 32vw, 48vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-sky-deep/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-sky-deep">
                          <ZoomIn className="h-5 w-5" aria-hidden />
                        </span>
                      </span>
                    </button>
                  </Reveal>
                </li>
              ))}
            </ul>

            {hidden > 0 && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="group inline-flex items-center gap-2 rounded-[22px_8px_22px_8px] border-2 border-rose/30 bg-white px-6 py-2.5 font-bold text-rose transition-all duration-300 hover:-translate-y-0.5 hover:rounded-[8px_22px_8px_22px] hover:bg-rose-soft"
                >
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" aria-hidden />
                  Показать ещё
                  <span className="text-sm font-semibold text-ink-soft">({hidden})</span>
                </button>
              </div>
            )}
          </>
        )}
      </Container>

      {active !== null && (
        <Lightbox images={images} index={active} onChange={setActive} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: SiteImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const img = images[index];

  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);

  const navBtn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-[#0b2233]/90 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
      >
        <X className="h-5 w-5" />
      </button>

      {count > 1 && (
        <>
          <button type="button" aria-label="Предыдущее фото" className={`${navBtn} left-2 sm:left-5`} onClick={(e) => (e.stopPropagation(), prev())}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Следующее фото" className={`${navBtn} right-2 sm:right-5`} onClick={(e) => (e.stopPropagation(), next())}>
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <figure className="relative flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          key={img.src}
          src={img.src}
          alt={altFor(index)}
          width={img.width}
          height={img.height}
          sizes="100vw"
          className="max-h-[80vh] w-auto max-w-[min(92vw,1200px)] animate-fade-in rounded-[28px_10px_28px_10px] object-contain shadow-2xl"
          style={{ height: "auto" }}
        />
        <figcaption className="mt-3 text-sm font-semibold text-white/80">
          {index + 1} / {count}
        </figcaption>
      </figure>
    </div>
  );
}
