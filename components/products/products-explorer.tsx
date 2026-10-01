"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { FilterValues, ProductFilters } from "./product-filters";
import { Pagination } from "./pagination";
import { ProductCard } from "./product-card";
import { PriceRange, ProductsExplorerProps } from "@/types/products";

const PAGE_SIZE = 4;

export const ProductsExplorer = ({
  products,
  categories,
}: ProductsExplorerProps) => {
  const priceBounds = useMemo<PriceRange>(() => {
    if (products.length === 0) return [0, 0];
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const initialFilters: FilterValues = {
    search: "",
    category: "all",
    priceRange: priceBounds,
  };

  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    const [min, max] = filters.priceRange;

    return products.filter((product) => {
      if (query && !product.title.toLowerCase().includes(query)) return false;
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }
      if (product.price < min || product.price > max) return false;
      return true;
    });
  }, [products, filters]);

  const handleChange = (next: Partial<FilterValues>) => {
    setFilters((current) => ({ ...current, ...next }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <ProductFilters
        values={filters}
        categories={categories}
        priceBounds={priceBounds}
        onChange={handleChange}
        onReset={handleReset}
      />

      <p className="mb-6 text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {filtered.length} items
      </p>

      {filtered.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No products found</EmptyTitle>
            <EmptyDescription>
              Try changing or clearing your filters.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={handleReset}>Clear filters</Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};
