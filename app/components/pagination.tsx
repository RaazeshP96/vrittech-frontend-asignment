"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const go = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  const atStart = currentPage === 1;
  const atEnd = currentPage === totalPages;

  return (
    <ShadcnPagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={go(currentPage - 1)}
            aria-disabled={atStart}
            tabIndex={atStart ? -1 : undefined}
            className={cn(atStart && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === currentPage}
              onClick={go(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={go(currentPage + 1)}
            aria-disabled={atEnd}
            tabIndex={atEnd ? -1 : undefined}
            className={cn(atEnd && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
