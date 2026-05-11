'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products as initialProducts, type Product } from '@/data/shop';

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

const sourceProductsBySlug = new Map(initialProducts.map((product) => [product.slug, product]));

function hydrateStoredProducts(items: Product[]) {
  const storedProductsBySlug = new Map(items.map((product) => [product.slug, product]));

  return initialProducts.map((sourceProduct) => {
    const storedProduct = storedProductsBySlug.get(sourceProduct.slug);
    if (!storedProduct) return sourceProduct;

    return {
      ...storedProduct,
      image: sourceProduct.image,
    };
  });
}

type ShopContextValue = {
  products: Product[];
  favorites: string[];
  cart: CartMap;
  favoritesCount: number;
  cartCount: number;
  saveProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
  resetProducts: () => void;
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

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => sortProductsByAvailability(initialProducts));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartMap>({});
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const rawProducts = localStorage.getItem(PRODUCTS_KEY);
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

    if (rawFavorites) {
      try {
        const parsed = JSON.parse(rawFavorites) as string[];
        setFavorites(Array.isArray(parsed) ? parsed.filter((slug) => sourceProductsBySlug.has(slug)) : []);
      } catch {
        setFavorites([]);
      }
    }

    if (rawCart) {
      try {
        const parsed = JSON.parse(rawCart) as CartMap;
        const currentCart =
          parsed && typeof parsed === 'object'
            ? Object.fromEntries(Object.entries(parsed).filter(([slug]) => sourceProductsBySlug.has(slug)))
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
      favorites,
      cart,
      favoritesCount,
      cartCount,
      saveProduct: (product) => {
        setProducts((prev) => {
          const exists = prev.some((item) => item.slug === product.slug);
          const next = exists ? prev.map((item) => (item.slug === product.slug ? product : item)) : [product, ...prev];
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
  }, [cart, favorites, products]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return ctx;
}
