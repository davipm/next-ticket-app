import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="p-5">
      <div className="mb-4">
        <Skeleton className="mb-2 h-6 w-1/4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
