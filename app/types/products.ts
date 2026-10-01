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
