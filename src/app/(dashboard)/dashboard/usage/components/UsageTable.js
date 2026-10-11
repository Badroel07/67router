"use client";

import { useState, useEffect, useCallback, useMemo, Fragment } from "react";
import PropTypes from "prop-types";

const fmt = (n) => new Intl.NumberFormat().format(n || 0);
const fmtCost = (n) => `$${(n || 0).toFixed(2)}`;

function fmtTime(iso) {
  if (!iso) return "Never";
  const diffMins = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return new Date(iso).toLocaleDateString();
}

function SortIcon({ field, currentSort, currentOrder }) {
  if (currentSort !== field) return <span className="ml-1 opacity-20">↕</span>;
  return <span className="ml-1 text-[#c5a880]">{currentOrder === "asc" ? "↑" : "↓"}</span>;
}

SortIcon.propTypes = {
  field: PropTypes.string.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentOrder: PropTypes.string.isRequired,
};

function ValueCells({ item, viewMode, isSummary = false }) {
  if (viewMode === "tokens") {
    return (
      <>
        <td className="px-5 py-3 text-right text-[#c5a880] font-mono">
          {isSummary && item.promptTokens === undefined ? "—" : fmt(item.promptTokens)}
        </td>
        <td className="px-5 py-3 text-right text-[#60a5fa] font-mono">
          {item.cachedTokens ? fmt(item.cachedTokens) : "—"}
        </td>
        <td className="px-5 py-3 text-right text-[#34d399] font-mono">
          {isSummary && item.completionTokens === undefined ? "—" : fmt(item.completionTokens)}
        </td>
        <td className="px-5 py-3 text-right font-mono font-bold text-[#ededef]">
          {fmt(item.totalTokens)}
        </td>
      </>
    );
  }
  return (
    <>
      <td className="px-5 py-3 text-right text-[#ededef] font-mono">
        {isSummary && item.inputCost === undefined ? "—" : fmtCost(item.inputCost)}
      </td>
      <td className="px-5 py-3 text-right text-[#60a5fa] font-mono">
        {item.cachedCost ? fmtCost(item.cachedCost) : "—"}
      </td>
      <td className="px-5 py-3 text-right text-[#34d399] font-mono">
        {isSummary && item.outputCost === undefined ? "—" : fmtCost(item.outputCost)}
      </td>
      <td className="px-5 py-3 text-right font-mono font-bold text-[#fbbf24]">
        {fmtCost(item.totalCost || item.cost)}
      </td>
    </>
  );
}

ValueCells.propTypes = {
  item: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,
  isSummary: PropTypes.bool,
};

