'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ADMIN_PASSWORD, ADMIN_PASSWORD_KEY } from '@/lib/admin-auth';
import {
  adminStateStorageKeys,
  defaultAdminState,
  hydrateAboutContent,
  hydrateHomeContent,
  normalizeAdminState,
  normalizeProductImages,
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

function getUpdatedAtTime(value: string | undefined) {
  if (!value) return 0;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

function readJson<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function readLocalAdminSnapshot() {
  const products = readJson<Product[]>(adminStateStorageKeys.products);
  const categories = readJson<ProductCategory[]>(adminStateStorageKeys.categories);
  const cases = readJson<CaseItem[]>(adminStateStorageKeys.cases);
  const homeContent = readJson<Partial<HomeContent>>(adminStateStorageKeys.homeContent);
  const aboutContent = readJson<Partial<AboutContent>>(adminStateStorageKeys.aboutContent);
  const rawShowCalculator = localStorage.getItem(adminStateStorageKeys.showCalculator);
  const rawMeta = localStorage.getItem(adminStateStorageKeys.meta);
  const meta = readJson<{ updatedAt?: string }>(adminStateStorageKeys.meta);
  const hasAdminData = Boolean(products || categories || cases || homeContent || aboutContent || rawShowCalculator !== null);

  if (!hasAdminData && !rawMeta) return null;

  const state = normalizeAdminState({
    ...(products ? { products } : {}),
    ...(categories ? { categories } : {}),
    ...(cases ? { cases } : {}),
    ...(homeContent ? { homeContent } : {}),
    ...(aboutContent ? { aboutContent } : {}),
    ...(rawShowCalculator !== null ? { showCalculator: rawShowCalculator === 'true' } : {}),
    ...(meta?.updatedAt ? { updatedAt: meta.updatedAt } : {}),
  });

  return {
    state,
    hasLegacyData: hasAdminData && !rawMeta,
  };
}

function writeLocalAdminState(state: AdminState) {
  try {
    localStorage.setItem(adminStateStorageKeys.products, JSON.stringify(state.products));
    localStorage.setItem(adminStateStorageKeys.categories, JSON.stringify(state.categories));
    localStorage.setItem(adminStateStorageKeys.cases, JSON.stringify(state.cases));
    localStorage.setItem(adminStateStorageKeys.homeContent, JSON.stringify(state.homeContent));
    localStorage.setItem(adminStateStorageKeys.aboutContent, JSON.stringify(state.aboutContent));
    localStorage.setItem(adminStateStorageKeys.showCalculator, JSON.stringify(state.showCalculator));
    localStorage.setItem(adminStateStorageKeys.meta, JSON.stringify({ updatedAt: state.updatedAt ?? null }));
  } catch (error) {
    console.warn('Unable to save admin state to localStorage:', error);
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

async function saveRemoteAdminState(state: AdminState) {
  const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || ADMIN_PASSWORD;
  const response = await fetch('/api/admin-state', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'x-admin-password': password,
    },
    body: JSON.stringify(state),
  });

  if (!response.ok) {
    throw new Error(`Admin state save failed: ${response.status}`);
  }

  return normalizeAdminState((await response.json()) as Partial<AdminState>);
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
  const saveRevisionRef = useRef(0);

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

  const persistAdminState = useCallback((state: Partial<AdminState>) => {
    const localState = withAdminStateTimestamp({
      ...adminStateRef.current,
      ...state,
    });
    const revision = saveRevisionRef.current + 1;
    saveRevisionRef.current = revision;
    adminStateRef.current = localState;
    writeLocalAdminState(localState);

    remoteSaveQueueRef.current = remoteSaveQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        const remoteState = await saveRemoteAdminState(localState);
        if (revision !== saveRevisionRef.current) return;

        adminStateRef.current = remoteState;
        writeLocalAdminState(remoteState);
        applyAdminState(remoteState);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [applyAdminState]);

  useEffect(() => {
    let cancelled = false;

    async function loadState() {
      const localSnapshot = readLocalAdminSnapshot();
      const provisionalState = localSnapshot?.state ?? defaultAdminState;
      const provisional = applyAdminState(provisionalState);
      const provisionalPersonalState = readPersonalState(provisional.products);

      setFavorites(provisionalPersonalState.favorites);
      setCart(provisionalPersonalState.cart);

      try {
        const remoteState = await fetchRemoteAdminState();
        if (cancelled) return;

        const latestLocalState = adminStateRef.current;
        const latestLocalTime = getUpdatedAtTime(latestLocalState.updatedAt);
        const remoteTime = getUpdatedAtTime(remoteState.updatedAt);
        const shouldPromoteLocal = latestLocalTime > remoteTime || Boolean(localSnapshot?.hasLegacyData && remoteTime === 0);
        const chosenState = shouldPromoteLocal ? withAdminStateTimestamp(latestLocalState) : remoteState;
        const normalized = applyAdminState(chosenState);
        const personalState = readPersonalState(normalized.products);

        setFavorites(personalState.favorites);
        setCart(personalState.cart);
        writeLocalAdminState(normalized);

        if (shouldPromoteLocal) {
          persistAdminState(normalized);
        }
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
  }, [applyAdminState, persistAdminState]);

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
        const normalizedProduct = normalizeProductImages(product);
        const sourceProducts =
          previousSlug && previousSlug !== normalizedProduct.slug
            ? currentState.products.filter((item) => item.slug !== previousSlug)
            : currentState.products;
        const exists = sourceProducts.some((item) => item.slug === normalizedProduct.slug);
        const nextProducts = sortProductsByAvailability(
          exists ? sourceProducts.map((item) => (item.slug === normalizedProduct.slug ? normalizedProduct : item)) : [normalizedProduct, ...sourceProducts]
        );

        setProducts(nextProducts);
        persistAdminState(buildAdminState({ products: nextProducts }));
      },
      deleteProduct: (slug) => {
        const nextProducts = adminStateRef.current.products.filter((item) => item.slug !== slug);

        setProducts(nextProducts);
        setFavorites((prev) => prev.filter((item) => item !== slug));
        setCart((prev) => {
          const next = { ...prev };
          delete next[slug];
          return next;
        });
        persistAdminState(buildAdminState({ products: nextProducts }));
      },
      resetProducts: () => {
        const nextProducts = defaultAdminState.products;

        setProducts(nextProducts);
        persistAdminState(buildAdminState({ products: nextProducts }));
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

        setCategories(nextCategories);
        setProducts(nextProducts);
        persistAdminState(buildAdminState({ categories: nextCategories, products: nextProducts }));
      },
      deleteCategory: (category) => {
        const currentState = adminStateRef.current;
        if (currentState.products.some((product) => product.category === category)) return false;

        const nextCategories = currentState.categories.filter((item) => item !== category);
        setCategories(nextCategories);
        persistAdminState(buildAdminState({ categories: nextCategories }));
        return true;
      },
      resetCategories: () => {
        const nextCategories = defaultAdminState.categories;

        setCategories(nextCategories);
        persistAdminState(buildAdminState({ categories: nextCategories }));
      },
      saveCase: (item, previousSlug) => {
        const currentCases = adminStateRef.current.cases;
        const withoutPrevious = previousSlug ? currentCases.filter((caseItem) => caseItem.slug !== previousSlug) : currentCases;
        const exists = withoutPrevious.some((caseItem) => caseItem.slug === item.slug);
        const nextCases = exists ? withoutPrevious.map((caseItem) => (caseItem.slug === item.slug ? item : caseItem)) : [item, ...withoutPrevious];

        setCases(nextCases);
        persistAdminState(buildAdminState({ cases: nextCases }));
      },
      deleteCase: (slug) => {
        const nextCases = adminStateRef.current.cases.filter((item) => item.slug !== slug);

        setCases(nextCases);
        persistAdminState(buildAdminState({ cases: nextCases }));
      },
      resetCases: () => {
        const nextCases = defaultAdminState.cases;

        setCases(nextCases);
        persistAdminState(buildAdminState({ cases: nextCases }));
      },
      saveHomeContent: (content) => {
        const nextHomeContent = hydrateHomeContent(content);

        setHomeContent(nextHomeContent);
        persistAdminState(buildAdminState({ homeContent: nextHomeContent }));
      },
      resetHomeContent: () => {
        const nextHomeContent = defaultAdminState.homeContent;

        setHomeContent(nextHomeContent);
        persistAdminState(buildAdminState({ homeContent: nextHomeContent }));
      },
      saveAboutContent: (content) => {
        const nextAboutContent = hydrateAboutContent(content);

        setAboutContent(nextAboutContent);
        persistAdminState(buildAdminState({ aboutContent: nextAboutContent }));
      },
      resetAboutContent: () => {
        const nextAboutContent = defaultAdminState.aboutContent;

        setAboutContent(nextAboutContent);
        persistAdminState(buildAdminState({ aboutContent: nextAboutContent }));
      },
      setShowCalculator: (nextValue) => {
        setShowCalculatorState(nextValue);
        persistAdminState(buildAdminState({ showCalculator: nextValue }));
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
    favorites,
    homeContent,
    persistAdminState,
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
