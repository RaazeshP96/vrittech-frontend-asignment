import { ProductsExplorer, SortLinks } from "../components";
import { getCategories, getProducts } from "../lib/api/product";
import { SORT_ORDER } from "../lib/constant";
import { SortOrder } from "../types";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) => {
  const params = await searchParams;
  const sort: SortOrder | undefined =
    params.sort === SORT_ORDER.ASC || params.sort === SORT_ORDER.DESC
      ? params.sort
      : undefined;

  const [products, categories] = await Promise.all([
    getProducts(sort),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            {products.length} items available
          </p>
        </div>
        <SortLinks current={sort} />
      </header>
      <ProductsExplorer
        key={sort ?? "default"}
        products={products}
        categories={categories}
      />
    </main>
  );
};
export default ProductsPage;
