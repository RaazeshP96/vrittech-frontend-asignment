import { ProductsExplorer, SortLinks } from "../components";

type SortOrder = "asc" | "desc";
const getProducts = async (sort?: SortOrder) => {
  const query = sort ? `?sort=${sort}` : "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products${query}`,
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) => {
  const params = await searchParams;
  const sort: SortOrder | undefined =
    params.sort === "asc" || params.sort === "desc" ? params.sort : undefined;
  const products = await getProducts(sort);

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
      <ProductsExplorer key={sort ?? "default"} products={products} />
    </main>
  );
};
export default ProductsPage;
