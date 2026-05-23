'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cases as initialCases, categoryOrder as initialCategories, products as initialProducts, type CaseItem, type Product, type ProductCategory } from '@/data/shop';
import { defaultHeroBenefits, defaultHomeContent, legacyHeroBenefits, type HomeContent } from '@/data/home-content';
import { defaultAboutContent, type AboutContent } from '@/data/about-content';

type CartMap = Record<string, number>;

const availabilitySortOrder: Record<NonNullable<Product['availability']>, number> = {
  available: 0,
  preorder: 1,
  out_of_stock: 2,
};

function sortProductsByAvailability(items: Product[]) {
  return [...items].sort((a, b) => {
    const availabilityDiff = availabilitySortOrder[a.availability ?? 'available'] - availabilitySortOrder[b.availability ?? 'available'];
    if (availabilityDiff !== 0) return availabilityDiff;
    return a.title.localeCompare(b.title);
  });
}

function normalizeProductImages(product: Product, fallback = '/illustrations/product-battery.svg'): Product {
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
  const storedProductsBySlug = new Map(items.map((product) => [product.slug, product]));

  const hydratedSourceProducts = initialProducts.map((sourceProduct) => {
    const storedProduct = storedProductsBySlug.get(sourceProduct.slug);
    if (!storedProduct) return sourceProduct;

    return {
      ...normalizeProductImages({
        ...sourceProduct,
        ...storedProduct,
        image: storedProduct.image?.trim() || sourceProduct.image,
      }, sourceProduct.image),
    };
  });

  const customProducts = items
    .filter((product) => !sourceProductsBySlug.has(product.slug) && product.slug && product.title)
    .map((product) => normalizeProductImages(product));

  return [...customProducts, ...hydratedSourceProducts];
}

function sameList(a: string[], b: string[]) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function hydrateHomeContent(content: Partial<HomeContent>) {
  const benefits = Array.isArray(content.benefits) ? content.benefits : defaultHomeContent.benefits;

  return {
    ...defaultHomeContent,
    ...content,
    benefits: sameList(benefits, legacyHeroBenefits) ? defaultHeroBenefits : benefits,
    featuredProductSlugs: Array.isArray(content.featuredProductSlugs) ? content.featuredProductSlugs.filter(Boolean) : [],
    storageProductSlugs: Array.isArray(content.storageProductSlugs) ? content.storageProductSlugs.filter(Boolean) : [],
  };
}

type ShopContextValue = {
  products: Product[];
  categories: ProductCategory[];
  cases: CaseItem[];
  homeContent: HomeContent;
  aboutContent: AboutContent;
  showCalculator: boolean;
  favorites: string[];
  cart: CartMap;
  storageReady: boolean;
  favoritesCount: number;
  cartCount: number;
  saveProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
  resetProducts: () => void;
  saveCategory: (category: ProductCategory, previousCategory?: ProductCategory) => void;
  deleteCategory: (category: ProductCategory) => boolean;
  resetCategories: () => void;
  saveCase: (item: CaseItem, previousSlug?: string) => void;
  deleteCase: (slug: string) => void;
  resetCases: () => void;
  saveHomeContent: (content: HomeContent) => void;
  resetHomeContent: () => void;
  saveAboutContent: (content: AboutContent) => void;
  resetAboutContent: () => void;
  setShowCalculator: (value: boolean) => void;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  addToCart: (slug: string) => void;
  setCartQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
};

