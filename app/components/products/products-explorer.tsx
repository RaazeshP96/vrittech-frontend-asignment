"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { FilterValues, Product } from "@/app/types";
import { ProductFilters } from "./product-filters";

const PAGE_SIZE = 4;

interface ProductsExplorerProps {
  products: Product[];
  categories: string[];
}

const initialFilters: FilterValues = {
  search: "",
  category: "all",
  minPrice: "",
  maxPrice: "",
};

const parsePrice = (value: string): number | null => {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

export const ProductsExplorer = ({
  products,
  categories,
}: ProductsExplorerProps) => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const min = parsePrice(filters.minPrice);
  const max = parsePrice(filters.maxPrice);
  const invalidRange = min !== null && max !== null && min > max;

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return products.filter((product) => {
      if (query && !product.title.toLowerCase().includes(query)) return false;
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (!invalidRange) {
        if (min !== null && product.price < min) return false;
        if (max !== null && product.price > max) return false;
      }
      return true;
    });
  }, [products, filters.search, filters.category, min, max, invalidRange]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const handleChange = (next: Partial<FilterValues>) => {
    setFilters((current) => ({ ...current, ...next }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  return (
    <>
      <ProductFilters
        values={filters}
        categories={categories}
        invalidRange={invalidRange}
        onChange={handleChange}
        onReset={handleReset}
      />
      <p className="mb-6 text-muted-foreground">
        Showing {visible.length} of {products.length} items
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              aria-current={p === currentPage ? "page" : undefined}
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </Button>
        </nav>
      )}
    </>
  );
};
