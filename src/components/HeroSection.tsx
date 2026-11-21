import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/developments';
import { prefersReducedMotion, smoothScrollToSection } from '../utils/motion';
import { ArchitecturalImage } from './ArchitecturalImage';
import { KineticButton } from './KineticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  ready: boolean;
}

export function HeroSection({ ready }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    if (prefersReducedMotion()) {
      gsap.set(titleCharsRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(subRef.current, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        titleCharsRef.current,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.025,
          ease: 'power4.out',
        },
      ).fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        '-=0.55',
      );

      // Infinite subtle kinetic editorial marquee ribbon (Realevate-inspired)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 34,
          ease: 'none',
        });
      }

      // Realevate-style scroll-scrubbed hero frame scale-down + internal parallax zoom
      if (frameRef.current && imageWrapRef.current && sectionRef.current) {
        gsap.fromTo(
          frameRef.current,
          { scale: 1, borderRadius: '0px' },
          {
            scale: 0.93,
            borderRadius: '12px',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          imageWrapRef.current,
          { scale: 1.04, yPercent: 0 },
          {
            scale: 1.18,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  let charCounter = 0;
  const renderAnimatedWord = (word: string, italic = false) =>
    word.split('').map((ch) => {
      const idx = charCounter++;
      return (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom">
          <span
            ref={(el) => {
              if (el) titleCharsRef.current[idx] = el;
            }}
            className={`inline-block will-change-transform ${italic ? 'italic text-[#EAE4D8]' : ''}`}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </span>
      );
    });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-[#EAE4D8] overflow-hidden"
    >
      <div
        ref={frameRef}
        className="relative flex min-h-[680px] h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#141413] text-[#F6F3EC] will-change-transform"
      >
        {/* Full-bleed twilight architectural photography with scroll parallax */}
        <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
          <ArchitecturalImage
            src={HERO_MEDIA.image}
            alt={HERO_MEDIA.alt}
            title="Atelier Estates"
            loading="eager"
            className="h-full w-full"
          />
        </div>

        {/* Measured contrast scrim for 4.5:1+ legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141413]/92 via-[#141413]/35 to-[#141413]/45"
        />

        {/* Continuous subtle kinetic editorial ticker across mid-frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-10 overflow-hidden border-y border-[#F6F3EC]/12 py-2.5 mb-auto mt-24 opacity-75"
        >
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap font-mono text-[11px] tracking-[0.26em] uppercase text-[#EAE4D8]">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span key={idx} className="px-6">
                Lake Como · Geneva · Kyoto · Mallorca · Monolithic Travertine · Patinated Bronze ·
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-8 sm:pb-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
            <div className="lg:col-span-8">
              <p className="mb-4 font-mono text-xs tracking-[0.22em] uppercase text-[#EAE4D8]">
                International Luxury Architectural Developer
              </p>
              <h1
                aria-label="Beyond the Art of Living."
                className="font-serif text-[clamp(2.85rem,6vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.01em] text-[#F6F3EC]"
              >
                <span aria-hidden="true" className="block">
                  {renderAnimatedWord('Beyond the Art')}
                </span>
                <span aria-hidden="true" className="block">
                  {renderAnimatedWord('of Living.', true)}
                </span>
              </h1>
            </div>

            <div
              ref={subRef}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-5"
            >
              <p className="max-w-sm text-sm sm:text-base leading-relaxed text-[#EAE4D8] lg:text-right">
                Monolithic travertine, patinated bronze, and calibrated natural light across private
                European and Japanese sanctuaries.
              </p>
              <KineticButton
                label="Explore Commissions"
                icon={<ArrowDownRight className="h-4 w-4" aria-hidden="true" />}
                onClick={() => smoothScrollToSection('#developments')}
                className="bg-[#F6F3EC] px-6 py-3.5 text-xs font-medium tracking-[0.16em] uppercase text-[#141413] hover:bg-[#9A7B4F] hover:text-[#F6F3EC] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F3EC]"
              />
            </div>
          </div>

          {/* Cinema-inspired architectural footer ruler inside Hero */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#F6F3EC]/20 pt-4 text-[11px] font-mono tracking-[0.16em] uppercase text-[#D6CEC0]">
            <div className="flex items-center gap-4">
              <span>{HERO_MEDIA.plateTitle}</span>
              <span aria-hidden="true" className="hidden sm:inline text-[#9A7B4F]">·</span>
              <span className="hidden sm:inline tabular-nums">{HERO_MEDIA.coordinates}</span>
            </div>

            <div aria-hidden="true" className="hidden md:flex items-end gap-2">
              {Array.from({ length: 19 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-px bg-[#F6F3EC]/45 ${idx % 6 === 0 ? 'h-3 bg-[#9A7B4F]' : 'h-1.5'}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => smoothScrollToSection('#manifesto')}
              className="inline-flex items-center gap-2 text-[#F6F3EC] hover:text-[#9A7B4F] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F3EC]"
            >
              <span>Scroll to Explore</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
