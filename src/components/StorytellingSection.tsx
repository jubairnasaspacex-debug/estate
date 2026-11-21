import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHITECTURAL_CHAPTERS } from '../data/developments';
import { prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const panelImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalPanels = ARCHITECTURAL_CHAPTERS.length;

      const tween = gsap.to(track, {
        xPercent: -((totalPanels - 1) * 100) / totalPanels,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.75,
          end: () => `+=${window.innerWidth * (totalPanels - 1) * 0.75}`,
          onUpdate: (self) => {
            const idx = Math.min(
              totalPanels - 1,
              Math.max(0, Math.round(self.progress * (totalPanels - 1))),
            );
            setActiveIndex(idx);
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;

      // Subtle ken-burns horizontal parallax on each panel plate
      panelImagesRef.current.forEach((imgWrap) => {
        if (!imgWrap) return;
        gsap.fromTo(
          imgWrap,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imgWrap,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });

      return () => {
        triggerRef.current = null;
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleChapterSelect = (idx: number, indexCode: string) => {
    setActiveIndex(idx);
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && triggerRef.current) {
      const st = triggerRef.current;
      const targetY = st.start + (st.end - st.start) * (idx / (ARCHITECTURAL_CHAPTERS.length - 1));
      window.scrollTo({ top: targetY, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    const panelEl = document.getElementById(`chapter-panel-${indexCode}`);
    if (panelEl) {
      panelEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
    }
  };

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative bg-[#141413] text-[#F6F3EC] overflow-hidden"
    >
      {/* Top Pinned Header Bar */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-16 lg:pt-20 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
              03. Architectural Storytelling
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.08]">
              Anatomy of Permanence
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2" aria-label="Architectural chapters">
            {ARCHITECTURAL_CHAPTERS.map((chapter, idx) => (
              <button
                key={chapter.index}
                type="button"
                onClick={() => handleChapterSelect(idx, chapter.index)}
                className={`px-3 py-1.5 font-mono text-xs tabular-nums transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B4F] ${
                  activeIndex === idx
                    ? 'bg-[#9A7B4F] text-[#141413] font-medium'
                    : 'border border-[#F6F3EC]/20 text-[#D6CEC0] hover:border-[#9A7B4F]'
                }`}
              >
                {chapter.index}
              </button>
            ))}
          </div>
        </div>

        {/* Scrubbed Horizontal Chapter Progress Rail */}
        <div className="relative h-px w-full bg-[#F6F3EC]/15 overflow-hidden">
          <div
            ref={progressRef}
            className="hidden lg:block h-full w-full origin-left bg-[#9A7B4F]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Desktop Horizontal Track */}
      <div className="hidden lg:block overflow-hidden">
        <div
          ref={trackRef}
          style={{ width: `${ARCHITECTURAL_CHAPTERS.length * 100}%` }}
          className="flex"
        >
          {ARCHITECTURAL_CHAPTERS.map((chapter, idx) => (
            <div key={chapter.index} className="w-screen shrink-0 px-12 pb-20 pt-4">
              <div className="mx-auto max-w-[1344px] grid grid-cols-12 gap-12 items-center">
                <div className="col-span-7 overflow-hidden">
                  <div
                    ref={(el) => {
                      panelImagesRef.current[idx] = el;
                    }}
                    className="will-change-transform"
                  >
                    <ArchitecturalImage
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      title={chapter.title}
                      className="aspect-[16/10] w-full border border-[#F6F3EC]/15"
                    />
                  </div>
                  <p className="mt-3 font-serif italic text-xs text-[#A69F93]">
                    {chapter.figureCaption}
                  </p>
                </div>

                <div className="col-span-5">
                  <p className="font-mono text-xs tracking-[0.18em] uppercase text-[#9A7B4F]">
                    Chapter {chapter.index} · {chapter.subtitle}
                  </p>
                  <h3 className="mt-4 font-serif text-4xl xl:text-5xl font-normal leading-tight text-[#F6F3EC]">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-[#D6CEC0]">
                    {chapter.description}
                  </p>

                  <div className="mt-10 border-t border-[#F6F3EC]/15 pt-6">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#A69F93]">
                      {chapter.metricLabel}
                    </p>
                    <p className="mt-2 font-serif text-4xl text-[#F6F3EC] tabular-nums">
                      {chapter.metricValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / Tablet Stacked Flow */}
      <div className="lg:hidden mx-auto max-w-[1440px] px-5 sm:px-8 pb-20 space-y-14">
        {ARCHITECTURAL_CHAPTERS.map((chapter) => (
          <article
            key={chapter.index}
            id={`chapter-panel-${chapter.index}`}
            className="grid grid-cols-1 gap-6 border-b border-[#F6F3EC]/12 pb-12 last:border-b-0 last:pb-0"
          >
            <ArchitecturalImage
              src={chapter.image}
              alt={chapter.imageAlt}
              title={chapter.title}
              className="aspect-[16/10] w-full border border-[#F6F3EC]/15"
            />
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.14em] text-[#9A7B4F]">
                <span>Chapter {chapter.index}</span>
                <span className="tabular-nums">{chapter.metricValue}</span>
              </div>
              <h3 className="mt-2 font-serif text-3xl text-[#F6F3EC]">{chapter.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#D6CEC0]">{chapter.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
