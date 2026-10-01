import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFound() {
  return (
    <Empty className="mx-auto my-16 max-w-xl border border-dashed">
      <EmptyHeader>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription>
          {"The page or product you're looking for doesn't exist."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/products" className={buttonVariants()}>
          Back to products
        </Link>
      </EmptyContent>
    </Empty>
  );
}
