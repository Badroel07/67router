"use client";

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fmtTokens = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n || 0);
};

const fmtCost = (n) => `$${(n || 0).toFixed(2)}`;
const fmtRequests = (n) => String(n || 0);

const VIEW_MODES = [
  { value: "tokens", label: "Tokens" },
  { value: "requests", label: "Requests" },
  { value: "cost", label: "Cost ($)" },
];

const VIEW_CONFIG = {
  tokens:   { dataKey: "tokens",   color: "#c5a880", gradId: "goldGrad",   formatter: fmtTokens,   label: "Tokens" },
  requests: { dataKey: "requests", color: "#10b981", gradId: "greenGrad",  formatter: fmtRequests, label: "Requests" },
  cost:     { dataKey: "cost",     color: "#fbbf24", gradId: "amberGrad",  formatter: fmtCost,     label: "Cost" },
};

export default function UsageChart({ period = "7d", stats = null }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("tokens");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/usage/chart?period=${period}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Failed to fetch chart data:", e);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cfg = VIEW_CONFIG[viewMode];
  const hasData = data.some((d) => (d[cfg.dataKey] || 0) > 0);

  return (
    <div className="bg-[#121216] border border-[#23242a] p-6 flex flex-col shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#23242a] pb-4 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-[#ededef]">Tokens Over Time</h2>
          <p className="text-[11px] text-[#9c9ca4]">Hourly token consumption breakdown &amp; cache efficiency</p>
        </div>
        <div className="inline-flex items-center p-0.5 bg-[#181820] border border-[#23242a]">
          {VIEW_MODES.map((m) => {
            const isActive = viewMode === m.value;
            return (
              <button
                key={m.value}
                onClick={() => setViewMode(m.value)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#242430] text-[#c5a880]"
                    : "text-[#9c9ca4] hover:text-[#ededef]"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative h-60 w-full mt-2">
        {loading ? (
          <div className="h-full flex items-center justify-center text-[#9c9ca4] text-xs">Loading chart telemetry...</div>
        ) : !hasData ? (
          <div className="h-full flex items-center justify-center text-[#9c9ca4] text-xs">No activity recorded for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c5a880" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#c5a880" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2026" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "#9c9ca4" }}
                tickLine={false}
                axisLine={{ stroke: "#23242a" }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9c9ca4" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={cfg.formatter}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#16161c",
                  border: "1px solid #2b2c36",
                  color: "#ededef",
                  fontSize: "12px",
                  borderRadius: "0px",
                  padding: "8px 12px",
                }}
                formatter={(val) => [cfg.formatter(val), cfg.label]}
              />
              <Area
                type="monotone"
                dataKey={cfg.dataKey}
                stroke={cfg.color}
                strokeWidth={2}
                fill={`url(#${cfg.gradId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-6 pt-3 mt-2 border-t border-[#23242a] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-1 bg-[#c5a880] inline-block" />
          <span className="text-[#ededef]">Total Ingested {stats?.totalPromptTokens ? `(${fmtTokens(stats.totalPromptTokens)})` : ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-1 bg-[#3b82f6] inline-block" />
          <span className="text-[#9c9ca4]">Prompt Cache {stats?.totalCachedTokens ? `(${fmtTokens(stats.totalCachedTokens)})` : ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-1 bg-[#10b981] inline-block" />
          <span className="text-[#9c9ca4]">Output {stats?.totalCompletionTokens ? `(${fmtTokens(stats.totalCompletionTokens)})` : ""}</span>
        </div>
      </div>
    </div>
  );
}

UsageChart.propTypes = {
  period: PropTypes.string,
  stats: PropTypes.object,
};
