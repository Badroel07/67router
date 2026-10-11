"use client";

import { cn } from "@/shared/utils/cn";

// Spinner loading
export function Spinner({ size = "md", className }) {
  const sizes = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
    xl: "size-12",
  };

  return (
    <span
      className={cn(
        "material-symbols-outlined animate-spin text-brand-500",
        sizes[size],
        className
      )}
    >
      progress_activity
    </span>
  );
}

// Full page loading
export function PageLoading({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg">
      <Spinner size="xl" />
      <p className="mt-4 text-text-muted">{message}</p>
    </div>
  );
}

// Skeleton loading
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[#1c1c24]",
        className
      )}
      {...props}
    />
  );
}

// Card skeleton
export function CardSkeleton({ className }) {
  return (
    <div className={cn("p-5 border border-[#23242a] bg-[#121216] shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="size-8" />
      </div>
      <Skeleton className="h-7 w-20 mb-2" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}

export default function Loading({ type = "spinner", ...props }) {
  switch (type) {
    case "page":
      return <PageLoading {...props} />;
    case "skeleton":
      return <Skeleton {...props} />;
    case "card":
      return <CardSkeleton {...props} />;
    default:
      return <Spinner {...props} />;
  }
}
