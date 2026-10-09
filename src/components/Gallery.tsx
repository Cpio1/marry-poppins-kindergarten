"use client";

import { ChevronLeft, ChevronRight, Images, Plus, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SiteImage } from "@/lib/images";
import { Container, SectionHeading } from "./ui/Basics";
import { Balloon, Blob, Cloud, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const INITIAL = 6;
// Разнообразные мягкие формы: «облачка», арки, «пузырь-реплика», чередуются по кругу
const SHAPES = [
  "48px 80px 52px 72px / 56px 48px 70px 60px",
  "50% 50% 36px 36px / 34% 34% 36px 36px",
  "80px 44px 72px 56px / 52px 66px 48px 70px",
  "64px 64px 64px 16px / 56px 56px 56px 16px",
  "36px 36px 50% 50% / 36px 36px 34% 34%",
  "72px 52px 80px 48px / 60px 70px 50px 64px",
];

const altFor = (i: number) => `Фото из жизни детского сада MARY POPPINS — ${i + 1}`;

export function Gallery({ images }: { images: SiteImage[] }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const shown = useMemo(() => (expanded ? images : images.slice(0, INITIAL)), [images, expanded]);
  const hidden = images.length - shown.length;
  const [gridRef, width] = useWidth(1024);
  const layout = useMemo(() => justify(shown, width), [shown, width]);

  return (
    <section id="gallery" className="relative overflow-hidden py-16 sm:py-20">
      <Cloud className="-left-4 top-24 h-12 w-24 animate-float-slow" color="#e3f6fd" />
      <Star className="right-[6%] top-16 h-4 w-4 animate-twinkle" color="#F33442" />
      <Blob className="-right-14 bottom-20 h-40 w-40 opacity-[0.08]" color="#18B52B" variant={1} />
      <Balloon className="left-[3%] bottom-24 hidden h-14 w-6 animate-float lg:block" color="#08AEEA" />

      <Container>
        <SectionHeading tone="rose" eyebrow="Галерея" title="Моменты из жизни садика" />

        {images.length === 0 ? (
          <Reveal className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 bg-rose-soft px-8 py-12 [border-radius:60px_90px_70px_100px/70px_60px_90px_60px] text-center">
            <Images className="h-10 w-10 text-rose" aria-hidden />
            <p className="font-semibold text-ink-soft">Фотографии скоро появятся</p>
          </Reveal>
        ) : (
          <>
            {/* Ряды «по ширине»: каждое фото в своих настоящих пропорциях — без растягивания и обрезки */}
            <div ref={gridRef} className="mx-auto mt-10 flex max-w-5xl flex-col" style={{ gap: layout.gap }}>
              {layout.rows.map((row) => (
                <ul key={row.start} className="flex justify-center" style={{ gap: layout.gap }}>
                  {row.items.map((img, k) => {
                    const i = row.start + k;
                    return (
                      <li key={img.src} className="shrink-0" style={{ width: (img.width / img.height) * row.height, height: row.height }}>
                        <Reveal delay={(i % INITIAL) * 60} className="h-full">
                          <button
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Открыть фото ${i + 1} в увеличенном размере`}
                            className={`group relative block h-full w-full overflow-hidden bg-sky-soft shadow-[0_14px_28px_-20px_rgba(31,42,68,0.55)] transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/40 ${
                              i % 2 ? "hover:-rotate-1" : "hover:rotate-1"
                            }`}
                            style={{ borderRadius: SHAPES[i % SHAPES.length] }}
                          >
                            <Image
                              src={img.src}
                              alt={altFor(i)}
                              fill
                              sizes="(min-width: 1024px) 420px, (min-width: 640px) 40vw, 60vw"
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
                    );
                  })}
                </ul>
              ))}
            </div>

            {hidden > 0 && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-rose/30 bg-white px-6 py-2.5 font-bold text-rose transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-soft"
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

type Row = { start: number; items: SiteImage[]; height: number };

/** Раскладка по рядам: каждый полный ряд точно заполняет ширину контейнера. */
function justify(images: SiteImage[], width: number) {
  const target = width < 640 ? 170 : width < 900 ? 230 : 290;
  const gap = width < 640 ? 10 : 16;
  const rows: Row[] = [];
  let start = 0;
  let items: SiteImage[] = [];
  let ratioSum = 0;

  images.forEach((img, i) => {
    items.push(img);
    ratioSum += img.width / img.height;
    const available = width - gap * (items.length - 1);
    if (ratioSum * target >= available) {
      rows.push({ start, items, height: available / ratioSum });
      start = i + 1;
      items = [];
      ratioSum = 0;
    }
  });

  if (items.length) {
    const available = width - gap * (items.length - 1);
    // Последний ряд: если почти заполнен — растягиваем по ширине, иначе центрируем
    const fill = ratioSum * target >= available * 0.75;
    rows.push({ start, items, height: fill ? available / ratioSum : target });
  }
  return { rows, gap };
}

function useWidth(fallback: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
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
          className="max-h-[80vh] w-auto max-w-[min(92vw,1200px)] animate-fade-in rounded-[32px_48px_36px_52px/40px_34px_46px_38px] object-contain shadow-2xl"
          style={{ height: "auto" }}
        />
        <figcaption className="mt-3 text-sm font-semibold text-white/80">
          {index + 1} / {count}
        </figcaption>
      </figure>
    </div>
  );
}
