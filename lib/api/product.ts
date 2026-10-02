import { SortOrder } from "@/types";
import { BASE_URL } from "../constant";

export const getProducts = async (sort?: SortOrder) => {
  const query = sort ? `?sort=${sort}` : "";

  try {
    // const response = await fetch(`${BASE_URL}/products${query}`);
    const response = await fetch(`https://fakestoreapi.com/products${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products (status ${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export const getCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) {
      throw new Error(`Failed to fetch categories (status ${res.status})`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
