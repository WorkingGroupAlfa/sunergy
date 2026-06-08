'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  deleteRemoteCase,
  deleteRemoteCategory,
  deleteRemoteProduct,
  resetRemoteAboutContent,
  resetRemoteCases,
  resetRemoteCategories,
  resetRemoteHomeContent,
  resetRemoteProducts,
  saveRemoteAboutContent,
  saveRemoteCase,
  saveRemoteCategory,
  saveRemoteHomeContent,
  saveRemoteProduct,
  saveRemoteShowCalculator,
} from '@/lib/admin-client';
import {
  adminStateStorageKeys,
  defaultAdminState,
  hydrateAboutContent,
  hydrateHomeContent,
  normalizeAdminState,
  normalizeProductImages,
  sanitizeAboutContentForPersistence,
  sanitizeCaseForPersistence,
  sanitizeProductForPersistence,
  sortProductsByAvailability,
  withAdminStateTimestamp,
  type AdminState,
} from '@/lib/admin-state';
import { type CaseItem, type Product, type ProductCategory } from '@/data/shop';
import { type HomeContent } from '@/data/home-content';
import { type AboutContent } from '@/data/about-content';

type CartMap = Record<string, number>;

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
  saveProduct: (product: Product, previousSlug?: string) => void;
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

const ShopContext = createContext<ShopContextValue | null>(null);

function readJson<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function clearLocalAdminState() {
  try {
    Object.values(adminStateStorageKeys).forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Не вдалося очистити старі дані адмінки з браузера:', error);
  }
}

function readPersonalState(productList: Product[]) {
  const currentSlugs = new Set(productList.map((product) => product.slug));
  const rawFavorites = readJson<string[]>(FAVORITES_KEY);
  const rawCart = readJson<CartMap>(CART_KEY);

  const favorites = Array.isArray(rawFavorites) ? rawFavorites.filter((slug) => currentSlugs.has(slug)) : [];
  const cart =
    rawCart && typeof rawCart === 'object'
      ? Object.fromEntries(Object.entries(rawCart).filter(([slug]) => currentSlugs.has(slug)))
      : {};

  return { favorites, cart };
}

async function fetchRemoteAdminState() {
  const response = await fetch(`/api/admin-state?ts=${Date.now()}`, {
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' },
  });

  if (!response.ok) {
    throw new Error(`Admin state request failed: ${response.status}`);
  }

  return normalizeAdminState((await response.json()) as Partial<AdminState>);
}

