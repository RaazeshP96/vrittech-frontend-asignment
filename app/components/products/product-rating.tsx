import { Star } from "lucide-react";
import { Product } from "../types";
import { cn } from "cn";

export const ProductRating = ({
  rating,
  className,
}: {
  rating?: Product["rating"];
  className?: string;
}) => {
  if (!rating) {
    return (
      <span className={cn("text-sm text-muted-foreground", className)}>
        No reviews yet
      </span>
    );
  }

  const filled = Math.round(rating.rate);

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <div
        className="flex"
        role="img"
        aria-label={`Rated ${rating.rate} out of 5`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < filled
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/40",
            )}
          />
        ))}
      </div>
      <span className="text-muted-foreground">
        {rating.rate} ({rating.count} reviews)
      </span>
    </div>
  );
};
