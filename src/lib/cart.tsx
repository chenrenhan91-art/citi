"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "./products";
import type { Product, ProductVariant } from "./types";
import { quoteShipping, type ShippingQuote } from "./shipping";

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type HydratedLine = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: HydratedLine[];
  count: number;
  subtotal: number;
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
  quote: (countryCode: string) => ShippingQuote;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dye-cart-v1";

function hydrate(items: CartItem[]): HydratedLine[] {
  const lines: HydratedLine[] = [];
  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId);
    const variant = product?.variants.find((entry) => entry.id === item.variantId);
    if (!product || !variant) continue;
    lines.push({
      product,
      variant,
      quantity: item.quantity,
      lineTotal: variant.price * item.quantity,
    });
  }
  return lines;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback(
    (productId: string, variantId: string, quantity = 1) => {
      setItems((current) => {
        const index = current.findIndex(
          (item) => item.productId === productId && item.variantId === variantId,
        );
        if (index === -1) {
          return [...current, { productId, variantId, quantity }];
        }
        const next = [...current];
        next[index] = {
          ...next[index],
          quantity: next[index].quantity + quantity,
        };
        return next;
      });
    },
    [],
  );

  const setQuantity = useCallback(
    (productId: string, variantId: string, quantity: number) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter(
            (item) => !(item.productId === productId && item.variantId === variantId),
          );
        }
        return current.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity }
            : item,
        );
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.variantId === variantId),
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo(() => hydrate(items), [items]);
  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );

  const quote = useCallback(
    (countryCode: string) =>
      quoteShipping(
        lines.map((line) => ({
          shipClass: line.product.shipClass,
          lineTotal: line.lineTotal,
        })),
        countryCode,
      ),
    [lines],
  );

  const value = useMemo(
    () => ({
      items,
      lines,
      count,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      clear,
      quote,
    }),
    [items, lines, count, subtotal, addItem, setQuantity, removeItem, clear, quote],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
