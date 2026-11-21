import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initLenisAndScrollTrigger(): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  const onLenisScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on('scroll', onLenisScroll);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Store global smooth scroll helper for anchor links
  (window as unknown as { __atelierScrollTo?: (target: string | number) => void }).__atelierScrollTo = (
    target: string | number,
  ) => {
    lenis.scrollTo(target, { offset: -72, duration: 1.1 });
  };

  return () => {
    delete (window as unknown as { __atelierScrollTo?: (target: string | number) => void }).__atelierScrollTo;
    gsap.ticker.remove(tick);
    lenis.off('scroll', onLenisScroll);
    lenis.destroy();
  };
}

export function smoothScrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;

  const customScroll = (window as unknown as { __atelierScrollTo?: (target: string | number) => void })
    .__atelierScrollTo;
  if (customScroll && !prefersReducedMotion()) {
    customScroll(selector);
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

export function animateLineMaskReveal(
  elements: gsap.TweenTarget,
  trigger?: Element | null,
  stagger = 0.08,
) {
  if (prefersReducedMotion()) {
    gsap.set(elements, { yPercent: 0, opacity: 1 });
    return;
  }

  return gsap.fromTo(
    elements,
    { yPercent: 105, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.95,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start: 'top 84%',
            once: true,
          }
        : undefined,
    },
  );
}

export function animateClipReveal(element: Element | null, delay = 0) {
  if (!element) return;
  if (prefersReducedMotion()) {
    gsap.set(element, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
    return;
  }

  return gsap.fromTo(
    element,
    { clipPath: 'inset(12% 0% 0% 0%)', opacity: 0.35 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 1.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
        once: true,
      },
    },
  );
}
