import { Product } from "../types";

const getProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Products</h1>
      <ul className="space-y-2">
        {products.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </main>
  );
};
export default ProductsPage;
