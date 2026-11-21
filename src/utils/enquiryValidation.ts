import type {
  Development,
  DevelopmentCategory,
  GalleryPlate,
} from '../data/developments';

export type ViewingFormat = 'In-Person Private Tour' | 'Architectural Digital Walkthrough';

export interface EnquiryFormValues {
  fullName: string;
  email: string;
  phone: string;
  developmentId: string;
  viewingFormat: ViewingFormat;
  message: string;
  consentAccepted: boolean;
}

export interface EnquiryValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  developmentId?: string;
  consentAccepted?: string;
}

export interface EnquiryValidationResult {
  isValid: boolean;
  errors: EnquiryValidationErrors;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d\s().-]{7,24}$/;

export function validateEnquiryForm(values: EnquiryFormValues): EnquiryValidationResult {
  const errors: EnquiryValidationErrors = {};

  const trimmedName = values.fullName.trim();
  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = 'An email address is required to dispatch your private dossier.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  const trimmedPhone = values.phone.trim();
  if (trimmedPhone && !PHONE_REGEX.test(trimmedPhone)) {
    errors.phone = 'Please enter a valid telephone number or leave this field blank.';
  }

  if (!values.developmentId.trim()) {
    errors.developmentId = 'Please select a commission or General Portfolio.';
  }

  if (!values.consentAccepted) {
    errors.consentAccepted = 'Please acknowledge our private consultation privacy terms.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterDevelopments(
  developments: Development[],
  category: DevelopmentCategory,
): Development[] {
  if (category === 'All') {
    return developments;
  }
  return developments.filter((dev) => dev.category === category);
}

export function filterGalleryItems(
  items: GalleryPlate[],
  category: 'All' | GalleryPlate['category'],
): GalleryPlate[] {
  if (category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

export function formatDossierReference(developmentId: string, timestampMs: number): string {
  const prefix = developmentId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 3) || 'AE';
  const suffix = String(Math.abs(timestampMs) % 10000).padStart(4, '0');
  return `AE-${prefix}-${suffix}`;
}

export function wrapCarouselIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return (current + delta + total) % total;
}
