const ProductsPage = async () => {
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
  const products = await getProducts();

  console.log(">>>>>>>", products);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Products Page</h1>
      <p className="text-lg text-gray-600">
        This is the products page. You can display your products here.
      </p>
    </div>
  );
};
export default ProductsPage;
