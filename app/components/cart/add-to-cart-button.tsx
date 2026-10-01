"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/types";
import { useCartStore } from "@/app/store/cart-store";
import { QuantitySelector } from "./quantity-selector";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × ${product.title}`, {
      description: "Item added to your cart.",
      action: {
        label: "View cart",
        onClick: () => window.location.assign("/cart"),
      },
    });
    setQuantity(1);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantitySelector value={quantity} onChange={setQuantity} />
      <Button size="lg" onClick={handleAdd} className="flex-1 sm:flex-none">
        <ShoppingCart />
        Add to cart
      </Button>
    </div>
  );
}
