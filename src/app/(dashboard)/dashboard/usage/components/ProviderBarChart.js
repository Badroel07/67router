"use client";

import { useMemo } from "react";
import PropTypes from "prop-types";
import { AI_PROVIDERS, getProviderByAlias } from "@/shared/constants/providers";

const GRADIENTS = [
  "from-[#c5a880] to-[#e0c298]",
  "from-[#3b82f6] to-[#60a5fa]",
  "from-[#10b981] to-[#34d399]",
  "from-[#f59e0b] to-[#fbbf24]",
  "from-[#8b5cf6] to-[#a78bfa]",
  "from-[#06b6d4] to-[#22d3ee]",
];

const TEXT_COLORS = [
  "text-[#c5a880]",
  "text-[#3b82f6]",
  "text-[#10b981]",
  "text-[#f59e0b]",
  "text-[#8b5cf6]",
  "text-[#06b6d4]",
];

const fmtTokens = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M tokens`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k tokens`;
  return `${n || 0} tokens`;
};

const fmtCost = (n) => `$${(n || 0).toFixed(2)} est.`;

export default function ProviderBarChart({ byProvider, totalTokens = 0, totalCachedTokens = 0 }) {
  const providerList = useMemo(() => {
    if (!byProvider) return [];
    const entries = Object.entries(byProvider).map(([id, data]) => {
      const tokens = (data.promptTokens || 0) + (data.completionTokens || 0);
      const providerConf = getProviderByAlias(id) || AI_PROVIDERS[id];
      const name = providerConf?.name || id;
      return {
        id,
        name,
        tokens,
        requests: data.requests || 0,
        cost: data.cost || 0,
      };
    });

    const sum = entries.reduce((acc, curr) => acc + curr.tokens, 0) || totalTokens || 1;
    return entries
      .filter((p) => p.tokens > 0 || p.requests > 0)
      .sort((a, b) => b.tokens - a.tokens)
      .slice(0, 5)
      .map((p, idx) => ({
        ...p,
        share: ((p.tokens / sum) * 100).toFixed(1),
        gradient: GRADIENTS[idx % GRADIENTS.length],
        textColor: TEXT_COLORS[idx % TEXT_COLORS.length],
      }));
  }, [byProvider, totalTokens]);

  const savedCost = totalCachedTokens > 0 ? totalCachedTokens * 0.000003 : 0;
  const cacheRatio = totalTokens > 0 ? Math.min(99.9, ((totalCachedTokens / totalTokens) * 100)).toFixed(1) : "0.0";

  return (
    <div className="bg-[#121216] border border-[#23242a] p-6 flex flex-col justify-between shadow-sm h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between border-b border-[#23242a] pb-4 mb-4">
          <h2 className="text-sm font-semibold text-[#ededef]">By Provider</h2>
          <span className="text-[11px] text-[#9c9ca4] font-mono">Share</span>
        </div>

        {providerList.length === 0 ? (
          <div className="py-12 flex-1 flex items-center justify-center text-[#9c9ca4] text-xs">
            No provider usage recorded yet
          </div>
        ) : (
          <div className="space-y-4">
            {providerList.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#ededef] truncate max-w-[180px]">{p.name}</span>
                  <span className={`${p.textColor} font-mono font-semibold`}>{p.share}%</span>
                </div>
                <div className="w-full bg-[#1c1c24] h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${p.gradient} h-full transition-all duration-500`}
                    style={{ width: `${Math.max(2, parseFloat(p.share))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#9c9ca4] font-mono">
                  <span>{fmtTokens(p.tokens)}</span>
                  <span>{fmtCost(p.cost)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-3 bg-[#181820] border border-[#23242a] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-base text-[#c5a880]">auto_awesome</span>
          <div className="text-xs text-[#ededef]">
            <div className="font-medium">Auto-Routing Savings</div>
            <div className="text-[10px] text-[#9c9ca4]">Saved ~{cacheRatio}% via Cache &amp; Fallbacks</div>
          </div>
        </div>
        <span className="text-xs font-bold font-mono text-[#10b981]">
          +${savedCost.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

ProviderBarChart.propTypes = {
  byProvider: PropTypes.object,
  totalTokens: PropTypes.number,
  totalCachedTokens: PropTypes.number,
};
