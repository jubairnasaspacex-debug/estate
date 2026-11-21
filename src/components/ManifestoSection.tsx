import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateClipReveal, animateLineMaskReveal, prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_LEAD =
  'Atelier Estates develops rare residential sanctuaries at the intersection of monolithic stone masonry, museum-grade daylighting, and quiet regional craft. Every commission is conceived as a singular architectural work rather than repeatable inventory.';

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const scrubWordsRef = useRef<HTMLSpanElement[]>([]);
  const figureRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateLineMaskReveal(linesRef.current, sectionRef.current, 0.09);
      animateClipReveal(figureRef.current);

      if (prefersReducedMotion()) {
        gsap.set(scrubWordsRef.current, { opacity: 1 });
        return;
      }

      // ERA-style word-by-word scroll-scrubbed illumination
      if (scrubWordsRef.current.length > 0 && sectionRef.current) {
        gsap.fromTo(
          scrubWordsRef.current,
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 62%',
              end: 'center 42%',
              scrub: 0.5,
            },
          },
        );
      }

      if (dividerRef.current && sectionRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 88%',
              once: true,
            },
          },
        );
      }

      if (figureRef.current && sectionRef.current) {
        gsap.fromTo(
          figureRef.current,
          { y: 36 },
          {
            y: -36,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setLineRef = (el: HTMLSpanElement | null, idx: number) => {
    if (el) linesRef.current[idx] = el;
  };

  const leadWords = MANIFESTO_LEAD.split(' ');

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="bg-[#F6F3EC] py-20 sm:py-28 lg:py-36 text-[#141413] border-b border-[#D6CEC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              01. Architectural Manifesto
            </p>

            <h2 className="mt-6 font-serif text-[clamp(2.25rem,4.3vw,4rem)] font-normal leading-[1.06] tracking-[-0.01em] [text-wrap:balance]">
              <span className="line-mask">
                <span ref={(el) => setLineRef(el, 0)} className="line-inner">
                  Architecture is not shelter.
                </span>
              </span>
              <span className="line-mask">
                <span ref={(el) => setLineRef(el, 1)} className="line-inner">
                  It is <em className="italic text-[#785D37]">sculpted permanence</em>
                </span>
              </span>
              <span className="line-mask">
                <span ref={(el) => setLineRef(el, 2)} className="line-inner">
                  for generations yet unwritten.
                </span>
              </span>
            </h2>

            <div className="mt-10 max-w-prose space-y-6 text-base sm:text-[18px] leading-[1.75] text-[#141413]">
              <p aria-label={MANIFESTO_LEAD}>
                {leadWords.map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    ref={(el) => {
                      if (el) scrubWordsRef.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </span>
                ))}
              </p>
              <p className="text-sm sm:text-base text-[#59544C]">
                From the terraced limestone shores of Lake Como to the quiet cedar lanes of Kyoto,
                we partner with independent master architects, structural engineers, and stone
                quarries so each residence ages with dignity and quiet authority.
              </p>
            </div>

            <div
              ref={dividerRef}
              className="mt-12 h-px w-full origin-left bg-[#D6CEC0]"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                  Founded Principle
                </p>
                <p className="mt-2 font-serif text-xl text-[#141413]">Single-Quarry Integrity</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                  Regions
                </p>
                <p className="mt-2 font-serif text-xl text-[#141413]">Europe &amp; Japan</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                  Portfolio Cap
                </p>
                <p className="mt-2 font-serif text-xl text-[#141413] tabular-nums">
                  4 Commissions Active
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div ref={figureRef} className="will-change-transform">
              <ArchitecturalImage
                src="/src/assets/images/detail_stone_bronze_1795239844428.jpg"
                alt="Curved travertine staircase with custom patinated bronze handrail illuminated by skylight shadows"
                title="Travertine & Bronze Study"
                className="aspect-[3/4] w-full"
              />
              <p className="mt-3 flex items-center justify-between text-xs text-[#59544C]">
                <span className="font-serif italic">
                  Fig. 01 — Hand-cast bronze balustrade &amp; honed Roman travertine
                </span>
                <span className="font-mono uppercase tracking-wider">Detail</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
