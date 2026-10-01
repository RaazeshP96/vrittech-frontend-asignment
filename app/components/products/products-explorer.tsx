"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";
import { FilterValues, Product } from "@/app/types";

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
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = products.slice(start, start + PAGE_SIZE);

  return (
    <>
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
