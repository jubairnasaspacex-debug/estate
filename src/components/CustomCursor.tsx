import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute('data-cursor') || 'View');
      } else {
        setLabel('');
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-all duration-200 ${
          label
            ? 'h-16 w-16 border-[#9A7B4F] bg-[#141413]/85 text-[#F6F3EC]'
            : 'h-5 w-5 border-[#9A7B4F]/75 bg-transparent'
        }`}
      >
        {label && (
          <span className="text-[10px] font-medium tracking-[0.14em] uppercase">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
