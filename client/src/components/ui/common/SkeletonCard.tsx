import { cn } from "@/lib/utils";
import { Skeleton } from "../skeleton";

export default function SkeletonCard({ className }: { className?: string }) {
  return <Skeleton className={cn("flex-1 min-h-[480px]", className)} />;
}
