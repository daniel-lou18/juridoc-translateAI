import { Skeleton } from "../skeleton";

export default function TextCardSkeleton() {
  return (
    <div className="flex-1">
      <Skeleton className="h-12" />
      <Skeleton className="h-[480px] mt-4" />
    </div>
  );
}
