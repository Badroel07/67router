"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RequestLogger } from "@/shared/components";
import UsageStats from "@/shared/components/UsageStats";
import UsageStatsSkeleton from "./components/UsageStatsSkeleton";
import RequestDetailsTab from "./components/RequestDetailsTab";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "24h", label: "24h" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "60d", label: "60D" },
  { value: "all", label: "All" },
];

export default function UsagePage() {
  return (
    <Suspense fallback={<UsageStatsSkeleton />}>
      <UsageContent />
    </Suspense>
  );
}

function UsageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [period, setPeriod] = useState("today");

  const tabFromUrl = searchParams.get("tab");
  const activeTab = tabFromUrl && ["overview", "logs", "details"].includes(tabFromUrl)
    ? tabFromUrl
    : "overview";

  const handleTabChange = (value) => {
    if (value === activeTab) return;
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`/dashboard/usage?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex min-w-0 flex-col gap-6 px-1 sm:px-0">
      {/* Controls: Tabs + Period Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#23242a] pb-4">
        {/* Tabs: Overview vs Details */}
        <div className="inline-flex items-center p-1 bg-[#141418] border border-[#23242a]">
          <button
            onClick={() => handleTabChange("overview")}
            className={`px-4 py-1.5 font-medium text-xs transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-[#1f1f26] text-[#ededef] shadow-sm"
                : "text-[#9c9ca4] hover:text-[#ededef]"
            }`}
          >
            <span className={`material-symbols-outlined text-sm ${activeTab === "overview" ? "text-[#c5a880]" : ""}`}>dashboard</span>
            Overview
          </button>
          <button
            onClick={() => handleTabChange("details")}
            className={`px-4 py-1.5 font-medium text-xs transition-all flex items-center gap-1.5 ${
              activeTab === "details"
                ? "bg-[#1f1f26] text-[#ededef] shadow-sm"
                : "text-[#9c9ca4] hover:text-[#ededef]"
            }`}
          >
            <span className={`material-symbols-outlined text-sm ${activeTab === "details" ? "text-[#c5a880]" : ""}`}>data_thresholding</span>
            Details
          </button>
        </div>

        {/* Period Selector */}
        {activeTab === "overview" && (
          <div className="inline-flex items-center p-1 bg-[#141418] border border-[#23242a]">
            {PERIODS.map((p) => {
              const isActive = period === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  className={`px-3 py-1 text-xs transition-all ${
                    isActive
                      ? "font-semibold bg-[#c5a880] text-[#0e0e11] shadow-sm"
                      : "font-medium text-[#9c9ca4] hover:text-[#ededef]"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeTab === "overview" && (
        <Suspense fallback={<UsageStatsSkeleton />}>
          <UsageStats period={period} setPeriod={setPeriod} hidePeriodSelector />
        </Suspense>
      )}
      {activeTab === "logs" && <RequestLogger />}
      {activeTab === "details" && <RequestDetailsTab />}
    </div>
  );
}
