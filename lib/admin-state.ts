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

export type AdminState = {
  products: Product[];
  categories: ProductCategory[];
  cases: CaseItem[];
  homeContent: HomeContent;
  aboutContent: AboutContent;
  showCalculator: boolean;
  updatedAt?: string;
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

const availabilitySortOrder: Record<NonNullable<Product['availability']>, number> = {
  available: 0,
  preorder: 1,
  out_of_stock: 2,
};

export const defaultAdminState: AdminState = {
  products: sortProductsByAvailability(initialProducts),
  categories: [...initialCategories],
  cases: [...initialCases],
  homeContent: defaultHomeContent,
  aboutContent: defaultAboutContent,
  showCalculator: false,
};

export function sortProductsByAvailability(items: Product[]) {
  return [...items].sort((a, b) => {
    const availabilityDiff = availabilitySortOrder[a.availability ?? 'available'] - availabilitySortOrder[b.availability ?? 'available'];
    if (availabilityDiff !== 0) return availabilityDiff;
    return a.title.localeCompare(b.title);
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

function hydrateStoredProducts(items: Product[]) {
  const sourceProductsBySlug = new Map(initialProducts.map((product) => [product.slug, product]));

  return items
    .filter((product) => product?.slug && product?.title)
    .map((product) => {
      const sourceProduct = sourceProductsBySlug.get(product.slug);
      return normalizeProductImages(
        {
          ...(sourceProduct ?? product),
          ...product,
          image: product.image?.trim() || sourceProduct?.image || product.image,
        },
        sourceProduct?.image || product.image
      );
    });
}

function hydrateCases(items: CaseItem[]) {
  return items
    .filter((item) => item?.slug && item?.title)
    .map((item) => ({
      ...item,
      image: item.image?.trim() || '/illustrations/case-home.svg',
    }));
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
  const products = Array.isArray(source.products)
    ? sortProductsByAvailability(hydrateStoredProducts(source.products))
    : defaultAdminState.products;
  const categories = Array.isArray(source.categories)
    ? source.categories.map((category) => String(category).trim()).filter(Boolean) as ProductCategory[]
    : defaultAdminState.categories;
  const cases = Array.isArray(source.cases) ? hydrateCases(source.cases) : defaultAdminState.cases;
  const updatedAt = typeof source.updatedAt === 'string' && source.updatedAt ? source.updatedAt : undefined;

  return {
    products,
    categories,
    cases,
    homeContent: hydrateHomeContent(source.homeContent),
    aboutContent: hydrateAboutContent(source.aboutContent),
    showCalculator: source.showCalculator === true,
    ...(updatedAt ? { updatedAt } : {}),
  };
}

export function withAdminStateTimestamp(state: AdminStateInput, timestamp = new Date().toISOString()): AdminState {
  return normalizeAdminState({ ...state, updatedAt: timestamp });
}
