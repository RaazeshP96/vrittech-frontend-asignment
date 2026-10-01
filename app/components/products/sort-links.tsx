import { Button } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";

const options = [
  { label: "Default", value: undefined, href: "/products" },
  { label: "Ascending", value: "asc", href: "/products?sort=asc" },
  { label: "Descending", value: "desc", href: "/products?sort=desc" },
] as const;

export function SortLinks({ current }: { current?: "asc" | "desc" }) {
  return (
    <nav aria-label="Sort products" className="flex gap-2">
      {options.map((option) => (
        <Button
          key={option.label}
          size="sm"
          variant={current === option.value ? "default" : "outline"}
        >
          <Link
            href={option.href}
            aria-current={current === option.value ? "true" : undefined}
          >
            {option.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
