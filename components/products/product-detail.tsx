import Image from "next/image";
import type { ReactNode } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductRating } from "./product-rating";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";

type ProductDetailProps = {
  product: Product;
  actions?: ReactNode; // the cart button slot
};

export const ProductDetail = ({ product, actions }: ProductDetailProps) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <AspectRatio ratio={1} className="bg-white">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-10"
            />
          </AspectRatio>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Badge variant="secondary" className="capitalize">
          {product.category}
        </Badge>

        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <ProductRating rating={product.rating} />

        <p className="text-3xl font-bold">{formatPrice(product.price)}</p>

        <Separator />

        <section aria-labelledby="description-heading" className="space-y-2">
          <h2 id="description-heading" className="text-lg font-semibold">
            Description
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </section>

        {actions && (
          <>
            <Separator />
            {actions}
          </>
        )}
      </div>
    </div>
  );
};
