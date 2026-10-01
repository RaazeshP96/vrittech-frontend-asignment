import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "../types";
import { formatPrice } from "../lib/format";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-white p-6">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardHeader className="space-y-2">
        <Badge variant="secondary" className="w-fit capitalize">
          {product.category}
        </Badge>
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-auto flex items-center justify-between">
        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
        {product.rating && (
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {product.rating.rate} ({product.rating.count})
          </span>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="outline">
          <Link href={`/products/${product.id}`}>View details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
