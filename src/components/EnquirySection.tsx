import { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { DEVELOPMENTS } from '../data/developments';
import {
  formatDossierReference,
  validateEnquiryForm,
  type EnquiryFormValues,
  type EnquiryValidationErrors,
  type ViewingFormat,
} from '../utils/enquiryValidation';
import { MagneticButton } from './MagneticButton';

interface EnquirySectionProps {
  preselectedDevelopmentId: string;
}

const VIEWING_FORMATS: ViewingFormat[] = [
  'In-Person Private Tour',
  'Architectural Digital Walkthrough',
];

export function EnquirySection({ preselectedDevelopmentId }: EnquirySectionProps) {
  const [values, setValues] = useState<EnquiryFormValues>({
    fullName: '',
    email: '',
    phone: '',
    developmentId: preselectedDevelopmentId || 'villa-aurelia',
    viewingFormat: 'In-Person Private Tour',
    message: '',
    consentAccepted: false,
  });

  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    developmentName: string;
    format: ViewingFormat;
  } | null>(null);

  useEffect(() => {
    if (preselectedDevelopmentId) {
      setValues((prev) => ({ ...prev, developmentId: preselectedDevelopmentId }));
      setSubmittedRef(null);
    }
  }, [preselectedDevelopmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const refCode = formatDossierReference(values.developmentId, Date.now());
    const matchedDev = DEVELOPMENTS.find((d) => d.id === values.developmentId);
    setSubmittedSummary({
      name: values.fullName.trim(),
      developmentName: matchedDev ? `${matchedDev.name} (${matchedDev.location})` : 'General Portfolio',
      format: values.viewingFormat,
    });
    setSubmittedRef(refCode);
  };

  const resetForm = () => {
    setSubmittedRef(null);
    setSubmittedSummary(null);
    setValues((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      phone: '',
      message: '',
      consentAccepted: false,
    }));
  };

  return (
    <section
      id="enquiry"
      className="bg-[#EAE4D8] py-20 sm:py-28 lg:py-36 text-[#141413]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Private Consultation Positioning */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#785D37]">
              08. Private Consultation
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,4vw,3.75rem)] font-normal leading-[1.05] [text-wrap:balance]">
              Arrange a Private Viewing
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#59544C] max-w-md">
              Residences are released privately by appointment. Request an architectural dossier,
              floorplan schedule, or on-site tour with a senior partner.
            </p>

            <div className="mt-10 space-y-6 border-t border-[#D6CEC0] pt-8 text-sm">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#785D37]">
                  Zurich Private Salon
                </p>
                <p className="mt-1 text-[#141413]">Talstrasse 82, 8001 Zürich, Switzerland</p>
                <p className="font-mono text-xs text-[#59544C] mt-1 tabular-nums">
                  +41 44 580 42 10 · concierge@atelier-estates.example
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#785D37]">
                  Milan &amp; Lake Como Office
                </p>
                <p className="mt-1 text-[#141413]">Via Brera 28, 20121 Milano, Italy</p>
                <p className="font-mono text-xs text-[#59544C] mt-1">
                  Monday – Saturday · 09:00 – 19:00 CET
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Consultation Form */}
          <div className="lg:col-span-7 bg-[#F6F3EC] border border-[#D6CEC0] p-6 sm:p-10">
            {submittedRef && submittedSummary ? (
              <div
                data-testid="enquiry-confirmation"
                className="py-8 space-y-6"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center bg-[#141413] text-[#F6F3EC]">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#785D37]">
                    Consultation Request Registered · {submittedRef}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                    Thank you, {submittedSummary.name}.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#59544C] max-w-xl">
                    Your private dossier for{' '}
                    <strong className="font-medium text-[#141413]">
                      {submittedSummary.developmentName}
                    </strong>{' '}
                    ({submittedSummary.format}) has been assigned to a senior development director.
                    Architectural schedules will be dispatched within one business day.
                  </p>
                </div>

                <div className="border-t border-[#D6CEC0] pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-[#141413] px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-[#141413] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enquiry-full-name"
                      className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]"
                    >
                      Full Name <span className="text-[#785D37]">*</span>
                    </label>
                    <input
                      id="enquiry-full-name"
                      name="fullName"
                      type="text"
                      required
                      value={values.fullName}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="Elena Visconti"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                      className="mt-2 w-full border border-[#D6CEC0] bg-white/70 px-4 py-3 text-sm text-[#141413] placeholder:text-[#8E877C] focus:border-[#141413] focus:outline-none"
                    />
                    {errors.fullName && (
                      <p id="error-full-name" role="alert" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]"
                    >
                      Email Address <span className="text-[#785D37]">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="elena@familyoffice.ch"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className="mt-2 w-full border border-[#D6CEC0] bg-white/70 px-4 py-3 text-sm text-[#141413] placeholder:text-[#8E877C] focus:border-[#141413] focus:outline-none"
                    />
                    {errors.email && (
                      <p id="error-email" role="alert" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]"
                    >
                      Telephone (Optional)
                    </label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder="+41 44 000 00 00"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className="mt-2 w-full border border-[#D6CEC0] bg-white/70 px-4 py-3 text-sm text-[#141413] placeholder:text-[#8E877C] focus:border-[#141413] focus:outline-none"
                    />
                    {errors.phone && (
                      <p id="error-phone" role="alert" className="mt-1.5 text-xs text-[#9A3412]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-development"
                      className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]"
                    >
                      Commission of Interest <span className="text-[#785D37]">*</span>
                    </label>
                    <select
                      id="enquiry-development"
                      name="developmentId"
                      value={values.developmentId}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, developmentId: e.target.value }));
                        if (errors.developmentId) {
                          setErrors((prev) => ({ ...prev, developmentId: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.developmentId)}
                      className="mt-2 w-full border border-[#D6CEC0] bg-white/70 px-4 py-3 text-sm text-[#141413] focus:border-[#141413] focus:outline-none"
                    >
                      {DEVELOPMENTS.map((dev) => (
                        <option key={dev.id} value={dev.id}>
                          {dev.name} — {dev.location}
                        </option>
                      ))}
                      <option value="general-portfolio">General Architectural Portfolio</option>
                    </select>
                  </div>
                </div>

                {/* Viewing Format Selector */}
                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]">
                    Preferred Viewing Format
                  </span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VIEWING_FORMATS.map((format) => {
                      const active = values.viewingFormat === format;
                      return (
                        <button
                          key={format}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setValues((prev) => ({ ...prev, viewingFormat: format }))}
                          className={`px-4 py-3 text-left text-xs font-medium tracking-wide border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37] ${
                            active
                              ? 'border-[#141413] bg-[#141413] text-[#F6F3EC]'
                              : 'border-[#D6CEC0] bg-white/50 text-[#141413] hover:border-[#141413]'
                          }`}
                        >
                          {format}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block font-mono text-xs uppercase tracking-[0.14em] text-[#59544C]"
                  >
                    Residence Requirements or Notes
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Specify preferred typology, target acquisition horizon, or private aviation arrival details."
                    className="mt-2 w-full border border-[#D6CEC0] bg-white/70 px-4 py-3 text-sm text-[#141413] placeholder:text-[#8E877C] focus:border-[#141413] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="enquiry-consent"
                      type="checkbox"
                      checked={values.consentAccepted}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, consentAccepted: e.target.checked }));
                        if (errors.consentAccepted) {
                          setErrors((prev) => ({ ...prev, consentAccepted: undefined }));
                        }
                      }}
                      className="mt-0.5 h-4 w-4 accent-[#141413]"
                    />
                    <span className="text-xs leading-relaxed text-[#59544C]">
                      I consent to Atelier Estates processing this enquiry strictly for arranging a
                      private architectural consultation.
                    </span>
                  </label>
                  {errors.consentAccepted && (
                    <p role="alert" className="mt-1.5 text-xs text-[#9A3412]">
                      {errors.consentAccepted}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#141413] px-8 py-4 text-xs font-medium tracking-[0.16em] uppercase text-[#F6F3EC] hover:bg-[#785D37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#785D37]"
                  >
                    <span>Request Private Dossier</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
