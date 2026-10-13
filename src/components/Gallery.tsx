"use client";

import { ChevronLeft, ChevronRight, Plus, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { SITE } from "@/data/site";
import type { SiteImage } from "@/lib/images";
import { InstagramIcon } from "./ui/BrandIcons";
import { Container, SectionHeading } from "./ui/Basics";
import { Spark } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

const INITIAL = 6;

const altFor = (i: number) => `Фото из жизни детского сада MARY POPPINS — ${i + 1}`;

/**
 * Форма плитки. Необычные силуэты — выборочно, остальные с мягким скруглением.
 * Маски срезают только углы, поэтому лица и важные детали в центре кадра сохраняются.
 */
function tileShape(i: number, img: SiteImage): CSSProperties {
  const portrait = img.height > img.width * 1.05;
  switch (i % 7) {
    case 0:
      // Арка: у вертикальных фото сверху обычно фон, а не лица
      return { borderRadius: portrait ? "999px 999px 24px 24px" : "120px 20px 20px 20px" };
    case 3:
      // «Галька» срезает все углы — только для вертикальных фото крупным планом
      return portrait ? { clipPath: "url(#mp-pebble)" } : { borderRadius: 20 };
    case 5:
      // «Лист»: крупное скругление только сверху слева, нижние углы почти прямые
      return { borderRadius: "80px 20px 28px 20px" };
    default:
      return { borderRadius: 20 };
  }
}

export function Gallery({ images }: { images: SiteImage[] }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const shown = useMemo(() => (expanded ? images : images.slice(0, INITIAL)), [images, expanded]);
  const hidden = images.length - shown.length;
  const [gridRef, width] = useWidth(1136);
  const columns = useMemo(() => distribute(shown, width < 640 ? 2 : 3), [shown, width]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream-deep py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="06" tone="pink" eyebrow="Галерея" title="Моменты из жизни садика" />
          <Reveal delay={120} className="md:pb-2">
            <a
              href={SITE.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[15px] font-semibold text-ink"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink text-pink-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
                <InstagramIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="link-underline">{SITE.instagramHandle}</span>
            </a>
          </Reveal>
        </div>

        {images.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            <div ref={gridRef} className="mt-14 flex items-start gap-3 sm:gap-5">
              {columns.map((col, c) => (
                <ul
                  key={c}
                  className={`flex min-w-0 flex-1 flex-col gap-3 sm:gap-5 ${columns.length === 3 && c === 1 ? "pt-16 lg:pt-24" : ""}`}
                >
                  {col.map(({ img, index: i }) => (
                    <li key={img.src}>
                      <Reveal variant="mask" delay={(i % INITIAL) * 70}>
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          aria-label={`Открыть фото ${i + 1} в увеличенном размере`}
                          className="group relative block w-full overflow-hidden bg-cream focus:outline-none focus-visible:ring-4 focus-visible:ring-deep/40"
                          style={{ aspectRatio: `${img.width} / ${img.height}`, ...tileShape(i, img) }}
                        >
                          <Image
                            src={img.src}
                            alt={altFor(i)}
                            fill
                            sizes="(min-width: 1200px) 380px, (min-width: 640px) 31vw, 46vw"
                            className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.04]"
                          />
                          <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-deep/45 via-transparent to-transparent pb-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span className="flex translate-y-2 items-center gap-2 rounded-full bg-cream/95 px-4 py-2 text-[13px] font-semibold text-deep transition-transform duration-500 ease-soft group-hover:translate-y-0">
                              <ZoomIn className="h-4 w-4" aria-hidden />
                              Открыть
                            </span>
                          </span>
                        </button>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            {hidden > 0 && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-ink/15 bg-cream px-6 text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                >
                  <Plus className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" aria-hidden />
                  Показать ещё
                  <span className="rounded-full bg-pink px-2 py-0.5 text-[12px] font-bold text-pink-ink">{hidden}</span>
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

/** Пустое состояние: композиция из фирменных форм */
function EmptyGallery() {
  return (
    <Reveal className="mt-14 grid items-center gap-10 sm:grid-cols-[1.1fr_1fr]">
      <div aria-hidden className="relative mx-auto grid w-full max-w-md grid-cols-[1.1fr_1fr] gap-4">
        <div className="grain row-span-2 aspect-[3/4] rounded-[var(--radius-arch)] bg-sky" />
        <div className="grain aspect-square rounded-full bg-yellow" />
        <div className="grain aspect-[4/3] rounded-[64px_16px_64px_16px] bg-pink" />
        <Spark className="absolute -top-3 right-4 h-5 w-5 text-coral-ink/60" />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-display text-[1.5rem] font-extrabold tracking-[-0.015em] text-ink">Фотографии скоро появятся</p>
        <p className="mt-2 text-ink-soft">
          А пока заглядывайте в наш Instagram{" "}
          <a href={SITE.instagramHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-deep underline-offset-4 hover:underline">
            {SITE.instagramHandle}
          </a>
        </p>
      </div>
    </Reveal>
  );
}

type Placed = { img: SiteImage; index: number };

/**
 * Раскладка по колонкам: каждое фото — в самую короткую колонку.
 * Фото сохраняют свои пропорции (без обрезки). Порядок первых плиток
 * не меняется при «Показать ещё», поэтому сетка не «прыгает».
 */
function distribute(images: SiteImage[], count: number) {
  const cols: Placed[][] = Array.from({ length: count }, () => []);
  // Средняя колонка начинается ниже — учитываем этот отступ
  const heights = Array.from({ length: count }, (_, c): number => (count === 3 && c === 1 ? 0.3 : 0));
  images.forEach((img, index) => {
    const c = heights.indexOf(Math.min(...heights));
    cols[c].push({ img, index });
    heights[c] += img.height / img.width + 0.05;
  });
  return cols;
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
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur transition-colors hover:bg-cream/25";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-[#10293a]/92 p-4 backdrop-blur-md sm:p-12"
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
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition-colors hover:bg-cream/25"
      >
        <X className="h-5 w-5" />
      </button>

      {count > 1 && (
        <>
          <button type="button" aria-label="Предыдущее фото" className={`${navBtn} left-2 sm:left-6`} onClick={(e) => (e.stopPropagation(), prev())}>
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Следующее фото" className={`${navBtn} right-2 sm:right-6`} onClick={(e) => (e.stopPropagation(), next())}>
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
          className="max-h-[80vh] w-auto max-w-[min(92vw,1200px)] animate-fade-in rounded-[24px] object-contain shadow-2xl"
          style={{ height: "auto" }}
        />
        <figcaption className="mt-4 font-display text-sm font-semibold tracking-[0.1em] text-cream/75">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </figcaption>
      </figure>
    </div>
  );
}
