"use client";

export function OverviewCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-[#121216] border border-[#23242a] p-4 flex flex-col justify-between shadow-sm min-h-[105px]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 w-20 bg-[#1c1c24] animate-pulse" />
            <div className="w-6 h-6 bg-[#181820] border border-[#23242a] animate-pulse" />
          </div>
          <div>
            <div className="h-6 w-28 bg-[#1c1c24] animate-pulse mb-1.5" />
            <div className="h-2.5 w-16 bg-[#181820] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoutingAndRecentSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch lg:h-[460px]">
      {/* ModelFlowRouting Skeleton (3 cols) */}
      <div className="lg:col-span-3 h-full bg-[#121216] border border-[#23242a] p-6 flex flex-col justify-between shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-[#23242a] pb-4 mb-4">
          <div className="w-5 h-5 bg-[#1c1c24] animate-pulse" />
          <div>
            <div className="h-3.5 w-44 bg-[#1c1c24] animate-pulse mb-1" />
            <div className="h-2.5 w-56 bg-[#181820] animate-pulse" />
          </div>
        </div>

        {/* Center Graph Canvas Skeleton */}
        <div className="flex-1 min-h-[260px] bg-[#0d0d10] border border-[#1d1d23] relative flex items-center justify-between px-8 sm:px-12 overflow-hidden">
          {/* Client node */}
          <div className="w-24 sm:w-28 h-16 bg-[#16161c] border border-[#2b2c36] p-2 flex flex-col items-center justify-center gap-1.5 animate-pulse">
            <div className="w-4 h-4 bg-[#23242e]" />
            <div className="h-2.5 w-14 bg-[#23242e]" />
          </div>

          {/* Hub node */}
          <div className="w-28 sm:w-36 h-20 bg-gradient-to-b from-[#1c1c24] to-[#14141a] border-2 border-[#c5a880]/30 p-2 flex flex-col items-center justify-center gap-1.5 animate-pulse">
            <div className="w-6 h-6 bg-[#c5a880]/15" />
            <div className="h-2.5 w-20 bg-[#c5a880]/20" />
            <div className="h-2 w-14 bg-[#23242e]" />
          </div>

          {/* Target Providers node stack */}
          <div className="flex flex-col gap-2.5 w-28 sm:w-36">
            <div className="h-9 bg-[#161b17] border border-[#10b981]/20 p-2 flex items-center justify-between animate-pulse">
              <div className="h-2.5 w-14 bg-[#10b981]/20" />
              <div className="h-2 w-6 bg-[#10b981]/20" />
            </div>
            <div className="h-9 bg-[#15151a] border border-[#262630] p-2 flex items-center justify-between animate-pulse">
              <div className="h-2.5 w-16 bg-[#23242e]" />
              <div className="h-2 w-6 bg-[#23242e]" />
            </div>
            <div className="h-9 bg-[#15151a] border border-[#262630] p-2 flex items-center justify-between animate-pulse">
              <div className="h-2.5 w-14 bg-[#23242e]" />
              <div className="h-2 w-6 bg-[#23242e]" />
            </div>
          </div>
        </div>

        {/* 3 Metrics Footer Skeleton */}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#23242a]">
          <div className="text-center">
            <div className="h-2.5 w-20 bg-[#181820] mx-auto animate-pulse mb-1.5" />
            <div className="h-4 w-12 bg-[#1c1c24] mx-auto animate-pulse" />
          </div>
          <div className="text-center border-x border-[#23242a]">
            <div className="h-2.5 w-28 bg-[#181820] mx-auto animate-pulse mb-1.5" />
            <div className="h-4 w-14 bg-[#1c1c24] mx-auto animate-pulse" />
          </div>
          <div className="text-center">
            <div className="h-2.5 w-20 bg-[#181820] mx-auto animate-pulse mb-1.5" />
            <div className="h-4 w-12 bg-[#1c1c24] mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Recent Gateway Requests Skeleton (2 cols) */}
      <div className="lg:col-span-2 bg-[#121216] border border-[#23242a] p-6 flex flex-col shadow-sm h-full max-h-[460px]">
        <div className="flex items-center justify-between border-b border-[#23242a] pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1c1c24] animate-pulse" />
            <div className="h-3.5 w-36 bg-[#1c1c24] animate-pulse" />
          </div>
        </div>
        <div className="space-y-2.5 overflow-hidden flex-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-3 bg-[#17171d] border border-[#23242e] flex items-center justify-between">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-28 bg-[#22222a] animate-pulse" />
                  <div className="h-3 w-12 bg-[#1e1e26] animate-pulse" />
                </div>
                <div className="h-2.5 w-40 bg-[#1a1a22] animate-pulse" />
              </div>
              <div className="space-y-1.5 text-right shrink-0">
                <div className="h-3 w-16 bg-[#22222a] animate-pulse ml-auto" />
                <div className="h-2.5 w-10 bg-[#1a1a22] animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsAndShareSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
      {/* Tokens Over Time Skeleton (3 cols) */}
      <div className="lg:col-span-3 h-full bg-[#121216] border border-[#23242a] p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between border-b border-[#23242a] pb-4 mb-6">
            <div>
              <div className="h-3.5 w-32 bg-[#1c1c24] animate-pulse mb-1" />
              <div className="h-2.5 w-48 bg-[#181820] animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-6 w-12 bg-[#181820] border border-[#23242a] animate-pulse" />
              <div className="h-6 w-12 bg-[#181820] border border-[#23242a] animate-pulse" />
            </div>
          </div>
          {/* Chart area skeleton */}
          <div className="h-[260px] bg-[#0d0d10] border border-[#1d1d23] p-4 flex items-end gap-3 justify-between">
            {[40, 65, 30, 85, 45, 90, 60, 75, 50, 95, 70, 80].map((h, idx) => (
              <div
                key={idx}
                className="flex-1 bg-[#1c1c24] animate-pulse"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Provider Breakdown Skeleton (2 cols) */}
      <div className="lg:col-span-2 h-full bg-[#121216] border border-[#23242a] p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="border-b border-[#23242a] pb-4 mb-5">
            <div className="h-3.5 w-28 bg-[#1c1c24] animate-pulse mb-1" />
            <div className="h-2.5 w-44 bg-[#181820] animate-pulse" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-[#1c1c24] animate-pulse" />
                  <div className="h-3 w-16 bg-[#181820] animate-pulse" />
                </div>
                <div className="h-2 w-full bg-[#181820] overflow-hidden">
                  <div
                    className="h-full bg-[#1c1c24] animate-pulse"
                    style={{ width: `${80 - i * 18}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#23242a]">
          <div className="p-3 bg-[#15151a] border border-[#23242a] animate-pulse flex items-center justify-between">
            <div className="h-3 w-32 bg-[#1c1c24]" />
            <div className="h-3 w-16 bg-[#1c1c24]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UsageTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Table header bar */}
      <div className="grid grid-cols-6 gap-4 p-3 bg-[#15151a] border border-[#23242a]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-3 bg-[#1c1c24] animate-pulse" />
        ))}
      </div>
      {/* Table rows */}
      <div className="divide-y divide-[#1e1e26] border border-[#23242a]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 p-3.5 items-center">
            <div className="h-3.5 w-28 bg-[#1c1c24] animate-pulse" />
            <div className="h-3 w-16 bg-[#181820] animate-pulse" />
            <div className="h-3 w-20 bg-[#181820] animate-pulse" />
            <div className="h-3 w-16 bg-[#181820] animate-pulse" />
            <div className="h-3 w-16 bg-[#181820] animate-pulse" />
            <div className="h-3 w-14 bg-[#181820] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UsageStatsSkeleton() {
  return (
    <div className="space-y-6">
      <OverviewCardsSkeleton />
      <RoutingAndRecentSkeleton />
      <AnalyticsAndShareSkeleton />
      <div className="bg-[#121216] border border-[#23242a] p-6 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#23242a] pb-4">
          <div>
            <div className="h-3.5 w-44 bg-[#1c1c24] animate-pulse mb-1" />
            <div className="h-2.5 w-60 bg-[#181820] animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-32 bg-[#1c1c24] border border-[#272834] animate-pulse" />
            <div className="h-8 w-24 bg-[#181820] border border-[#23242a] animate-pulse" />
          </div>
        </div>
        <UsageTableSkeleton />
      </div>
    </div>
  );
}
