import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPlate } from '../data/developments';
import { ArchitecturalImage } from './ArchitecturalImage';

interface LightboxModalProps {
  plate: GalleryPlate | null;
  plates: GalleryPlate[];
  onClose: () => void;
  onNavigate: (plate: GalleryPlate) => void;
}

export function LightboxModal({ plate, plates, onClose, onNavigate }: LightboxModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!plate) return;
    closeBtnRef.current?.focus();

    const idx = plates.findIndex((p) => p.id === plate.id);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && plates.length > 1) {
        onNavigate(plates[(idx + 1) % plates.length]);
      } else if (e.key === 'ArrowLeft' && plates.length > 1) {
        onNavigate(plates[(idx - 1 + plates.length) % plates.length]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [plate, plates, onClose, onNavigate]);

  if (!plate) {
    return null;
  }

  const currentIdx = plates.findIndex((p) => p.id === plate.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141413] p-4 sm:p-8 text-[#F6F3EC]"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-[#D6CEC0]">
          <span className="text-[#9A7B4F]">{plate.figure}</span>
          <span aria-hidden="true">·</span>
          <span>{plate.development}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{plate.photographerNote}</span>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery lightbox"
          className="inline-flex h-11 w-11 items-center justify-center border border-[#F6F3EC]/25 text-[#F6F3EC] hover:bg-[#F6F3EC] hover:text-[#141413] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B4F]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Main Centered Plate */}
      <div
        className="mx-auto my-auto flex w-full max-w-5xl items-center justify-center py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <ArchitecturalImage
          src={plate.image}
          alt={plate.imageAlt}
          title={plate.title}
          className="max-h-[70vh] w-full aspect-[16/10] border border-[#F6F3EC]/15"
          imgClassName="object-contain bg-[#141413]"
        />
      </div>

      {/* Bottom Caption & Navigation */}
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[#F6F3EC]/15 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 id="lightbox-title" className="font-serif text-2xl text-[#F6F3EC]">
            {plate.title}
          </h3>
          <p className="text-xs text-[#A69F93]">{plate.location}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-[#A69F93]">
            {currentIdx + 1} / {plates.length}
          </span>
          <button
            type="button"
            onClick={() => onNavigate(plates[(currentIdx - 1 + plates.length) % plates.length])}
            aria-label="Previous gallery plate"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#F6F3EC]/25 text-[#F6F3EC] hover:bg-[#9A7B4F] hover:border-[#9A7B4F] hover:text-[#141413] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate(plates[(currentIdx + 1) % plates.length])}
            aria-label="Next gallery plate"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#F6F3EC]/25 text-[#F6F3EC] hover:bg-[#9A7B4F] hover:border-[#9A7B4F] hover:text-[#141413] transition-colors"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
