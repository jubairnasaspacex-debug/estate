import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import {
  DEVELOPMENTS,
  type Development,
  type DevelopmentCategory,
} from '../data/developments';
import { filterDevelopments } from '../utils/enquiryValidation';
import { prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES: DevelopmentCategory[] = ['All', 'Lakeside', 'Urban & Garden', 'Coastal'];

interface DevelopmentsSectionProps {
  onSelectDevelopment: (development: Development) => void;
}

export function DevelopmentsSection({ onSelectDevelopment }: DevelopmentsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<DevelopmentCategory>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const mediaFramesRef = useRef<(HTMLDivElement | null)[]>([]);

  const visibleDevelopments = filterDevelopments(DEVELOPMENTS, activeCategory);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const frame = mediaFramesRef.current[idx];

        if (frame) {
          gsap.fromTo(
            frame,
            { clipPath: 'inset(16% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 84%',
                once: true,
              },
            },
          );
        }

        // Opposing column velocity parallax on desktop
        if (typeof window !== 'undefined' && window.innerWidth >= 768 && visibleDevelopments.length > 1) {
          gsap.fromTo(
            card,
            { y: idx % 2 === 0 ? 14 : -14 },
            {
              y: idx % 2 === 0 ? -18 : 22,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, visibleDevelopments.length]);

  return (
    <section
      id="developments"
      ref={sectionRef}
      className="bg-[#F6F3EC] py-20 sm:py-28 lg:py-32 text-[#141413]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#D6CEC0] pb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              02. Featured Developments
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.8vw,3.5rem)] font-normal leading-[1.08] [text-wrap:balance]">
              Current Architectural Commissions
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter developments by setting"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37] ${
                    isActive
                      ? 'bg-[#141413] text-[#F6F3EC]'
                      : 'border border-[#D6CEC0] bg-transparent text-[#59544C] hover:border-[#141413] hover:text-[#141413]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {visibleDevelopments.map((dev, idx) => (
            <article
              key={dev.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={`group flex flex-col will-change-transform ${idx % 2 === 1 ? 'md:mt-16' : ''}`}
            >
              <button
                type="button"
                data-cursor="Dossier"
                onClick={() => onSelectDevelopment(dev)}
                aria-label={`Open architectural dossier for ${dev.name} in ${dev.location}`}
                className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#785D37]"
              >
                <div
                  ref={(el) => {
                    mediaFramesRef.current[idx] = el;
                  }}
                  className="overflow-hidden border border-[#D6CEC0]"
                >
                  <ArchitecturalImage
                    src={dev.image}
                    alt={dev.imageAlt}
                    title={dev.name}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#59544C]">
                  <div className="flex items-center gap-2 font-mono uppercase tracking-[0.12em]">
                    <span className="text-[#785D37]">{dev.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dev.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dev.category}</span>
                  </div>
                  <span className="font-mono tabular-nums">{dev.completionYear}</span>
                </div>

                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413] group-hover:text-[#785D37] transition-colors">
                    {dev.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] uppercase text-[#141413] group-hover:text-[#785D37] whitespace-nowrap shrink-0">
                    <span>Explore Dossier</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#59544C] max-w-xl">
                  {dev.summary}
                </p>

                <div className="mt-5 flex items-center gap-6 border-t border-[#D6CEC0] pt-4 text-xs font-mono tabular-nums text-[#59544C]">
                  <span>{dev.totalResidences} Residences</span>
                  <span aria-hidden="true">·</span>
                  <span>{dev.areaRange}</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">{dev.architectStudio}</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
