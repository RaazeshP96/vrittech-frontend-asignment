import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

export type CartItem = { product: Product; quantity: number };

const MAX_QUANTITY = 99;

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + quantity, MAX_QUANTITY),
                    }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { product, quantity: Math.min(quantity, MAX_QUANTITY) },
            ],
          };
        }),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId
                    ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) }
                    : i,
                ),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cart-storage", version: 1 },
  ),
);

export const selectItemCount = (state: CartState) =>
  state.items.reduce((count, i) => count + i.quantity, 0);

export const selectTotal = (state: CartState) =>
  Math.round(
    state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0) * 100,
  ) / 100;
