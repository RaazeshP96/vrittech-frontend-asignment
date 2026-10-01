import { ProductDetailSkeleton } from "@/app/components";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10" aria-busy="true">
      <Skeleton className="mb-6 h-5 w-48" />
      <ProductDetailSkeleton />
    </main>
  );
};
export default Loading;
