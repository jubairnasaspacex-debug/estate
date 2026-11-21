import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/motion';

interface KineticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactNode;
  strength?: number;
}

export function KineticButton({
  label,
  icon,
  className = '',
  strength = 0.22,
  onMouseMove,
  onMouseLeave,
  type = 'button',
  ...rest
}: KineticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    if (prefersReducedMotion()) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;

    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    const el = buttonRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden ${className}`}
      {...rest}
    >
      <span className="relative inline-block overflow-hidden h-[1.25em] leading-[1.25em]">
        <span className="block transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="block absolute left-0 top-full w-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
        >
          {label}
        </span>
      </span>
      {icon && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}
