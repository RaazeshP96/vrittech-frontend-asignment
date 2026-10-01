"use client";

import { useEffect } from "react";
import { ErrorState } from "./components";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState digest={error.digest} onRetry={reset} />;
}
