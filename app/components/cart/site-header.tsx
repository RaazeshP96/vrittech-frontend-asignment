import Link from "next/link";
import { CartBadge } from "./cart-badge";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/products" className="text-lg font-bold">
          Store
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2">
          <Link href="/products" className="text-sm hover:underline">
            Products
          </Link>
          <CartBadge />
        </nav>
      </div>
    </header>
  );
};
