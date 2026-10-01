"use client";

import { formatPrice } from "@/app/lib/format";
import { PriceRange } from "@/app/types/products";
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
import { Slider } from "@/components/ui/slider";

export type FilterValues = {
  search: string;
  category: string;
  priceRange: PriceRange;
};

type ProductFiltersProps = {
  values: FilterValues;
  categories: string[];
  priceBounds: PriceRange;
  onChange: (next: Partial<FilterValues>) => void;
  onReset: () => void;
};

export function ProductFilters({
  values,
  categories,
  priceBounds,
  onChange,
  onReset,
}: ProductFiltersProps) {
  const sliderDisabled = priceBounds[0] === priceBounds[1];

  return (
    <section
      aria-label="Filter products"
      className="mb-8 grid gap-6 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1.5fr_2fr_auto] lg:items-end"
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price range</Label>
          <span className="text-sm tabular-nums text-muted-foreground">
            {formatPrice(values.priceRange[0])} –{" "}
            {formatPrice(values.priceRange[1])}
          </span>
        </div>
        <Slider
          aria-label="Price range"
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={1}
          disabled={sliderDisabled}
          value={values.priceRange}
          onValueChange={(value) => {
            if (Array.isArray(value) && value.length === 2) {
              onChange({ priceRange: [value[0], value[1]] });
            }
          }}
        />
      </div>

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </section>
  );
}
