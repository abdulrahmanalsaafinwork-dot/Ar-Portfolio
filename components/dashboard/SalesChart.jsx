import { useState } from "react";
import { motion } from "framer-motion";

const formatCurrency = (val) => {
  return "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const SalesChart = ({ monthlyData = [] }) => {
  const [activeMetric, setActiveMetric] = useState("revenue"); // revenue, profit, margin, units
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-primary/40 p-6 text-white/40">
        No sales trend data available for current selection.
      </div>
    );
  }

  // Determine max value for scale
  const values = monthlyData.map((d) => {
    if (activeMetric === "revenue") return d.revenue;
    if (activeMetric === "profit") return d.grossProfit;
    if (activeMetric === "margin") return d.marginPct;
    if (activeMetric === "units") return d.unitsSold;
    return d.revenue;
  });

  const maxValue = Math.max(...values, 1);
  const chartHeight = 220;
  const barWidth = 32;
  const gap = 20;
  const totalWidth = monthlyData.length * (barWidth + gap);

  return (
    <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md">
      {/* Header and Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            Monthly Performance Trends
            <span className="text-xs font-normal text-white/40">({monthlyData.length} active periods)</span>
          </h4>
          <p className="text-xs text-white/50">
            {activeMetric === "revenue" && "Total completed sales revenue per month"}
            {activeMetric === "profit" && "Total gross profit (Revenue minus COGS) per month"}
            {activeMetric === "margin" && "Gross profit margin percentage per month"}
            {activeMetric === "units" && "Total product units sold per month"}
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
          {[
            { id: "revenue", label: "Revenue" },
            { id: "profit", label: "Profit" },
            { id: "margin", label: "Margin %" },
            { id: "units", label: "Units" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMetric(tab.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                activeMetric === tab.id
                  ? "bg-accent text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Chart Container */}
      <div className="mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-accent/40">
        <div className="relative min-w-[560px]" style={{ height: `${chartHeight + 60}px` }}>
          {/* Y Axis Grid Guidelines */}
          {[1, 0.75, 0.5, 0.25, 0].map((ratio) => {
            const yPos = chartHeight * (1 - ratio);
            const refVal = maxValue * ratio;
            return (
              <div
                key={ratio}
                className="absolute inset-x-0 flex items-center"
                style={{ top: `${yPos}px` }}
              >
                <span className="w-16 text-right pr-2 text-[10px] text-white/30 select-none">
                  {activeMetric === "margin"
                    ? `${refVal.toFixed(0)}%`
                    : activeMetric === "units"
                    ? refVal.toFixed(0)
                    : formatCurrency(refVal)}
                </span>
                <div className="flex-1 border-b border-white/[0.06]" />
              </div>
            );
          })}

          {/* Bars Container */}
          <div className="absolute inset-x-0 bottom-8 flex justify-around pl-16 pr-4">
            {monthlyData.map((d, i) => {
              const val =
                activeMetric === "revenue"
                  ? d.revenue
                  : activeMetric === "profit"
                  ? d.grossProfit
                  : activeMetric === "margin"
                  ? d.marginPct
                  : d.unitsSold;

              const barHeight = Math.max((val / maxValue) * chartHeight, 4);
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={d.monthKey || d.month}
                  className="group relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-16 z-20 pointer-events-none whitespace-nowrap rounded-lg border border-white/20 bg-primary/95 px-3 py-1.5 shadow-xl backdrop-blur-md">
                      <p className="text-[11px] font-semibold text-white">{d.month}</p>
                      <p className="text-xs font-bold text-accent">
                        {activeMetric === "margin"
                          ? `${d.marginPct.toFixed(2)}% Margin`
                          : activeMetric === "units"
                          ? `${d.unitsSold} Units`
                          : formatCurrency(val)}
                      </p>
                      <div className="text-[10px] text-white/60">
                        Rev: {formatCurrency(d.revenue)} | Profit: {formatCurrency(d.grossProfit)}
                      </div>
                    </div>
                  )}

                  {/* Dual Bar / Glow Stack */}
                  <div
                    className="relative flex items-end justify-center"
                    style={{ height: `${chartHeight}px`, width: "42px" }}
                  >
                    {/* Secondary Ghost Bar for Revenue when Profit is selected */}
                    {activeMetric === "profit" && (
                      <div
                        className="absolute bottom-0 w-8 rounded-t bg-white/10"
                        style={{ height: `${Math.max((d.revenue / maxValue) * chartHeight, 4)}px` }}
                      />
                    )}

                    {/* Primary Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}px` }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className={`relative w-8 rounded-t transition-all duration-200 ${
                        isHovered
                          ? "bg-accent brightness-125 shadow-lg shadow-accent/40"
                          : activeMetric === "margin"
                          ? "bg-gradient-to-t from-accent/60 to-accent"
                          : "bg-gradient-to-t from-accent/70 to-[#e838cc]"
                      }`}
                    />
                  </div>

                  {/* X-axis Label */}
                  <span
                    className={`mt-2 text-[11px] transition-colors duration-200 ${
                      isHovered ? "font-bold text-accent" : "text-white/60"
                    }`}
                  >
                    {d.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Footer Summary */}
      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Active Metric
          </span>
          {activeMetric === "profit" && (
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-white/20" /> Gross Revenue
            </span>
          )}
        </div>
        <div>
          Highest Month:{" "}
          <span className="font-semibold text-white">
            {monthlyData.reduce((max, d) => (d.revenue > max.revenue ? d : max), monthlyData[0])?.month || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
