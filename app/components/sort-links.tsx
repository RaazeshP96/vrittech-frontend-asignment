import Link from "next/link";
import { cn } from "@/lib/utils";

const options = [
  { label: "Default", value: undefined, href: "/products" },
  { label: "Ascending", value: "asc", href: "/products?sort=asc" },
  { label: "Descending", value: "desc", href: "/products?sort=desc" },
] as const;

export function SortLinks({ current }: { current?: "asc" | "desc" }) {
  return (
    <nav aria-label="Sort products" className="flex gap-2">
      {options.map((option) => (
        <Link
          key={option.label}
          href={option.href}
          aria-current={current === option.value ? "true" : undefined}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent",
            current === option.value &&
              "bg-primary text-primary-foreground hover:bg-primary",
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
