import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { DEVELOPMENTS, type Development } from '../data/developments';
import { prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

interface TypologyPillar {
  development: Development;
  label: string;
  subtitle: string;
  bgColor: string;
}

const PILLARS: TypologyPillar[] = [
  {
    development: DEVELOPMENTS[0],
    label: 'By The Lake',
    subtitle: 'Botticino limestone loggias and private timber moorings on Lake Como.',
    bgColor: 'bg-[#1D242B]',
  },
  {
    development: DEVELOPMENTS[1],
    label: 'Garden Court',
    subtitle: 'Bush-hammered Jura stone and vertical bronze louvers in Cologny, Geneva.',
    bgColor: 'bg-[#2B332A]',
  },
  {
    development: DEVELOPMENTS[2],
    label: 'Moss Sanctuary',
    subtitle: 'Honed Kurama basalt and Yoshino cedar eaves in eastern Kyoto.',
    bgColor: 'bg-[#2C2522]',
  },
  {
    development: DEVELOPMENTS[3],
    label: 'Cliffside Sea',
    subtitle: 'Excavated Marès sandstone cantilevers above the Balearic horizon.',
    bgColor: 'bg-[#1A1917]',
  },
];

interface TypologyShowcaseSectionProps {
  onSelectDevelopment: (development: Development) => void;
}

export function TypologyShowcaseSection({ onSelectDevelopment }: TypologyShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { clipPath: 'inset(18% 0% 0% 0%)', y: 48, opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Architectural Typologies"
      ref={sectionRef}
      className="bg-[#EAE4D8] py-16 sm:py-24 text-[#F6F3EC] border-b border-[#D6CEC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#141413]">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              Portfolio Environments
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal">
              Four Distinct Terrains
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#59544C]">
            Select any architectural typology below to inspect its complete material schedule and
            residence dossier.
          </p>
        </div>

        {/* Realevate-inspired 4 tall vertical architectural monolith pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, idx) => (
            <button
              key={pillar.development.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              type="button"
              data-cursor="Explore"
              onClick={() => onSelectDevelopment(pillar.development)}
              aria-label={`Inspect ${pillar.label}: ${pillar.development.name} in ${pillar.development.location}`}
              className={`group relative flex h-[480px] sm:h-[540px] flex-col justify-between overflow-hidden text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#785D37] ${pillar.bgColor}`}
            >
              {/* Top Monogram & Index */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <span className="font-mono text-xs tracking-[0.18em] text-[#D6CEC0]">
                  {pillar.development.index} · {pillar.development.country}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#9A7B4F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>

              {/* Rotated Vertical Display Title + Bottom Summary */}
              <div className="relative z-10 flex flex-1 items-end justify-between px-6 pb-5">
                <div className="max-w-[75%]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9A7B4F]">
                    {pillar.development.name}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#EAE4D8]">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Vertical rotated serif label */}
                <span
                  aria-hidden="true"
                  className="font-serif text-3xl sm:text-4xl tracking-tight text-[#F6F3EC] [writing-mode:vertical-rl] rotate-180 select-none transition-transform duration-500 group-hover:-translate-y-2"
                >
                  {pillar.label}
                </span>
              </div>

              {/* Expanding Bottom Architectural Photo Aperture */}
              <div className="relative h-36 w-full overflow-hidden border-t border-[#F6F3EC]/15 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-48">
                <ArchitecturalImage
                  src={pillar.development.image}
                  alt={pillar.development.imageAlt}
                  title={pillar.development.name}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
