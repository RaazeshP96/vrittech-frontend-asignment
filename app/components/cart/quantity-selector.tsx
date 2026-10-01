"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <ButtonGroup aria-label="Quantity">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus />
      </Button>
      <span
        className="flex min-w-10 items-center justify-center border-y px-3 text-sm tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
