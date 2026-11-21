import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LIFESTYLE_PROXIMITIES } from '../data/developments';
import { wrapCarouselIndex } from '../utils/enquiryValidation';
import { prefersReducedMotion } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';

export function LifestyleSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = LIFESTYLE_PROXIMITIES.length;
  const current = LIFESTYLE_PROXIMITIES[activeSlide];

  const minutesRef = useRef<HTMLSpanElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const handleStep = (delta: number) => {
    setActiveSlide((prev) => wrapCarouselIndex(prev, delta, totalSlides));
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (minutesRef.current) {
      gsap.fromTo(
        minutesRef.current,
        { yPercent: 45, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      );
    }
    if (imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'inset(0% 0% 0% 10%)', scale: 1.04 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
      );
    }
  }, [activeSlide]);

  return (
    <section
      id="lifestyle"
      className="bg-[#F6F3EC] py-20 sm:py-28 lg:py-32 text-[#141413] border-b border-[#D6CEC0]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Narrative & Proximity Counter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
                05. Luxury Lifestyle Experience
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.08] [text-wrap:balance]">
                Rhythms of Everyday Stillness
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#59544C]">
                Location is measured not only by coordinates, but by the effortless cadence of a
                morning walk along water, private cultural access, and sheltered twilight terraces.
              </p>
            </div>

            <div className="mt-10 border-t border-[#D6CEC0] pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#785D37]">
                {current.locationTag}
              </p>

              <div className="mt-4 flex items-baseline gap-4 overflow-hidden">
                <span
                  ref={minutesRef}
                  data-testid="lifestyle-minutes"
                  className="inline-block font-serif text-6xl sm:text-7xl font-normal leading-none tabular-nums text-[#141413] will-change-transform"
                >
                  {current.minutes}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                  {current.mode}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#141413]">
                {current.destination}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#59544C] min-h-[3.5rem]">
                {current.description}
              </p>

              {/* Quick direct slide indicators + Prev/Next */}
              <div className="mt-8 flex items-center justify-between border-t border-[#D6CEC0] pt-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    aria-label="Previous lifestyle chapter"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#D6CEC0] text-[#141413] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    aria-label="Next lifestyle chapter"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#D6CEC0] text-[#141413] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5">
                    {LIFESTYLE_PROXIMITIES.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Jump to lifestyle slide ${idx + 1}: ${item.destination}`}
                        className={`h-1.5 transition-all duration-300 ${
                          idx === activeSlide ? 'w-6 bg-[#785D37]' : 'w-2 bg-[#D6CEC0] hover:bg-[#59544C]'
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    data-testid="lifestyle-counter"
                    className="font-mono text-xs tabular-nums tracking-[0.16em] text-[#59544C]"
                  >
                    {activeSlide + 1} / {totalSlides}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden">
            <div ref={imageWrapRef} className="h-full w-full will-change-transform">
              <ArchitecturalImage
                key={current.id}
                src={current.image}
                alt={current.imageAlt}
                title={current.destination}
                className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[540px] w-full border border-[#D6CEC0]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
