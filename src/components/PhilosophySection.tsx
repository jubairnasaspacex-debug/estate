import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateLineMaskReveal, prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

interface SpatialPillar {
  index: string;
  title: string;
  text: string;
  materialNote: string;
  image: string;
  imageAlt: string;
  caption: string;
}

const PILLARS: SpatialPillar[] = [
  {
    index: '01',
    title: 'Structural Honesty',
    text: 'Columns, lintels, and stone piers express their true load-bearing role without decorative cladding or synthetic veneer.',
    materialNote: '120mm Solid Botticino & Jura Stone Ashlar',
    image: '/src/assets/images/interior_grand_salon_1795239844680.jpg',
    imageAlt: 'Double-height travertine salon with bespoke oak herringbone floor and tall bronze windows',
    caption: 'Fig. 02 — Double-height hearth salon calibrated for natural east-west light',
  },
  {
    index: '02',
    title: 'Acoustic Sanctuary',
    text: 'Triple-laminated low-iron glazing, floating stone floor screeds, and silent hydronic climate systems preserve domestic stillness.',
    materialNote: '46 dB Acoustic Curtain Wall · Silent Radiant Floors',
    image: '/src/assets/images/dev_maison_verre_1795239844397.jpg',
    imageAlt: 'Quiet Kyoto glass and basalt sanctuary overlooking a shaded moss garden',
    caption: 'Fig. 03 — Acoustic low-iron glazing framing serene interior gardens',
  },
  {
    index: '03',
    title: 'Generational Patina',
    text: 'Untreated lime renders, solid European oak, and hand-waxed bronze are selected to deepen in warmth across decades of habitation.',
    materialNote: 'Hand-Waxed Sand-Cast Architectural Bronze',
    image: '/src/assets/images/lifestyle_terrace_dusk_1795239845297.jpg',
    imageAlt: 'Warm travertine stone terrace with recessed fireplace overlooking evening water',
    caption: 'Fig. 04 — Honed travertine terrace pavers & twilight hearth',
  },
];

export function PhilosophySection() {
  const [activePillar, setActivePillar] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);

  const currentPillar = PILLARS[activePillar];

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateLineMaskReveal(lineRefs.current, sectionRef.current, 0.08);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !imageWrapRef.current) return;
    gsap.fromTo(
      imageWrapRef.current,
      { clipPath: 'inset(8% 0% 0% 0%)', scale: 1.03 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.65, ease: 'power3.out' },
    );
  }, [activePillar]);

  const setLineRef = (el: HTMLSpanElement | null, idx: number) => {
    if (el) lineRefs.current[idx] = el;
  };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-[#EAE4D8] py-20 sm:py-28 lg:py-36 text-[#141413] border-b border-[#D6CEC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              04. Brand Philosophy
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.1rem,3.6vw,3.35rem)] font-normal leading-[1.08] [text-wrap:balance]">
              <span className="line-mask">
                <span ref={(el) => setLineRef(el, 0)} className="line-inner">
                  Quiet restraint over
                </span>
              </span>
              <span className="line-mask">
                <span ref={(el) => setLineRef(el, 1)} className="line-inner italic text-[#785D37]">
                  ephemeral spectacle.
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-[#59544C]">
              True architectural luxury reveals itself slowly—through the weight of a bronze door
              handle, the acoustic hush of a double-height salon, and the angle of late afternoon
              light across carved travertine.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-[#785D37]">
              {currentPillar.materialNote}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div className="overflow-hidden">
              <div ref={imageWrapRef} className="will-change-transform">
                <ArchitecturalImage
                  key={currentPillar.index}
                  src={currentPillar.image}
                  alt={currentPillar.imageAlt}
                  title={currentPillar.title}
                  className="aspect-[16/9] w-full border border-[#D6CEC0]"
                />
              </div>
              <p className="mt-3 flex items-center justify-between text-xs text-[#59544C]">
                <span className="font-serif italic">{currentPillar.caption}</span>
                <span className="font-mono uppercase tracking-wider">Study {currentPillar.index}</span>
              </p>
            </div>

            {/* Interactive spatial pillars (inspired by era-residence.com's amenity selector) */}
            <div className="divide-y divide-[#D6CEC0] border-t border-b border-[#D6CEC0]">
              {PILLARS.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <button
                    key={pillar.index}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActivePillar(idx)}
                    onMouseEnter={() => setActivePillar(idx)}
                    className={`w-full text-left grid grid-cols-1 sm:grid-cols-12 gap-4 py-7 px-3 transition-colors duration-300 items-baseline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37] ${
                      isSelected ? 'bg-[#F6F3EC]/70' : 'hover:bg-[#F6F3EC]/40'
                    }`}
                  >
                    <div className="sm:col-span-5 flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs transition-colors ${
                          isSelected ? 'text-[#785D37] font-medium' : 'text-[#59544C]'
                        }`}
                      >
                        {pillar.index}.
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#141413]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="sm:col-span-7 text-sm sm:text-base leading-relaxed text-[#59544C]">
                      {pillar.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
