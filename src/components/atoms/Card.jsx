import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white shadow-card border border-neutral-200/50 transition-shadow duration-200 hover:shadow-elevation",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;