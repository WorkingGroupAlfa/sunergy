import { defaultAboutContent, type AboutContent } from '@/data/about-content';
import { defaultHeroBenefits, defaultHomeContent, legacyHeroBenefits, type HomeContent } from '@/data/home-content';
import {
  cases as initialCases,
  categoryOrder as initialCategories,
  products as initialProducts,
  type CaseItem,
  type Product,
  type ProductCategory,
} from '@/data/shop';
import { compareStableText } from '@/lib/utils';

export type AdminState = {
  products: Product[];
  categories: ProductCategory[];
  cases: CaseItem[];
  homeContent: HomeContent;
  aboutContent: AboutContent;
  showCalculator: boolean;
  updatedAt?: string;
  catalogSignature?: string;
};

type AdminStateInput = Omit<Partial<AdminState>, 'homeContent' | 'aboutContent'> & {
  homeContent?: Partial<HomeContent>;
  aboutContent?: Partial<AboutContent>;
};

export const adminStateStorageKeys = {
  products: 'sunergy_admin_products_price_2026_05_01',
  categories: 'sunergy_admin_categories_2026_05_15',
  cases: 'sunergy_admin_cases_2026_05_15',
  homeContent: 'sunergy_admin_home_content_2026_05_15',
  aboutContent: 'sunergy_admin_about_content_2026_05_15_b',
  showCalculator: 'sunergy_admin_show_calculator_2026_05_15',
  meta: 'sunergy_admin_state_meta_2026_05_27',
} as const;

export function isDataImage(value: string | undefined) {
  return Boolean(value?.startsWith('data:image/'));
}

export function sanitizePersistedImage(value: string | undefined, fallback: string) {
  const image = value?.trim();
  if (!image || isDataImage(image)) return fallback;

  return image;
}

export function sanitizeProductForPersistence(product: Product): Product {
  const fallback = '/illustrations/product-battery.svg';
  const image = sanitizePersistedImage(product.image, fallback);
  const images = Array.isArray(product.images)
    ? product.images
        .map((item) => item.trim())
        .filter((item) => item && !isDataImage(item))
    : [];
  const gallery = Array.from(new Set([image, ...images]));

  return normalizeProductImages(
    {
      ...product,
      image,
      images: gallery.length > 1 ? gallery : undefined,
    },
    fallback
  );
}

export function sanitizeCaseForPersistence(item: CaseItem): CaseItem {
  return {
    ...item,
    image: sanitizePersistedImage(item.image, '/illustrations/case-home.svg'),
  };
}

export function sanitizeAboutContentForPersistence(content: AboutContent): AboutContent {
  return {
    ...content,
    image: sanitizePersistedImage(content.image, defaultAboutContent.image),
  };
}

export function sanitizeAdminStateForPersistence(state: AdminState): AdminState {
  return normalizeAdminState({
    ...state,
    products: state.products.map(sanitizeProductForPersistence),
    cases: state.cases.map(sanitizeCaseForPersistence),
    aboutContent: sanitizeAboutContentForPersistence(state.aboutContent),
  });
}

const availabilitySortOrder: Record<NonNullable<Product['availability']>, number> = {
  available: 0,
  preorder: 1,
  out_of_stock: 2,
};

const sourceCatalogSignature = [
  initialProducts.map((product) => product.slug).sort().join('|'),
  initialCategories.slice().sort().join('|'),
  initialCases.map((item) => item.slug).sort().join('|'),
].join('::');

export const defaultAdminState: AdminState = {
  products: sortProductsByAvailability(initialProducts),
  categories: [...initialCategories],
  cases: [...initialCases],
  homeContent: defaultHomeContent,
  aboutContent: defaultAboutContent,
  showCalculator: false,
  catalogSignature: sourceCatalogSignature,
};

export function sortProductsByAvailability(items: Product[]) {
  return [...items].sort((a, b) => {
    const availabilityDiff = availabilitySortOrder[a.availability ?? 'available'] - availabilitySortOrder[b.availability ?? 'available'];
    if (availabilityDiff !== 0) return availabilityDiff;
    return compareStableText(a.title, b.title);
  });
}

export function normalizeProductImages(product: Product, fallback = '/illustrations/product-battery.svg'): Product {
  const mainImage = product.image?.trim() || fallback;
  const gallery = Array.isArray(product.images)
    ? product.images.map((image) => image.trim()).filter(Boolean)
    : [];
  const images = Array.from(new Set([mainImage, ...gallery]));

  return {
    ...product,
    image: mainImage,
    images: images.length > 1 ? images : undefined,
  };
}