const FAVORITES_KEY = 'sunergy_favorites';
const CART_KEY = 'sunergy_cart';
const PRODUCTS_KEY = 'sunergy_admin_products_price_2026_05_01';
const CATEGORIES_KEY = 'sunergy_admin_categories_2026_05_15';
const CASES_KEY = 'sunergy_admin_cases_2026_05_15';
const HOME_CONTENT_KEY = 'sunergy_admin_home_content_2026_05_15';
const ABOUT_CONTENT_KEY = 'sunergy_admin_about_content_2026_05_15_b';
const SHOW_CALCULATOR_KEY = 'sunergy_admin_show_calculator_2026_05_15';

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => sortProductsByAvailability(initialProducts));
  const [categories, setCategories] = useState<ProductCategory[]>(() => [...initialCategories]);
  const [cases, setCases] = useState<CaseItem[]>(() => [...initialCases]);
  const [homeContent, setHomeContent] = useState<HomeContent>(defaultHomeContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [showCalculator, setShowCalculator] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartMap>({});
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const rawProducts = localStorage.getItem(PRODUCTS_KEY);
    const rawCategories = localStorage.getItem(CATEGORIES_KEY);
    const rawCases = localStorage.getItem(CASES_KEY);
    const rawHomeContent = localStorage.getItem(HOME_CONTENT_KEY);
    const rawAboutContent = localStorage.getItem(ABOUT_CONTENT_KEY);
    const rawShowCalculator = localStorage.getItem(SHOW_CALCULATOR_KEY);
    const rawFavorites = localStorage.getItem(FAVORITES_KEY);
    const rawCart = localStorage.getItem(CART_KEY);

    if (rawProducts) {
      try {
        const parsed = JSON.parse(rawProducts) as Product[];
        setProducts(Array.isArray(parsed) ? sortProductsByAvailability(hydrateStoredProducts(parsed)) : sortProductsByAvailability(initialProducts));
      } catch {
        setProducts(sortProductsByAvailability(initialProducts));
      }
    }

    if (rawCategories) {
      try {
        const parsed = JSON.parse(rawCategories) as ProductCategory[];
        setCategories(Array.isArray(parsed) ? parsed.filter(Boolean) : [...initialCategories]);
      } catch {
        setCategories([...initialCategories]);
      }
    }

    if (rawCases) {
      try {
        const parsed = JSON.parse(rawCases) as CaseItem[];
        setCases(Array.isArray(parsed) ? parsed : [...initialCases]);
      } catch {
        setCases([...initialCases]);
      }
    }

    if (rawHomeContent) {
      try {
        const parsed = JSON.parse(rawHomeContent) as Partial<HomeContent>;
        setHomeContent(hydrateHomeContent(parsed));
      } catch {
        setHomeContent(defaultHomeContent);
      }
    }

    if (rawAboutContent) {
      try {
        const parsed = JSON.parse(rawAboutContent) as Partial<AboutContent>;
        setAboutContent({
          ...defaultAboutContent,
          ...parsed,
          socials: Array.isArray(parsed.socials) ? parsed.socials : defaultAboutContent.socials,
        });
      } catch {
        setAboutContent(defaultAboutContent);
      }
    }

    if (rawShowCalculator) {
      setShowCalculator(rawShowCalculator === 'true');
    }

    if (rawFavorites) {
      try {
        const parsed = JSON.parse(rawFavorites) as string[];
        const currentSlugs = new Set(products.map((product) => product.slug));
        setFavorites(Array.isArray(parsed) ? parsed.filter((slug) => currentSlugs.has(slug)) : []);
      } catch {
        setFavorites([]);
      }
    }

    if (rawCart) {
      try {
        const parsed = JSON.parse(rawCart) as CartMap;
        const currentSlugs = new Set(products.map((product) => product.slug));
        const currentCart =
          parsed && typeof parsed === 'object'
            ? Object.fromEntries(Object.entries(parsed).filter(([slug]) => currentSlugs.has(slug)))
            : {};
        setCart(currentCart);
      } catch {
        setCart({});
      }
    }

    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
  }, [cases, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(HOME_CONTENT_KEY, JSON.stringify(homeContent));
  }, [homeContent, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(ABOUT_CONTENT_KEY, JSON.stringify(aboutContent));
  }, [aboutContent, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(SHOW_CALCULATOR_KEY, JSON.stringify(showCalculator));
  }, [showCalculator, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, storageReady]);

  const value = useMemo<ShopContextValue>(() => {
    const favoritesCount = favorites.length;
    const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

    return {
      products,
      categories,
      cases,
      homeContent,
      aboutContent,
      showCalculator,
      favorites,
      cart,
      storageReady,
      favoritesCount,
      cartCount,
      saveProduct: (product) => {
        const normalizedProduct = normalizeProductImages(product);
        setProducts((prev) => {
          const exists = prev.some((item) => item.slug === normalizedProduct.slug);
          const next = exists ? prev.map((item) => (item.slug === normalizedProduct.slug ? normalizedProduct : item)) : [normalizedProduct, ...prev];
          return sortProductsByAvailability(next);
        });
      },
      deleteProduct: (slug) => {
        setProducts((prev) => prev.filter((item) => item.slug !== slug));
        setFavorites((prev) => prev.filter((item) => item !== slug));
        setCart((prev) => {
          const next = { ...prev };
          delete next[slug];
          return next;
        });
      },
      resetProducts: () => setProducts(sortProductsByAvailability(initialProducts)),
      saveCategory: (category, previousCategory) => {
        const nextCategory = category.trim() as ProductCategory;
        if (!nextCategory) return;

        setCategories((prev) => {
          const withoutPrevious = previousCategory ? prev.filter((item) => item !== previousCategory) : prev;
          return Array.from(new Set([...withoutPrevious, nextCategory]));
        });

        if (previousCategory && previousCategory !== nextCategory) {
          setProducts((prev) =>
            sortProductsByAvailability(prev.map((product) => (product.category === previousCategory ? { ...product, category: nextCategory } : product)))
          );
        }
      },
      deleteCategory: (category) => {
        if (products.some((product) => product.category === category)) return false;
        setCategories((prev) => prev.filter((item) => item !== category));
        return true;
      },
      resetCategories: () => setCategories([...initialCategories]),
      saveCase: (item, previousSlug) => {
        setCases((prev) => {
          const withoutPrevious = previousSlug ? prev.filter((caseItem) => caseItem.slug !== previousSlug) : prev;
          const exists = withoutPrevious.some((caseItem) => caseItem.slug === item.slug);
          return exists ? withoutPrevious.map((caseItem) => (caseItem.slug === item.slug ? item : caseItem)) : [item, ...withoutPrevious];
        });
      },
      deleteCase: (slug) => setCases((prev) => prev.filter((item) => item.slug !== slug)),
      resetCases: () => setCases([...initialCases]),
      saveHomeContent: (content) => setHomeContent(hydrateHomeContent(content)),
      resetHomeContent: () => setHomeContent(defaultHomeContent),
      saveAboutContent: (content) => setAboutContent({ ...defaultAboutContent, ...content }),
      resetAboutContent: () => setAboutContent(defaultAboutContent),
      setShowCalculator,
      isFavorite: (slug) => favorites.includes(slug),
      toggleFavorite: (slug) => {
        setFavorites((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
      },
      addToCart: (slug) => {
        setCart((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + 1 }));
      },
      setCartQty: (slug, qty) => {
        setCart((prev) => {
          if (qty <= 0) {
            const next = { ...prev };
            delete next[slug];
            return next;
          }

          return { ...prev, [slug]: qty };
        });
      },
      removeFromCart: (slug) => {
        setCart((prev) => {
          const next = { ...prev };
          delete next[slug];
          return next;
        });
      },
      clearCart: () => setCart({}),
    };
  }, [aboutContent, cart, cases, categories, favorites, homeContent, products, showCalculator, storageReady]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return ctx;
}
