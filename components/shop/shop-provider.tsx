'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartMap = Record<string, number>;

type ShopContextValue = {
  favorites: string[];
  cart: CartMap;
  favoritesCount: number;
  cartCount: number;
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

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartMap>({});

  useEffect(() => {
    const rawFavorites = localStorage.getItem(FAVORITES_KEY);
    const rawCart = localStorage.getItem(CART_KEY);

    if (rawFavorites) {
      try {
        const parsed = JSON.parse(rawFavorites) as string[];
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch {
        setFavorites([]);
      }
    }

    if (rawCart) {
      try {
        const parsed = JSON.parse(rawCart) as CartMap;
        setCart(parsed && typeof parsed === 'object' ? parsed : {});
      } catch {
        setCart({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const value = useMemo<ShopContextValue>(() => {
    const favoritesCount = favorites.length;
    const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

    return {
      favorites,
      cart,
      favoritesCount,
      cartCount,
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
  }, [cart, favorites]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);

  if (!ctx) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return ctx;
}
