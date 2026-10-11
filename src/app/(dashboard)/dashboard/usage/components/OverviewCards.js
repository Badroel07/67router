"use client";

import PropTypes from "prop-types";

const fmt = (n) => new Intl.NumberFormat().format(n || 0);

export default function OverviewCards({ stats }) {
  const reqCount = stats?.totalRequests || 0;
  const promptTokens = stats?.totalPromptTokens || 0;
  const cachedTokens = stats?.totalCachedTokens || 0;
  const completionTokens = stats?.totalCompletionTokens || 0;
  const totalCost = stats?.totalCost || 0;

  const hitRate = promptTokens > 0 ? ((cachedTokens / promptTokens) * 100).toFixed(1) : "0.0";
  const avgPrompt = reqCount > 0 ? Math.round(promptTokens / reqCount) : 0;
  const avgCompletion = reqCount > 0 ? Math.round(completionTokens / reqCount) : 0;
  const savedCost = cachedTokens > 0 ? cachedTokens * 0.000003 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total Requests */}
      <div className="bg-[#121216]/90 border border-[#23242a] hover:border-[#353642] transition-all p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center justify-between text-xs text-[#9c9ca4] font-medium">
          <span className="tracking-wider uppercase text-[11px]">Total Requests</span>
          <span className="material-symbols-outlined text-base text-[#9c9ca4] group-hover:text-[#ededef] transition-colors">alt_route</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-[#ededef] tracking-tight font-mono tabular-nums">{fmt(reqCount)}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#10b981]">
            <span className="material-symbols-outlined text-xs">arrow_upward</span>
            <span>Active</span>
            <span className="text-[#9c9ca4] font-normal">
              {stats?.activeRequests?.length ? `${stats.activeRequests.length} in flight` : "normal"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Total Input Tokens */}
      <div className="bg-[#121216]/90 border border-[#23242a] hover:border-[#c5a880]/50 transition-all p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a880]/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center justify-between text-xs text-[#9c9ca4] font-medium">
          <span className="tracking-wider uppercase text-[11px] text-[#c5a880]">Total Input Tokens</span>
          <span className="material-symbols-outlined text-base text-[#c5a880]">input</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-[#c5a880] tracking-tight font-mono tabular-nums">{fmt(promptTokens)}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#9c9ca4]">
            <span>Avg. {fmt(avgPrompt)} / req</span>
          </div>
        </div>
      </div>

      {/* 3. Cached Tokens */}
      <div className="bg-[#121216]/90 border border-[#23242a] hover:border-[#3b82f6]/50 transition-all p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#3b82f6]/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center justify-between text-xs text-[#9c9ca4] font-medium">
          <span className="tracking-wider uppercase text-[11px] text-[#93c5fd]">Cached Tokens</span>
          <span className="material-symbols-outlined text-base text-[#3b82f6]">cached</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-[#60a5fa] tracking-tight font-mono tabular-nums">{fmt(cachedTokens)}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#60a5fa]">
            <span className="px-1.5 py-0.5 bg-[#3b82f6]/15 font-semibold text-[10px]">{hitRate}% Hit Rate</span>
          </div>
        </div>
      </div>

      {/* 4. Output Tokens */}
      <div className="bg-[#121216]/90 border border-[#23242a] hover:border-[#10b981]/50 transition-all p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center justify-between text-xs text-[#9c9ca4] font-medium">
          <span className="tracking-wider uppercase text-[11px] text-[#6ee7b7]">Output Tokens</span>
          <span className="material-symbols-outlined text-base text-[#10b981]">output</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-[#34d399] tracking-tight font-mono tabular-nums">{fmt(completionTokens)}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#9c9ca4]">
            <span>Avg. {fmt(avgCompletion)} tokens</span>
          </div>
        </div>
      </div>

      {/* 5. Est. Cost */}
      <div className="bg-[#121216]/90 border border-[#23242a] hover:border-[#f59e0b]/50 transition-all p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
        <div className="flex items-center justify-between text-xs text-[#9c9ca4] font-medium">
          <span className="tracking-wider uppercase text-[11px] text-[#fcd34d]">Est. Cost</span>
          <span className="material-symbols-outlined text-base text-[#f59e0b]">payments</span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold text-[#fbbf24] tracking-tight font-mono tabular-nums">~${totalCost.toFixed(2)}</div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-[#9c9ca4]">
            <span>{savedCost > 0 ? `Save ~$${savedCost.toFixed(2)} (Cache)` : "Estimated billing"}</span>
            <span className="material-symbols-outlined text-xs text-[#10b981]">savings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

OverviewCards.propTypes = {
  stats: PropTypes.object.isRequired,
};
