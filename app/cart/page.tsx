import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your cart</h1>
      <CartView />
    </main>
  );
}
