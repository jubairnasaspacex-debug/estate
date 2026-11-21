import { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { Development } from '../data/developments';
import { ArchitecturalImage } from './ArchitecturalImage';

interface DevelopmentModalProps {
  development: Development | null;
  onClose: () => void;
  onEnquireForDevelopment: (developmentId: string) => void;
}

export function DevelopmentModal({
  development,
  onClose,
  onEnquireForDevelopment,
}: DevelopmentModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!development) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [development, onClose]);

  if (!development) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/75 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-[#F6F3EC] text-[#141413] border border-[#D6CEC0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D6CEC0] bg-[#F6F3EC] px-6 py-4">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[#59544C]">
            <span className="text-[#785D37]">Commission {development.index}</span>
            <span aria-hidden="true">·</span>
            <span>{development.location}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline tabular-nums">{development.coordinates}</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${development.name} dossier`}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#D6CEC0] text-[#141413] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <ArchitecturalImage
                src={development.image}
                alt={development.imageAlt}
                title={development.name}
                className="aspect-[4/3] w-full border border-[#D6CEC0]"
              />
            </div>

            <div className="lg:col-span-6">
              <h2
                id="dossier-modal-title"
                className="font-serif text-4xl sm:text-5xl font-normal text-[#141413]"
              >
                {development.name}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[#785D37]">
                {development.architectStudio} · Target {development.completionYear}
              </p>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#2B2925]">
                {development.editorialEssay}
              </p>

              <div className="mt-6 border-t border-[#D6CEC0] pt-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                  Primary Material Specification
                </h3>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#141413]">
                  {development.materials.map((mat) => (
                    <li key={mat} className="flex items-center gap-2">
                      <span aria-hidden="true" className="text-[#785D37]">—</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Residence Availability Schedule */}
          <div className="mt-10 border-t border-[#D6CEC0] pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-serif text-2xl font-normal text-[#141413]">
                Selected Residence Schedule
              </h3>
              <span className="font-mono text-xs uppercase tracking-wider text-[#59544C]">
                {development.totalResidences} Residences Total · {development.areaRange}
              </span>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#D6CEC0] font-mono text-xs uppercase tracking-[0.12em] text-[#59544C]">
                    <th className="py-3 pr-4 font-medium">Unit</th>
                    <th className="py-3 pr-4 font-medium">Typology</th>
                    <th className="py-3 pr-4 font-medium">Interior</th>
                    <th className="py-3 pr-4 font-medium">Terrace</th>
                    <th className="py-3 pr-4 font-medium">Orientation</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 font-medium text-right">Guide Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6CEC0] tabular-nums">
                  {development.units.map((unit) => (
                    <tr key={unit.unitCode}>
                      <td className="py-3.5 pr-4 font-mono text-xs text-[#785D37]">
                        {unit.unitCode}
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-[#141413]">{unit.typology}</td>
                      <td className="py-3.5 pr-4 font-mono text-xs">{unit.interiorSqm} m²</td>
                      <td className="py-3.5 pr-4 font-mono text-xs">{unit.terraceSqm} m²</td>
                      <td className="py-3.5 pr-4 text-[#59544C]">{unit.orientation}</td>
                      <td className="py-3.5 pr-4 text-xs font-medium text-[#141413]">
                        {unit.availability}
                      </td>
                      <td className="py-3.5 text-right font-mono text-xs font-medium">
                        {unit.guidePriceEur}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#D6CEC0] pt-6">
              <p className="text-xs text-[#59544C]">
                Full floorplans, structural permits, and architectural monograph available upon
                private consultation.
              </p>
              <button
                type="button"
                onClick={() => onEnquireForDevelopment(development.id)}
                className="inline-flex items-center gap-3 bg-[#141413] px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase text-[#F6F3EC] hover:bg-[#785D37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
              >
                <span>Request Private Viewing — {development.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
