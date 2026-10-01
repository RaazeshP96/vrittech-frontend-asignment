"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { selectItemCount, useCartStore } from "@/app/store/cart-store";
import { useMounted } from "@/app/lib/hooks/use-mounted";

export function CartBadge() {
  const count = useCartStore(selectItemCount);
  const mounted = useMounted();
  const showCount = mounted && count > 0;

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Link
        href="/cart"
        aria-label={showCount ? `Cart, ${count} items` : "Cart"}
      >
        <ShoppingCart className="h-5 w-5" />
        {showCount && (
          <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1">
            {count}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
