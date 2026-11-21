import { useState } from 'react';
import { CREDIBILITY_PARAMETERS } from '../data/developments';

export function CredibilitySection() {
  const [expandedCode, setExpandedCode] = useState<string>('01');

  return (
    <section
      id="credibility"
      className="bg-[#141413] py-20 sm:py-28 text-[#F6F3EC]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F6F3EC]/15 pb-8">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#9A7B4F]">
              06. Governance &amp; Parameters
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.08] [text-wrap:balance]">
              Verifiable Development Discipline
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#D6CEC0]">
            Every Atelier Estates release is backed by active municipal permitting, escrow-audited
            construction milestones, and named architectural studios.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#F6F3EC]/15">
          {CREDIBILITY_PARAMETERS.map((param) => {
            const isExpanded = expandedCode === param.code;
            return (
              <div
                key={param.code}
                className="flex flex-col justify-between border-r border-b border-[#F6F3EC]/15 p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#9A7B4F]">
                    <span>{param.code}</span>
                    <span>{param.summary}</span>
                  </div>

                  <p className="mt-6 font-serif text-5xl font-normal tabular-nums text-[#F6F3EC]">
                    {param.metric}
                  </p>
                  <h3 className="mt-3 text-sm font-medium tracking-wide text-[#F6F3EC]">
                    {param.label}
                  </h3>
                </div>

                <div className="mt-6 border-t border-[#F6F3EC]/12 pt-4">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedCode(isExpanded ? '' : param.code)}
                    className="flex w-full items-center justify-between text-left font-mono text-xs uppercase tracking-[0.12em] text-[#D6CEC0] hover:text-[#9A7B4F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B4F]"
                  >
                    <span>{isExpanded ? 'Hide Specification' : 'Read Specification'}</span>
                    <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                  </button>
                  {isExpanded && (
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#C7BEB0]">
                      {param.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
