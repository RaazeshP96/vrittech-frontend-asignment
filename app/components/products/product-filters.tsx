"use client";

import { ProductFiltersProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilters({
  values,
  categories,
  invalidRange,
  onChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <section
      aria-label="Filter products"
      className="mb-8 grid gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_1fr_1fr_auto] lg:items-end"
    >
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="search"
          placeholder="Search by product name"
          value={values.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={values.category}
          onValueChange={(value) => onChange({ category: value ?? "all" })}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="capitalize"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="min-price">Min price</Label>
        <Input
          id="min-price"
          type="number"
          min={0}
          inputMode="decimal"
          placeholder="0"
          value={values.minPrice}
          aria-invalid={invalidRange}
          onChange={(e) => onChange({ minPrice: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="max-price">Max price</Label>
        <Input
          id="max-price"
          type="number"
          min={0}
          inputMode="decimal"
          placeholder="Any"
          value={values.maxPrice}
          aria-invalid={invalidRange}
          onChange={(e) => onChange({ maxPrice: e.target.value })}
        />
      </div>

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>

      {invalidRange && (
        <p
          role="alert"
          className="text-sm text-destructive sm:col-span-2 lg:col-span-5"
        >
          Min price can&apos;t be higher than max price. The price filter is
          ignored until this is fixed.
        </p>
      )}
    </section>
  );
}
