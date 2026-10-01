"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ErrorStateProps } from "../types";

export const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load this page. Check your connection and try again.",
  digest,
  onRetry,
}: ErrorStateProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      onRetry();
    });
  };

  return (
    <Empty className="mx-auto my-16 max-w-xl border border-dashed" role="alert">
      <EmptyHeader>
        <TriangleAlert className="mx-auto h-10 w-10 text-destructive" />
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        {digest && (
          <p className="text-xs text-muted-foreground">Error ID: {digest}</p>
        )}
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={handleRetry} disabled={isPending}>
          {isPending ? "Retrying…" : "Try again"}
        </Button>
      </EmptyContent>
    </Empty>
  );
};