export default function UsageTable({
  title,
  columns,
  groupedData,
  tableType,
  sortBy,
  sortOrder,
  onToggleSort,
  viewMode,
  storageKey,
  renderDetailCells,
  renderSummaryCells,
  emptyMessage,
}) {
  const [expanded, setExpanded] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...expanded]));
    } catch (e) {
      console.error(`Failed to save ${storageKey}:`, e);
    }
  }, [expanded, storageKey]);

  const toggleGroup = useCallback((groupKey) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(groupKey) ? next.delete(groupKey) : next.add(groupKey);
      return next;
    });
  }, []);

  const valueColumns = useMemo(() => {
    if (viewMode === "tokens") {
      return [
        { field: "promptTokens", label: "Input Tokens" },
        { field: "cachedTokens", label: "Cached" },
        { field: "completionTokens", label: "Output Tokens" },
        { field: "totalTokens", label: "Total Tokens" },
      ];
    }
    return [
      { field: "promptTokens", label: "Input Cost" },
      { field: "cachedCost", label: "Cached Cost" },
      { field: "completionTokens", label: "Output Cost" },
      { field: "cost", label: "Total Cost" },
    ];
  }, [viewMode]);

  const totalColSpan = columns.length + valueColumns.length;

  const totals = useMemo(() => {
    return groupedData.reduce(
      (acc, g) => {
        const s = g.summary || {};
        acc.requests += s.requests || 0;
        acc.promptTokens += s.promptTokens || 0;
        acc.cachedTokens += s.cachedTokens || 0;
        acc.completionTokens += s.completionTokens || 0;
        acc.totalTokens += s.totalTokens || 0;
        acc.inputCost += s.inputCost || 0;
        acc.cachedCost += s.cachedCost || 0;
        acc.outputCost += s.outputCost || 0;
        acc.cost += s.cost || 0;
        acc.totalCost += s.totalCost || s.cost || 0;
        return acc;
      },
      {
        requests: 0,
        promptTokens: 0,
        cachedTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        inputCost: 0,
        cachedCost: 0,
        outputCost: 0,
        cost: 0,
        totalCost: 0,
      }
    );
  }, [groupedData]);

  return (
    <div className="bg-[#121216] border border-[#23242a] shadow-sm overflow-hidden">
      {title && (
        <div className="p-4 border-b border-[#23242a] bg-[#16161c]/40">
          <h3 className="font-semibold text-sm text-[#ededef]">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#16161c]/70 text-[#9c9ca4] uppercase text-[10px] tracking-wider border-b border-[#23242a] font-semibold">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className={`px-5 py-3 cursor-pointer hover:bg-[#1a1a22] transition-colors ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                  onClick={() => onToggleSort(tableType, col.field)}
                >
                  {col.label}{" "}
                  <SortIcon field={col.field} currentSort={sortBy} currentOrder={sortOrder} />
                </th>
              ))}
              {valueColumns.map((col) => (
                <th
                  key={col.field}
                  className="px-5 py-3 text-right cursor-pointer hover:bg-[#1a1a22] transition-colors"
                  onClick={() => onToggleSort(tableType, col.field)}
                >
                  {col.label}{" "}
                  <SortIcon field={col.field} currentSort={sortBy} currentOrder={sortOrder} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e26] font-mono">
            {groupedData.map((group) => (
              <Fragment key={group.groupKey}>
                <tr
                  className="cursor-pointer hover:bg-[#16161d] transition-colors"
                  onClick={() => toggleGroup(group.groupKey)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[16px] text-[#9c9ca4] transition-transform ${expanded.has(group.groupKey) ? "rotate-90" : ""}`}>
                        chevron_right
                      </span>
                      <span className={`font-medium transition-colors ${group.summary.pending > 0 ? "text-[#c5a880]" : "text-[#ededef]"}`}>
                        {group.groupKey}
                      </span>
                    </div>
                  </td>
                  {renderSummaryCells(group)}
                  <ValueCells item={group.summary} viewMode={viewMode} isSummary />
                </tr>
                {expanded.has(group.groupKey) && group.items.map((item) => (
                  <tr
                    key={`detail-${item.key}`}
                    className="bg-[#0e0e12]/60 hover:bg-[#16161d] transition-colors"
                  >
                    {renderDetailCells(item)}
                    <ValueCells item={item} viewMode={viewMode} />
                  </tr>
                ))}
              </Fragment>
            ))}
            {groupedData.length === 0 && (
              <tr>
                <td colSpan={totalColSpan} className="px-6 py-8 text-center text-[#9c9ca4] font-sans">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
          {groupedData.length > 0 && (
            <tfoot className="border-t border-[#23242a] font-mono text-xs font-semibold text-[#ededef] bg-[#16161c]/50">
              <tr>
                <td className="px-5 py-3 font-sans">Total</td>
                <td className="px-5 py-3 font-sans text-[#9c9ca4]">{groupedData.length} Groups</td>
                <td className="px-5 py-3 text-right">{fmt(totals.requests)}</td>
                <td className="px-5 py-3 text-right text-[#9c9ca4]">—</td>
                <ValueCells item={totals} viewMode={viewMode} isSummary />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

UsageTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    align: PropTypes.string,
  })).isRequired,
  groupedData: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onToggleSort: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  storageKey: PropTypes.string.isRequired,
  renderDetailCells: PropTypes.func.isRequired,
  renderSummaryCells: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string.isRequired,
};

export { fmt, fmtCost, fmtTime };
