import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* هدر فیک */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-8 w-[150px]" />
      </div>

      {/* کارت‌های آماری (4 تا) */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[120px] mt-2" />
              <Skeleton className="h-3 w-[180px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* بخش نمودار و لیست (پایین صفحه) */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-7 w-full">
        
        {/* کارت بزرگ */}
        <Card className="col-span-1 lg:col-span-4 h-[350px]">
            <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full p-6">
                <Skeleton className="h-full w-full rounded-lg" />
            </CardContent>
        </Card>
        
        {/* کارت کوچک */}
        <Card className="col-span-1 lg:col-span-3 h-[350px]">
            <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
            </CardHeader>
             <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-[60%]" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}