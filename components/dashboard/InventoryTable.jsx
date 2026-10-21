import { useState } from "react";

const formatCurrency = (val) => {
  return "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const InventoryTable = ({ inventoryData = [] }) => {
  const [filterRisk, setFilterRisk] = useState("ALL");
  const [sortKey, setSortKey] = useState("currentStock");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = inventoryData.filter((item) => {
    if (filterRisk === "ALL") return true;
    return item.risk === filterRisk;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const totalStockUnits = inventoryData.reduce((acc, i) => acc + i.currentStock, 0);
  const totalStockVal = inventoryData.reduce((acc, i) => acc + i.stockValue, 0);

  return (
    <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md">
      {/* Title & Stats */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            Inventory & Stock Velocity Analysis
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/70">
              {inventoryData.length} SKUs
            </span>
          </h4>
          <p className="text-xs text-white/50">
            Stock levels, unit costs, turnover rate, and replenishment risk indicators
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Filter */}
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-1 text-xs">
            {["ALL", "OK", "REORDER", "REORDER NOW"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterRisk(st)}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                  filterRisk === st
                    ? "bg-accent text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-[11px] uppercase text-white/40">Total Stock On Hand</p>
          <p className="text-lg font-bold text-white">{totalStockUnits} Units</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-[11px] uppercase text-white/40">Total Inventory Cost</p>
          <p className="text-lg font-bold text-accent">{formatCurrency(totalStockVal)}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-[11px] uppercase text-white/40">Healthy SKUs (OK)</p>
          <p className="text-lg font-bold text-emerald-400">
            {inventoryData.filter((i) => i.risk === "OK").length}
          </p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
          <p className="text-[11px] uppercase text-white/40">Restock Attention</p>
          <p className="text-lg font-bold text-amber-400">
            {inventoryData.filter((i) => i.risk !== "OK").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-accent">
              <th className="cursor-pointer px-4 py-3" onClick={() => handleSort("productId")}>
                SKU / ID {sortKey === "productId" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-4 py-3" onClick={() => handleSort("productName")}>
                Product Name {sortKey === "productName" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3">Category</th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => handleSort("currentStock")}>
                Stock {sortKey === "currentStock" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => handleSort("unitCost")}>
                Unit Cost {sortKey === "unitCost" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => handleSort("stockValue")}>
                Stock Value {sortKey === "stockValue" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => handleSort("unitsSold")}>
                Units Sold {sortKey === "unitsSold" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-4 py-3 text-right" onClick={() => handleSort("estMonthsCover")}>
                Months Cover {sortKey === "estMonthsCover" && (sortAsc ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {sorted.map((item) => {
              const isDanger = item.risk === "REORDER NOW";
              const isWarning = item.risk === "REORDER";
              return (
                <tr key={item.productId} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-white/50">{item.productId}</td>
                  <td className="px-4 py-3 font-medium text-white">{item.productName}</td>
                  <td className="px-4 py-3 text-xs text-white/60">
                    <span className="rounded bg-white/5 px-2 py-0.5">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-white">{item.currentStock}</td>
                  <td className="px-4 py-3 text-right text-white/60">{formatCurrency(item.unitCost)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-accent">{formatCurrency(item.stockValue)}</td>
                  <td className="px-4 py-3 text-right text-white/80">{item.unitsSold}</td>
                  <td className="px-4 py-3 text-right text-white/70">{item.estMonthsCover.toFixed(1)} mo</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isDanger
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : isWarning
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
