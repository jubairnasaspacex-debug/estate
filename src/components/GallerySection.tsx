import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Expand } from 'lucide-react';
import { GALLERY_PLATES, type GalleryPlate } from '../data/developments';
import { filterGalleryItems } from '../utils/enquiryValidation';
import { prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

gsap.registerPlugin(ScrollTrigger);

type GalleryCategory = 'All' | GalleryPlate['category'];
const GALLERY_CATEGORIES: GalleryCategory[] = ['All', 'Exteriors', 'Interiors', 'Details'];

interface GallerySectionProps {
  onOpenPlate: (plate: GalleryPlate) => void;
}

export function GallerySection({ onOpenPlate }: GallerySectionProps) {
  const [category, setCategory] = useState<GalleryCategory>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const platesRef = useRef<(HTMLElement | null)[]>([]);
  const visiblePlates = filterGalleryItems(GALLERY_PLATES, category);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const targets = platesRef.current.filter(Boolean);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { clipPath: 'inset(14% 0% 0% 0%)', y: 24, opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [category]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#F6F3EC] py-20 sm:py-28 lg:py-32 text-[#141413] border-b border-[#D6CEC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#D6CEC0] pb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              07. Photographic Archive
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.08]">
              Selected Architectural Plates
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter architectural gallery plates"
            className="flex flex-wrap items-center gap-2"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37] ${
                    isActive
                      ? 'bg-[#141413] text-[#F6F3EC]'
                      : 'border border-[#D6CEC0] text-[#59544C] hover:border-[#141413] hover:text-[#141413]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {visiblePlates.map((plate, idx) => (
            <figure
              key={plate.id}
              ref={(el) => {
                platesRef.current[idx] = el;
              }}
              className={`group flex flex-col will-change-transform ${
                category === 'All' ? plate.spanClass : 'md:col-span-6'
              }`}
            >
              <button
                type="button"
                data-cursor="Inspect"
                onClick={() => onOpenPlate(plate)}
                aria-label={`Inspect ${plate.title} (${plate.figure}) in full-screen lightbox`}
                className="relative w-full overflow-hidden border border-[#D6CEC0] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#785D37]"
              >
                <ArchitecturalImage
                  src={plate.image}
                  alt={plate.imageAlt}
                  title={plate.title}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center bg-[#141413]/80 text-[#F6F3EC] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Expand className="h-4 w-4" />
                </span>
              </button>

              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-[#59544C]">
                <span>
                  <span className="font-mono text-[#785D37] mr-2">{plate.figure}</span>
                  <span className="font-serif italic text-sm text-[#141413]">{plate.title}</span>
                </span>
                <span className="font-mono uppercase tracking-wider">
                  {plate.development} · {plate.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
