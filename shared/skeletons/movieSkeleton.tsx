import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MovieSkeleton = () => {
  return (
    <Card className="w-full max-w-[220px] h-[300px] rounded-md">
      <Skeleton className="w-full h-[80%] rounded-t-md" />
      <CardContent className="p-2">
        <Skeleton className="w-3/4 h-5 rounded-md mb-2" />
        <Skeleton className="w-1/2 h-4 rounded-md" />
      </CardContent>
    </Card>
  );
};
