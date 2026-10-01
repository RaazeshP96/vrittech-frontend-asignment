"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { QuantitySelector } from "./quantity-selector";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useMounted } from "@/lib/hooks/use-mounted";
import { selectItemCount, selectTotal, useCartStore } from "@/store/cart-store";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/format";

export const CartView = () => {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const total = useCartStore(selectTotal);
  const count = useCartStore(selectItemCount);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);

  const handleRemove = (item: CartItem) => {
    removeItem(item.product.id);
    toast("Removed from cart", {
      description: item.product.title,
      action: {
        label: "Undo",
        onClick: () => addItem(item.product, item.quantity),
      },
    });
  };

  if (!mounted) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>
            Add something from the products page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Link href="/products">Browse products</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <Card>
              <CardContent className="flex gap-4 p-4">
                <div className="relative h-24 w-24 shrink-0 rounded-md bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="line-clamp-2 font-medium hover:underline"
                    >
                      {product.title}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${product.title}`}
                      onClick={() => handleRemove({ product, quantity })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <QuantitySelector
                      value={quantity}
                      min={0}
                      onChange={(q) => setQuantity(product.id, q)}
                    />
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(product.price * quantity)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(product.price)} each
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span>{count}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="outline" className="w-full">
                Clear cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This removes all ${count} items. You can't undo this.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clear}>
                  Clear cart
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};
