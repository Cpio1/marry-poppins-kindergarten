import { ArrowUpRight, FileText } from "lucide-react";
import { DOCUMENTS_URL } from "@/data/site";
import { BTN_PRIMARY, Container, Eyebrow } from "./ui/Basics";
import { Scallop } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

export function Documents() {
  const hasLink = DOCUMENTS_URL.trim().length > 0;

  return (
    <section id="documents" className="relative py-20 sm:py-24">
      <Container>
        <Reveal className="grain relative overflow-hidden rounded-[var(--radius-large)] bg-yellow/70 px-6 py-10 sm:px-12 sm:py-12 lg:px-16">
          {/* Стопка «листов» — декоративная */}
          <div aria-hidden className="pointer-events-none absolute -right-6 -top-10 hidden h-56 w-44 rotate-[10deg] rounded-[20px] border border-deep/10 bg-cream/60 lg:block" />
          <div aria-hidden className="pointer-events-none absolute -right-2 -top-4 hidden h-56 w-44 rotate-[3deg] rounded-[20px] border border-deep/10 bg-cream/80 lg:block">
            <span className="absolute left-6 right-10 top-10 h-1.5 rounded-full bg-deep/10" />
            <span className="absolute left-6 right-16 top-[3.25rem] h-1.5 rounded-full bg-deep/10" />
            <span className="absolute left-6 right-12 top-[4.25rem] h-1.5 rounded-full bg-deep/10" />
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream text-deep sm:flex">
                <FileText className="h-6 w-6" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <Eyebrow index="07" tone="yellow">
                  Официально
                </Eyebrow>
                <h2 className="mt-3 text-[1.85rem] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[2.2rem]">Документы</h2>
                <p className="mt-2 max-w-md text-base leading-relaxed text-ink-soft">
                  Ознакомьтесь с официальными документами нашего детского сада.
                </p>
                <Scallop count={6} className="mt-4 h-3 w-28 text-deep/40" />
              </div>
            </div>

            <div className="lg:pr-44">
              {hasLink ? (
                <a href={DOCUMENTS_URL} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                  Посмотреть документы
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <button
                    type="button"
                    disabled
                    aria-describedby="documents-soon"
                    className="inline-flex min-h-12 cursor-not-allowed items-center gap-2.5 rounded-full bg-deep/45 px-6 text-[15px] font-semibold text-cream"
                  >
                    Посмотреть документы
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </button>
                  <span id="documents-soon" className="text-[13px] text-ink-soft">
                    Ссылка на документы скоро появится
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
