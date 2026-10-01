import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-5">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};