function hydrateStoredProducts(items: Product[], shouldMergeSourceProducts: boolean) {
  const sourceProductsBySlug = new Map(initialProducts.map((product) => [product.slug, product]));
  const sourceProductsByTitle = new Map(initialProducts.map((product) => [product.title.normalize('NFKD').toLowerCase(), product]));
  const hydratedProductsBySlug = new Map<string, Product>();

  for (const product of items) {
    if (!product?.slug || !product?.title) continue;

    const sourceProduct =
      sourceProductsBySlug.get(product.slug) ??
      (shouldMergeSourceProducts ? sourceProductsByTitle.get(product.title.normalize('NFKD').toLowerCase()) : undefined);
    const canonicalSlug = sourceProduct?.slug ?? product.slug;
    const hydratedProduct = normalizeProductImages(
      {
        ...(sourceProduct ?? product),
        ...product,
        slug: canonicalSlug,
        image: product.image?.trim() || sourceProduct?.image || product.image,
      },
      sourceProduct?.image || product.image
    );

    hydratedProductsBySlug.set(canonicalSlug, hydratedProduct);
  }

  if (!shouldMergeSourceProducts) return [...hydratedProductsBySlug.values()];

  const missingSourceProducts = initialProducts
    .filter((product) => !hydratedProductsBySlug.has(product.slug))
    .map((product) => normalizeProductImages(product, product.image));

  return [...hydratedProductsBySlug.values(), ...missingSourceProducts];
}

function hydrateCases(items: CaseItem[], shouldMergeSourceCases: boolean) {
  const hydratedCases = items
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      ...item,
      image: item.image?.trim() || '/illustrations/case-home.svg',
    }));
  if (!shouldMergeSourceCases) return hydratedCases;

  const hydratedSlugs = new Set(hydratedCases.map((item) => item.slug));
  const missingSourceCases = initialCases.filter((item) => !hydratedSlugs.has(item.slug));

  return [...hydratedCases, ...missingSourceCases];
}

function sameList(a: string[], b: string[]) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

export function hydrateHomeContent(content: Partial<HomeContent> | undefined): HomeContent {
  const source = content ?? {};
  const benefits = Array.isArray(source.benefits) ? source.benefits : defaultHomeContent.benefits;

  return {
    ...defaultHomeContent,
    ...source,
    benefits: sameList(benefits, legacyHeroBenefits) ? defaultHeroBenefits : benefits,
    featuredProductSlugs: Array.isArray(source.featuredProductSlugs) ? source.featuredProductSlugs.filter(Boolean) : [],
    storageProductSlugs: Array.isArray(source.storageProductSlugs) ? source.storageProductSlugs.filter(Boolean) : [],
  };
}

export function hydrateAboutContent(content: Partial<AboutContent> | undefined): AboutContent {
  const source = content ?? {};

  return {
    ...defaultAboutContent,
    ...source,
    socials: Array.isArray(source.socials) ? source.socials : defaultAboutContent.socials,
  };
}

export function normalizeAdminState(content: AdminStateInput | undefined): AdminState {
  const source = content ?? {};
  const storedCatalogSignature = typeof source.catalogSignature === 'string' ? source.catalogSignature : undefined;
  const shouldMergeSourceState = storedCatalogSignature !== sourceCatalogSignature;
  const products = Array.isArray(source.products)
    ? sortProductsByAvailability(hydrateStoredProducts(source.products, shouldMergeSourceState))
    : defaultAdminState.products;
  const storedCategories = Array.isArray(source.categories)
    ? source.categories.map((category) => String(category).trim()).filter(Boolean) as ProductCategory[]
    : [];
  const categories = Array.isArray(source.categories)
    ? Array.from(new Set([...storedCategories, ...(shouldMergeSourceState ? initialCategories : [])]))
    : defaultAdminState.categories;
  const cases = Array.isArray(source.cases) ? hydrateCases(source.cases, shouldMergeSourceState) : defaultAdminState.cases;
  const updatedAt = typeof source.updatedAt === 'string' && source.updatedAt ? source.updatedAt : undefined;

  return {
    products,
    categories,
    cases,
    homeContent: hydrateHomeContent(source.homeContent),
    aboutContent: hydrateAboutContent(source.aboutContent),
    showCalculator: source.showCalculator === true,
    catalogSignature: sourceCatalogSignature,
    ...(updatedAt ? { updatedAt } : {}),
  };
}

export function withAdminStateTimestamp(state: AdminStateInput, timestamp = new Date().toISOString()): AdminState {
  return normalizeAdminState({ ...state, updatedAt: timestamp });
}
