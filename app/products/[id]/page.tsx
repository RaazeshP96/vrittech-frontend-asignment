import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AddToCartButton, ProductDetail } from "@/app/components";
import { getProduct } from "@/app/lib/api/product";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!/^\d+$/.test(id)) notFound();

  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 max-w-[16rem] sm:max-w-md">
              {product.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductDetail
        product={product}
        actions={<AddToCartButton product={product} />}
      />
    </main>
  );
};

export default ProductPage;
