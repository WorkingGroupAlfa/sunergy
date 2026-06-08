import productsContent from '@/content/products.json';
import categoriesContent from '@/content/categories.json';
import casesContent from '@/content/cases.json';
import homeContentJson from '@/content/home.json';
import aboutContentJson from '@/content/about.json';
import metaContent from '@/content/meta.json';
import {
  defaultAdminState,
  normalizeAdminState,
  sanitizeAdminStateForPersistence,
  type AdminState,
} from '@/lib/admin-state';
import { type AboutContent } from '@/data/about-content';
import { type HomeContent } from '@/data/home-content';
import { type CaseItem, type Product, type ProductCategory } from '@/data/shop';

export const CONTENT_PATHS = {
  products: 'content/products.json',
  categories: 'content/categories.json',
  cases: 'content/cases.json',
  home: 'content/home.json',
  about: 'content/about.json',
  meta: 'content/meta.json',
} as const;

export const UPLOAD_PREFIX = 'public/uploads/admin/';

export type ContentMeta = {
  showCalculator?: boolean;
  updatedAt?: string;
  catalogSignature?: string;
};

export function stateFromContentFiles() {
  return normalizeAdminState({
    products: productsContent as Product[],
    categories: categoriesContent as ProductCategory[],
    cases: casesContent as CaseItem[],
    homeContent: homeContentJson as HomeContent,
    aboutContent: aboutContentJson as AboutContent,
    showCalculator: (metaContent as ContentMeta).showCalculator === true,
    updatedAt: (metaContent as ContentMeta).updatedAt,
    catalogSignature: (metaContent as ContentMeta).catalogSignature,
  });
}

export function contentFilesFromState(state: AdminState, timestamp = new Date().toISOString()) {
  const sanitized = sanitizeAdminStateForPersistence(
    normalizeAdminState({
      ...defaultAdminState,
      ...state,
      updatedAt: timestamp,
    })
  );

  return {
    [CONTENT_PATHS.products]: sanitized.products,
    [CONTENT_PATHS.categories]: sanitized.categories,
    [CONTENT_PATHS.cases]: sanitized.cases,
    [CONTENT_PATHS.home]: sanitized.homeContent,
    [CONTENT_PATHS.about]: sanitized.aboutContent,
    [CONTENT_PATHS.meta]: {
      showCalculator: sanitized.showCalculator,
      updatedAt: timestamp,
      catalogSignature: sanitized.catalogSignature,
    } satisfies ContentMeta,
  };
}

export function isManagedContentPath(path: string) {
  return Object.values(CONTENT_PATHS).includes(path as (typeof CONTENT_PATHS)[keyof typeof CONTENT_PATHS]) || path.startsWith(UPLOAD_PREFIX);
}
