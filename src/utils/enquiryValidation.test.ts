import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEnquiryForm,
  filterDevelopments,
  filterGalleryItems,
  formatDossierReference,
  wrapCarouselIndex,
  type EnquiryFormValues,
} from './enquiryValidation';
import { DEVELOPMENTS, GALLERY_PLATES } from '../data/developments';

const validPayload: EnquiryFormValues = {
  fullName: 'Elena Visconti',
  email: 'elena.visconti@example.com',
  phone: '+41 44 580 12 90',
  developmentId: 'villa-aurelia',
  viewingFormat: 'In-Person Private Tour',
  message: 'Interested in the Belvedere Penthouse architectural plans.',
  consentAccepted: true,
};

test('validateEnquiryForm accepts valid complete submission', () => {
  const result = validateEnquiryForm(validPayload);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateEnquiryForm rejects empty required fields and invalid email', () => {
  const result = validateEnquiryForm({
    fullName: ' ',
    email: 'not-an-email',
    phone: '12',
    developmentId: '',
    viewingFormat: 'In-Person Private Tour',
    message: '',
    consentAccepted: false,
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.developmentId);
  assert.ok(result.errors.consentAccepted);
});

test('validateEnquiryForm allows optional blank phone number', () => {
  const result = validateEnquiryForm({
    ...validPayload,
    phone: '',
  });
  assert.equal(result.isValid, true);
});

test('filterDevelopments filters accurately by architectural setting', () => {
  assert.equal(filterDevelopments(DEVELOPMENTS, 'All').length, DEVELOPMENTS.length);
  const lakeside = filterDevelopments(DEVELOPMENTS, 'Lakeside');
  assert.equal(lakeside.length, 1);
  assert.equal(lakeside[0].id, 'villa-aurelia');
});

test('filterGalleryItems filters plates by category', () => {
  assert.equal(filterGalleryItems(GALLERY_PLATES, 'All').length, GALLERY_PLATES.length);
  const interiors = filterGalleryItems(GALLERY_PLATES, 'Interiors');
  assert.ok(interiors.length > 0);
  assert.ok(interiors.every((plate) => plate.category === 'Interiors'));
});

test('formatDossierReference creates deterministic uppercase dossier ID', () => {
  assert.equal(formatDossierReference('villa-aurelia', 1795239841234), 'AE-VA-1234');
  assert.equal(formatDossierReference('general-portfolio', 1795239840007), 'AE-GP-0007');
});

test('wrapCarouselIndex wraps cleanly in both forward and backward directions', () => {
  assert.equal(wrapCarouselIndex(0, -1, 5), 4);
  assert.equal(wrapCarouselIndex(4, 1, 5), 0);
  assert.equal(wrapCarouselIndex(2, 1, 5), 3);
});
