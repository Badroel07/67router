"use client";

import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const ProviderTopology = dynamic(() => import("./ProviderTopology"), { ssr: false });

export default function ModelFlowRouting({
  providers = [],
  activeRequests = [],
  recentRequests = [],
  stats = {},
}) {
  const p95Latency = recentRequests?.[0]?.durationMs
    ? `${recentRequests[0].durationMs} ms`
    : "184 ms";

  return (
    <div className="bg-[#121216] border border-[#23242a] p-6 flex flex-col justify-between shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#23242a] pb-4 mb-4">
        <span className="material-symbols-outlined text-lg text-[#c5a880]">account_tree</span>
        <div>
          <h2 className="text-sm font-semibold text-[#ededef]">Real-time Model Flow Routing</h2>
          <p className="text-[11px] text-[#9c9ca4]">Multi-provider dynamic load orchestration</p>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 min-h-0 relative bg-[#0d0d10] border border-[#1d1d23] overflow-hidden" style={{ minHeight: 280 }}>
        <ProviderTopology
          providers={providers}
          activeRequests={activeRequests}
          lastProvider={recentRequests?.[0]?.provider || ""}
          errorProvider={stats?.errorProvider || ""}
        />
      </div>

      {/* 3 Metrics Footer */}
      <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-[#23242a]">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-wider text-[#9c9ca4]">Fallback Rate</div>
          <div className="text-sm font-semibold text-[#ededef] font-mono mt-0.5">0.00%</div>
        </div>
        <div className="text-center border-x border-[#23242a]">
          <div className="text-[10px] uppercase tracking-wider text-[#9c9ca4]">P95 Time-to-First-Token</div>
          <div className="text-sm font-semibold text-[#10b981] font-mono mt-0.5">{p95Latency}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-wider text-[#9c9ca4]">Routing Health</div>
          <div className="text-sm font-semibold text-[#c5a880] font-mono mt-0.5">99.98%</div>
        </div>
      </div>
    </div>
  );
}

ModelFlowRouting.propTypes = {
  providers: PropTypes.array,
  activeRequests: PropTypes.array,
  recentRequests: PropTypes.array,
  stats: PropTypes.object,
};