function notifyAdminSaveError(error: unknown) {
  if (typeof window === 'undefined') return;

  const message = error instanceof Error ? error.message : 'Admin save failed.';
  window.dispatchEvent(new CustomEvent('sunergy-admin-state-error', { detail: message }));
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultAdminState.products);
  const [categories, setCategories] = useState<ProductCategory[]>(defaultAdminState.categories);
  const [cases, setCases] = useState<CaseItem[]>(defaultAdminState.cases);
  const [homeContent, setHomeContent] = useState<HomeContent>(defaultAdminState.homeContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAdminState.aboutContent);
  const [showCalculator, setShowCalculatorState] = useState(defaultAdminState.showCalculator);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartMap>({});
  const [storageReady, setStorageReady] = useState(false);
  const adminStateRef = useRef<AdminState>(defaultAdminState);
  const remoteSaveQueueRef = useRef<Promise<void>>(Promise.resolve());

  const applyAdminState = useCallback((state: Partial<AdminState>) => {
    const normalized = normalizeAdminState(state);
    adminStateRef.current = normalized;
    setProducts(normalized.products);
    setCategories(normalized.categories);
    setCases(normalized.cases);
    setHomeContent(normalized.homeContent);
    setAboutContent(normalized.aboutContent);
    setShowCalculatorState(normalized.showCalculator);
    return normalized;
  }, []);

  const buildAdminState = useCallback(
    (overrides: Partial<AdminState> = {}) =>
      normalizeAdminState({
        ...adminStateRef.current,
        ...overrides,
      }),
    []
  );

  const commitAdminChange = useCallback((state: AdminState, remoteWrite: () => Promise<unknown>) => {
    const localState = withAdminStateTimestamp(state);
    adminStateRef.current = localState;
    applyAdminState(localState);
    clearLocalAdminState();

    remoteSaveQueueRef.current = remoteSaveQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        await remoteWrite();
      })
      .catch((error) => {
        console.error(error);
        notifyAdminSaveError(error);
      });
  }, [applyAdminState]);

  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      clearLocalAdminState();

      const provisional = applyAdminState(defaultAdminState);
      const provisionalPersonalState = readPersonalState(provisional.products);

      setFavorites(provisionalPersonalState.favorites);
      setCart(provisionalPersonalState.cart);

      try {
        const remoteState = await fetchRemoteAdminState();
        if (cancelled) return;

        const normalized = applyAdminState(remoteState);
        const personalState = readPersonalState(normalized.products);

        setFavorites(personalState.favorites);
        setCart(personalState.cart);
        clearLocalAdminState();
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setStorageReady(true);
        }
      }
    }

    void loadState();

    return () => {
      cancelled = true;
    };
  }, [applyAdminState]);

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
      saveProduct: (product, previousSlug) => {
        const currentState = adminStateRef.current;
        const normalizedProduct = sanitizeProductForPersistence(normalizeProductImages(product));
        const sourceProducts =
          previousSlug && previousSlug !== normalizedProduct.slug
            ? currentState.products.filter((item) => item.slug !== previousSlug)
            : currentState.products;
        const exists = sourceProducts.some((item) => item.slug === normalizedProduct.slug);
        const nextProducts = sortProductsByAvailability(
          exists ? sourceProducts.map((item) => (item.slug === normalizedProduct.slug ? normalizedProduct : item)) : [normalizedProduct, ...sourceProducts]
        );

        commitAdminChange(buildAdminState({ products: nextProducts }), () => saveRemoteProduct(normalizedProduct, previousSlug));
      },
      deleteProduct: (slug) => {
        const nextProducts = adminStateRef.current.products.filter((item) => item.slug !== slug);

        setFavorites((prev) => prev.filter((item) => item !== slug));
        setCart((prev) => {
          const next = { ...prev };
          delete next[slug];
          return next;
        });
        commitAdminChange(buildAdminState({ products: nextProducts }), () => deleteRemoteProduct(slug));
      },
      resetProducts: () => {
        const nextProducts = defaultAdminState.products;

        commitAdminChange(buildAdminState({ products: nextProducts }), resetRemoteProducts);
      },
      saveCategory: (category, previousCategory) => {
        const currentState = adminStateRef.current;
        const nextCategory = category.trim() as ProductCategory;
        if (!nextCategory) return;

        const withoutPrevious = previousCategory ? currentState.categories.filter((item) => item !== previousCategory) : currentState.categories;
        const nextCategories = Array.from(new Set([...withoutPrevious, nextCategory]));
        const nextProducts =
          previousCategory && previousCategory !== nextCategory
            ? sortProductsByAvailability(currentState.products.map((product) => (product.category === previousCategory ? { ...product, category: nextCategory } : product)))
            : currentState.products;

        commitAdminChange(buildAdminState({ categories: nextCategories, products: nextProducts }), () => saveRemoteCategory(nextCategory, previousCategory));
      },
      deleteCategory: (category) => {
        const currentState = adminStateRef.current;
        if (currentState.products.some((product) => product.category === category)) return false;

        const nextCategories = currentState.categories.filter((item) => item !== category);
        commitAdminChange(buildAdminState({ categories: nextCategories }), () => deleteRemoteCategory(category));
        return true;
      },
      resetCategories: () => {
        const nextCategories = defaultAdminState.categories;

        commitAdminChange(buildAdminState({ categories: nextCategories }), resetRemoteCategories);
      },
      saveCase: (item, previousSlug) => {
        const sanitized = sanitizeCaseForPersistence(item);
        const currentCases = adminStateRef.current.cases;
        const withoutPrevious = previousSlug ? currentCases.filter((caseItem) => caseItem.slug !== previousSlug) : currentCases;
        const exists = withoutPrevious.some((caseItem) => caseItem.slug === sanitized.slug);
        const nextCases = exists ? withoutPrevious.map((caseItem) => (caseItem.slug === sanitized.slug ? sanitized : caseItem)) : [sanitized, ...withoutPrevious];

        commitAdminChange(buildAdminState({ cases: nextCases }), () => saveRemoteCase(sanitized, previousSlug));
      },
      deleteCase: (slug) => {
        const nextCases = adminStateRef.current.cases.filter((item) => item.slug !== slug);

        commitAdminChange(buildAdminState({ cases: nextCases }), () => deleteRemoteCase(slug));
      },
      resetCases: () => {
        const nextCases = defaultAdminState.cases;

        commitAdminChange(buildAdminState({ cases: nextCases }), resetRemoteCases);
      },
      saveHomeContent: (content) => {
        const nextHomeContent = hydrateHomeContent(content);

        commitAdminChange(buildAdminState({ homeContent: nextHomeContent }), () => saveRemoteHomeContent(nextHomeContent));
      },
      resetHomeContent: () => {
        const nextHomeContent = defaultAdminState.homeContent;

        commitAdminChange(buildAdminState({ homeContent: nextHomeContent }), resetRemoteHomeContent);
      },
      saveAboutContent: (content) => {
        const nextAboutContent = sanitizeAboutContentForPersistence(hydrateAboutContent(content));

        commitAdminChange(buildAdminState({ aboutContent: nextAboutContent }), () => saveRemoteAboutContent(nextAboutContent));
      },
      resetAboutContent: () => {
        const nextAboutContent = defaultAdminState.aboutContent;

        commitAdminChange(buildAdminState({ aboutContent: nextAboutContent }), resetRemoteAboutContent);
      },
      setShowCalculator: (nextValue) => {
        commitAdminChange(buildAdminState({ showCalculator: nextValue }), () => saveRemoteShowCalculator(nextValue));
      },
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
  }, [
    aboutContent,
    buildAdminState,
    cart,
    cases,
    categories,
    commitAdminChange,
    favorites,
    homeContent,
    products,
    showCalculator,
    storageReady,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return ctx;
}
