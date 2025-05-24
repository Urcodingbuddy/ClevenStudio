import { Skeleton } from "@repo/ui/skeleton";

export default function PricingSkeleton() {
  return (
    <main className="min-h-screen relative text-white bg-no-repeat bg-center bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0.08)_10%,_rgba(0,0,0,0)_60%)] bg-[length:60%_100%]">
      <div className="container mx-auto pt-28 md:pt-24 lg:pt-32 pb-16 px-4">
        {/* Title and subtitle skeleton */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Skeleton className="mx-auto h-10 sm:h-12 md:h-16 lg:h-20 w-3/4 sm:w-2/3 md:w-1/2 rounded-md" />
          <Skeleton className="mx-auto mt-4 h-4 md:h-5 w-2/3 sm:w-1/2 md:w-1/3 rounded" />
        </div>

        {/* Card grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 overflow-hidden animate-pulse"
            >
              <div>
                <Skeleton className="h-4 w-1/3 mb-2 rounded" />
                <Skeleton className="h-8 w-1/2 mb-6 rounded" />

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <Skeleton className="h-10 w-full rounded-md mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
