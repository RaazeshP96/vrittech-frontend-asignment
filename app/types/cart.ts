import { Product } from "./products";

export type CartItem = { product: Product; quantity: number };

export type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
};
