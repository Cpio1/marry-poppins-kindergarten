import { ExternalLink, FileText } from "lucide-react";
import { DOCUMENTS_URL } from "@/data/site";
import { Container } from "./ui/Basics";
import { Cloud, Sparkle, Star } from "./ui/Decor";
import { Reveal } from "./ui/Reveal";

export function Documents() {
  const hasLink = DOCUMENTS_URL.trim().length > 0;

  return (
    <section id="documents" className="relative py-10 sm:py-14">
      <Container>
        <Reveal className="relative mx-auto max-w-3xl overflow-hidden bg-sun-soft px-8 py-12 text-center [border-radius:90px_60px_110px_70px/70px_90px_60px_100px] sm:px-14">
          <Cloud className="-right-4 -top-2 h-14 w-28 opacity-90" />
          <Cloud className="-bottom-4 -left-6 h-12 w-24 opacity-90" />
          <Star className="left-[10%] top-8 h-4 w-4 animate-twinkle" color="#FF9238" />
          <Sparkle className="bottom-8 right-[12%] h-4 w-4 animate-twinkle [animation-delay:.6s]" color="#EA3B94" />

          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-peach [border-radius:58%_42%_52%_48%/46%_56%_44%_54%] shadow-[0_10px_20px_-12px_rgba(255,146,56,0.8)]">
              <FileText className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-4 text-2xl font-black text-ink sm:text-3xl">Документы</h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-soft sm:text-base">
              Ознакомьтесь с официальными документами нашего детского сада.
            </p>

            {hasLink ? (
              <a
                href={DOCUMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-peach px-7 py-3 font-bold text-white shadow-[0_12px_24px_-12px_rgba(255,146,56,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f27d1d]"
              >
                Посмотреть документы
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            ) : (
              <div className="mt-6 flex flex-col items-center gap-2">
                <button
                  type="button"
                  disabled
                  aria-describedby="documents-soon"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-peach/60 px-7 py-3 font-bold text-white"
                >
                  Посмотреть документы
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </button>
                <span id="documents-soon" className="text-xs font-semibold text-ink-soft">
                  Ссылка на документы скоро появится
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
