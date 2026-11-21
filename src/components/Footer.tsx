import { useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { DEVELOPMENTS, type Development } from '../data/developments';
import { smoothScrollToSection } from '../utils/motion';

interface FooterProps {
  onSelectDevelopment: (dev: Development) => void;
}

export function Footer({ onSelectDevelopment }: FooterProps) {
  const [legalNoticeOpen, setLegalNoticeOpen] = useState<'privacy' | 'disclosures' | null>(null);

  return (
    <footer className="bg-[#141413] text-[#F6F3EC] border-t border-[#F6F3EC]/15">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#F6F3EC]/15 pb-14">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl sm:text-4xl tracking-[0.06em] uppercase text-[#F6F3EC]">
              Atelier Estates
            </p>
            <p className="mt-2 font-serif italic text-lg text-[#C7BEB0]">
              Beyond the Art of Living
            </p>
            <p className="mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-[#A69F93]">
              International luxury residential developer specializing in monolithic stone, bronze,
              and daylight architecture across Europe and Japan.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9A7B4F]">
              Atelier
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D6CEC0]">
              <li>
                <a
                  href="#manifesto"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('#manifesto');
                  }}
                  className="hover:text-[#F6F3EC] transition-colors"
                >
                  Manifesto
                </a>
              </li>
              <li>
                <a
                  href="#architecture"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('#architecture');
                  }}
                  className="hover:text-[#F6F3EC] transition-colors"
                >
                  Architecture
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('#philosophy');
                  }}
                  className="hover:text-[#F6F3EC] transition-colors"
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToSection('#gallery');
                  }}
                  className="hover:text-[#F6F3EC] transition-colors"
                >
                  Archive
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9A7B4F]">
              Commissions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D6CEC0]">
              {DEVELOPMENTS.map((dev) => (
                <li key={dev.id}>
                  <button
                    type="button"
                    onClick={() => onSelectDevelopment(dev)}
                    className="text-left hover:text-[#F6F3EC] transition-colors"
                  >
                    {dev.name} · {dev.country}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              type="button"
              onClick={() => smoothScrollToSection('#hero')}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-2 border border-[#F6F3EC]/25 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-[#F6F3EC] hover:bg-[#9A7B4F] hover:border-[#9A7B4F] hover:text-[#141413] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A69F93]">
          <p>© 2026 Atelier Estates AG. All architectural studies and elevations reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalNoticeOpen('privacy')}
              className="hover:text-[#F6F3EC] transition-colors"
            >
              Privacy Protocol
            </button>
            <button
              type="button"
              onClick={() => setLegalNoticeOpen('disclosures')}
              className="hover:text-[#F6F3EC] transition-colors"
            >
              Architectural Disclosures
            </button>
          </div>
        </div>
      </div>

      {/* Informative Legal Modal */}
      {legalNoticeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/80 p-4"
          onClick={() => setLegalNoticeOpen(null)}
        >
          <div
            className="w-full max-w-lg border border-[#D6CEC0] bg-[#F6F3EC] p-6 sm:p-8 text-[#141413]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D6CEC0] pb-4">
              <h3 id="legal-modal-title" className="font-serif text-2xl">
                {legalNoticeOpen === 'privacy'
                  ? 'Private Consultation Privacy Protocol'
                  : 'Architectural & Specification Disclosures'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalNoticeOpen(null)}
                aria-label="Close legal notice"
                className="inline-flex h-9 w-9 items-center justify-center border border-[#D6CEC0] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#59544C]">
              {legalNoticeOpen === 'privacy'
                ? 'Enquiry submissions are strictly confidential and used solely by Atelier Estates AG to prepare requested architectural dossiers and arrange private viewings. No client information is shared with external brokers or third-party marketers.'
                : 'All architectural elevations, interior dimensions, and material specifications represent current design intent across active commissions. Final square meterage and structural schedules are governed exclusively by executed municipal contracts.'}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
