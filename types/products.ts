export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type FilterValues = {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
};

export type ProductFiltersProps = {
  values: FilterValues;
  categories: string[];
  invalidRange: boolean;
  onChange: (next: Partial<FilterValues>) => void;
  onReset: () => void;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type SortOrder = "asc" | "desc";

export type ProductsExplorerProps = {
  products: Product[];
  categories: string[];
};

export type PriceRange = [number, number];
