import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/motion';

interface PreloaderProps {
  onComplete: () => void;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tensRef = useRef<HTMLDivElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);
  const hundredsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || prefersReducedMotion()) {
      setDismissed(true);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setDismissed(true);
        onComplete();
      },
    });

    // Slot-machine odometer digit roll inspired by Realevate.agency (11 items in tens/ones: 0..9 + 0)
    tl.to(
      onesRef.current,
      {
        yPercent: -(9 / 11) * 100,
        duration: 1.25,
        ease: 'power3.inOut',
      },
      0,
    )
      .to(
        tensRef.current,
        {
          yPercent: -(9 / 11) * 100,
          duration: 1.25,
          ease: 'power2.inOut',
        },
        0.08,
      )
      .to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 1.35,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        hundredsRef.current,
        {
          yPercent: -50,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.25,
      )
      .to(
        [tensRef.current, onesRef.current],
        {
          yPercent: -(10 / 11) * 100,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.25,
      )
      .to(
        containerRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.85,
          ease: 'power4.inOut',
        },
        1.65,
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (dismissed) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-testid="preloader"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-[#141413] p-6 sm:p-10 text-[#F6F3EC]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-7 border border-[#F6F3EC]/12"
      />

      <div className="relative z-10 flex items-center justify-between">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="text-[#9A7B4F]"
        >
          <rect x="4" y="4" width="28" height="28" stroke="currentColor" strokeWidth="1" />
          <path d="M18 4V32M4 18H32" stroke="currentColor" strokeWidth="0.75" />
          <polygon points="18,9 27,18 18,27 9,18" stroke="currentColor" strokeWidth="0.9" />
        </svg>

        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            onComplete();
          }}
          className="text-xs tracking-[0.16em] uppercase text-[#C7BEB0] hover:text-[#F6F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A7B4F] whitespace-nowrap shrink-0"
        >
          Skip Intro
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center my-auto px-4">
        <div className="flex items-center justify-center gap-6 sm:gap-14 text-[11px] tracking-[0.28em] uppercase text-[#C7BEB0]">
          <span>Europe</span>
          <span aria-hidden="true" className="text-[#9A7B4F]">·</span>
          <span>Japan</span>
        </div>

        <h2 className="mt-5 font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.06em] uppercase text-[#F6F3EC]">
          Atelier Estates
        </h2>
        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#C7BEB0]">
          Beyond the Art of Living
        </p>

        {/* Horizontal architectural hairline progress */}
        <div className="mt-10 h-px w-48 bg-[#F6F3EC]/15 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full w-full origin-left bg-[#9A7B4F]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Bottom Rolling Odometer Counter */}
      <div className="relative z-10 flex items-end justify-between text-xs font-mono tracking-widest text-[#A69F93]">
        <span>ARCHITECTURAL MONOGRAPH</span>

        <div
          aria-hidden="true"
          className="flex items-center font-serif text-3xl sm:text-4xl leading-none text-[#F6F3EC] tabular-nums"
        >
          <div className="h-[1em] overflow-hidden">
            <div ref={hundredsRef}>
              <div className="h-[1em]">0</div>
              <div className="h-[1em]">1</div>
            </div>
          </div>
          <div className="h-[1em] overflow-hidden">
            <div ref={tensRef}>
              {DIGITS.map((d) => (
                <div key={`t-${d}`} className="h-[1em]">{d}</div>
              ))}
              <div className="h-[1em]">0</div>
            </div>
          </div>
          <div className="h-[1em] overflow-hidden">
            <div ref={onesRef}>
              {DIGITS.map((d) => (
                <div key={`o-${d}`} className="h-[1em]">{d}</div>
              ))}
              <div className="h-[1em]">0</div>
            </div>
          </div>
          <span className="ml-1 font-mono text-xs text-[#9A7B4F]">%</span>
        </div>
      </div>
    </div>
  );
}
