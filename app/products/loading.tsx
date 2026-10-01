import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "../components";

const Loading = () => {
  return (
    <main
      className="mx-auto max-w-7xl px-4 py-10"
      aria-busy="true"
      aria-label="Loading products"
    >
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-9 w-64" />
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
};

export default Loading;
