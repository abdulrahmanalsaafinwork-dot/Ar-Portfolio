import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  HiArrowDownTray,
  HiArrowPath,
  HiCurrencyDollar,
  HiShoppingBag,
  HiChartBar,
  HiInboxStack,
  HiTag,
  HiAdjustmentsHorizontal,
  HiMagnifyingGlass,
  HiDocumentChartBar,
} from "react-icons/hi2";
import { FaFileExcel, FaFileCsv } from "react-icons/fa";

// Components
import Circles from "../../components/Circles";
import KPICard from "../../components/dashboard/KPICard";
import SalesChart from "../../components/dashboard/SalesChart";
import ChannelChart from "../../components/dashboard/ChannelChart";
import InventoryTable from "../../components/dashboard/InventoryTable";
import DataTable from "../../components/dashboard/DataTable";
import InsightsCard from "../../components/dashboard/InsightsCard";

// Static Dataset generated from Excel
import analyticsData from "../../data/analytics_data.json";

const formatCurrency = (val) => {
  return "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const SalesInventoryDashboard = () => {
  // Filters State
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'sales', 'inventory', 'table', 'insights'

  // Pre-mapped lookup dictionaries
  const productsMap = useMemo(() => {
    const map = {};
    analyticsData.products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, []);

  const customersMap = useMemo(() => {
    const map = {};
    analyticsData.customers.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, []);

  // Filtered Sales Transactions
  const filteredSales = useMemo(() => {
    return analyticsData.sales.filter((item) => {
      const prod = productsMap[item.productId] || {};

      if (selectedChannel !== "All" && item.channel !== selectedChannel) return false;
      if (selectedPayment !== "All" && item.paymentMethod !== selectedPayment) return false;
      if (selectedStatus !== "All" && item.orderStatus !== selectedStatus) return false;
      if (selectedCategory !== "All" && prod.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && prod.brand !== selectedBrand) return false;

      if (selectedMonth !== "All") {
        const d = new Date(item.orderDate);
        if (isNaN(d.getTime())) return false;
        const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (mKey !== selectedMonth) return false;
      }

      return true;
    });
  }, [selectedChannel, selectedCategory, selectedBrand, selectedPayment, selectedStatus, selectedMonth, productsMap]);

  // Dynamic Aggregations based on filtered transactions
  const summary = useMemo(() => {
    let revenue = 0;
    let cogs = 0;
    let profit = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;
    let unitsSold = 0;

    const channelBreakdown = {};
    const paymentBreakdown = {};
    const monthlyMap = {};

    filteredSales.forEach((r) => {
      const isCompleted = r.orderStatus === "Completed";
      if (isCompleted) {
        completedOrders++;
        revenue += r.salesRevenue;
        cogs += r.cogs;
        profit += r.grossProfit;
        unitsSold += r.quantity;

        // Channel
        const ch = r.channel || "Other";
        if (!channelBreakdown[ch]) channelBreakdown[ch] = { revenue: 0, orders: 0, units: 0 };
        channelBreakdown[ch].revenue += r.salesRevenue;
        channelBreakdown[ch].orders += 1;
        channelBreakdown[ch].units += r.quantity;

        // Monthly
        const d = new Date(r.orderDate);
        if (!isNaN(d.getTime())) {
          const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const mLabel = `${mNames[d.getMonth()]} ${d.getFullYear()}`;
          const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          if (!monthlyMap[sortKey]) {
            monthlyMap[sortKey] = {
              monthKey: sortKey,
              month: mLabel,
              revenue: 0,
              cogs: 0,
              grossProfit: 0,
              orders: 0,
              unitsSold: 0,
            };
          }
          monthlyMap[sortKey].revenue += r.salesRevenue;
          monthlyMap[sortKey].cogs += r.cogs;
          monthlyMap[sortKey].grossProfit += r.grossProfit;
          monthlyMap[sortKey].orders += 1;
          monthlyMap[sortKey].unitsSold += r.quantity;
        }
      } else {
        cancelledOrders++;
      }

      // Payment Breakdown (All valid attempts)
      const pay = r.paymentMethod || "Other";
      paymentBreakdown[pay] = (paymentBreakdown[pay] || 0) + 1;
    });

    const marginPct = revenue > 0 ? (profit / revenue) * 100 : 0;
    const aov = completedOrders > 0 ? revenue / completedOrders : 0;

    // Monthly array sorted chronologically
    const sortedMonthly = Object.keys(monthlyMap)
      .sort()
      .map((k) => {
        const m = monthlyMap[k];
        return {
          ...m,
          marginPct: m.revenue > 0 ? (m.grossProfit / m.revenue) * 100 : 0,
          aov: m.orders > 0 ? m.revenue / m.orders : 0,
        };
      });

    return {
      revenue,
      cogs,
      profit,
      marginPct,
      completedOrders,
      cancelledOrders,
      totalOrders: filteredSales.length,
      unitsSold,
      aov,
      channelBreakdown,
      paymentBreakdown,
      monthlyData: sortedMonthly.length > 0 ? sortedMonthly : analyticsData.monthly,
    };
  }, [filteredSales]);

  // Inventory filtered based on category/brand selection
  const filteredInventory = useMemo(() => {
    return analyticsData.inventory.filter((item) => {
      const prod = productsMap[item.productId] || {};
      if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && prod.brand !== selectedBrand) return false;
      return true;
    });
  }, [selectedCategory, selectedBrand, productsMap]);

  const totalStockValue = useMemo(() => {
    return filteredInventory.reduce((acc, i) => acc + i.stockValue, 0);
  }, [filteredInventory]);

  const isFiltered =
    selectedChannel !== "All" ||
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedPayment !== "All" ||
    selectedStatus !== "All" ||
    selectedMonth !== "All";

  const handleResetFilters = () => {
    setSelectedChannel("All");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedPayment("All");
    setSelectedStatus("All");
    setSelectedMonth("All");
  };

  const handleDownloadExcel = () => {
    window.location.href = "/api/download-excel";
  };

  // Distinct Filter Options
  const categories = ["All", ...new Set(analyticsData.products.map((p) => p.category))];
  const brands = ["All", ...new Set(analyticsData.products.map((p) => p.brand))];
  const channels = ["All", "Walk-in", "TikTok", "Facebook", "Website"];
  const paymentMethods = ["All", "Card", "GCash", "Maya", "Cash"];
  const statuses = ["All", "Completed", "Cancelled"];
  const months = [
    { id: "All", label: "All Months" },
    ...analyticsData.monthly.map((m) => ({ id: m.monthKey, label: m.month })),
  ];

  return (
    <div className="dashboard-page relative min-h-screen bg-primary/30 text-white py-28 md:py-32">
      <Head>
        <title>Sales & Inventory Analytics Dashboard | Abdulrahman Alsaafin</title>
        <meta
          name="description"
          content="Interactive Business Intelligence and Sales & Inventory Analyst Dashboard built from professional retail workbook data."
        />
      </Head>

      <Circles />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-accent">
              Sales &amp; Inventory Analytics
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Interactive BI <span className="text-accent">Dashboard</span>
            </h1>
            <p className="mt-1 text-xs text-white/60 sm:text-sm">
              Comprehensive data analytics on revenue, profit margins, product velocity, sales channels, and stock replenishment.
            </p>
          </div>

          {/* Quick Actions / Downloads */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:border-accent hover:bg-accent shadow-sm cursor-pointer"
            >
              <FaFileExcel className="text-emerald-400 text-sm" />
              Download Excel Workbook
            </button>

            <div className="relative group">
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white/80 transition-all hover:bg-white/10">
                <FaFileCsv className="text-accent text-sm" />
                CSV Exports
              </button>
              <div className="absolute right-0 top-full mt-1 hidden w-48 rounded-xl border border-white/15 bg-primary/95 p-1.5 shadow-2xl backdrop-blur-md group-hover:block z-30">
                {[
                  { label: "Sales Data CSV", file: "/data/sales_data.csv" },
                  { label: "Products Catalog CSV", file: "/data/products.csv" },
                  { label: "Customers CSV", file: "/data/customers.csv" },
                  { label: "Monthly Analysis CSV", file: "/data/monthly_analysis.csv" },
                  { label: "Inventory Health CSV", file: "/data/inventory_analysis.csv" },
                ].map((csv) => (
                  <a
                    key={csv.label}
                    href={csv.file}
                    download
                    className="block rounded-lg px-3 py-1.5 text-xs text-white/80 hover:bg-accent/20 hover:text-white transition-colors"
                  >
                    {csv.label}
                  </a>
                ))}
              </div>
            </div>

            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/20"
              >
                <HiArrowPath className="text-xs" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-6 rounded-xl border border-white/10 bg-primary/40 p-4 backdrop-blur-md">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <HiAdjustmentsHorizontal className="text-accent text-lg" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Interactive Filters
              </span>
              {isFiltered && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                  Active Filters
                </span>
              )}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center">
              {/* Channel */}
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {channels.map((ch) => (
                  <option key={ch} value={ch} className="bg-[#1a1235] text-white">
                    Channel: {ch}
                  </option>
                ))}
              </select>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#1a1235] text-white">
                    Category: {cat}
                  </option>
                ))}
              </select>

              {/* Brand */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {brands.map((b) => (
                  <option key={b} value={b} className="bg-[#1a1235] text-white">
                    Brand: {b}
                  </option>
                ))}
              </select>

              {/* Payment Method */}
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {paymentMethods.map((pm) => (
                  <option key={pm} value={pm} className="bg-[#1a1235] text-white">
                    Payment: {pm}
                  </option>
                ))}
              </select>

              {/* Status */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {statuses.map((st) => (
                  <option key={st} value={st} className="bg-[#1a1235] text-white">
                    Status: {st}
                  </option>
                ))}
              </select>

              {/* Month */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
              >
                {months.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#1a1235] text-white">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Executive KPI Metric Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(summary.revenue)}
            subtitle={`${summary.completedOrders} completed transactions`}
            icon={HiCurrencyDollar}
            highlight={true}
            delay={0.05}
          />

          <KPICard
            title="Gross Profit"
            value={formatCurrency(summary.profit)}
            subtitle={`COGS: ${formatCurrency(summary.cogs)}`}
            icon={HiChartBar}
            highlight={true}
            delay={0.1}
          />

          <KPICard
            title="Gross Margin"
            value={`${summary.marginPct.toFixed(2)}%`}
            subtitle="Profit / Revenue Ratio"
            icon={HiDocumentChartBar}
            badge={summary.marginPct >= 35 ? "High Margin (37%)" : "Target"}
            delay={0.15}
          />

          <KPICard
            title="Completed Orders"
            value={summary.completedOrders.toLocaleString()}
            subtitle={`${summary.cancelledOrders} cancelled (${((summary.cancelledOrders / (summary.totalOrders || 1)) * 100).toFixed(1)}%)`}
            icon={HiShoppingBag}
            delay={0.2}
          />

          <KPICard
            title="Units Sold"
            value={summary.unitsSold.toLocaleString()}
            subtitle={`Avg Order Value: ${formatCurrency(summary.aov)}`}
            icon={HiTag}
            delay={0.25}
          />

          <KPICard
            title="Stock Valuation"
            value={formatCurrency(totalStockValue)}
            subtitle={`${filteredInventory.reduce((acc, i) => acc + i.currentStock, 0)} units on hand`}
            icon={HiInboxStack}
            delay={0.3}
          />
        </div>

        {/* View Navigation Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-white/10 pb-2 scrollbar-none gap-2">
          {[
            { id: "all", label: "Comprehensive View" },
            { id: "sales", label: "Sales & Channels" },
            { id: "inventory", label: "Inventory Health" },
            { id: "table", label: "Transactions Log" },
            { id: "insights", label: "Executive Insights" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${activeTab === tab.id
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* 1. Overview / Sales Charts */}
          {(activeTab === "all" || activeTab === "sales") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <SalesChart monthlyData={summary.monthlyData} />
              <ChannelChart
                channelData={summary.channelBreakdown}
                paymentData={summary.paymentBreakdown}
                selectedChannel={selectedChannel}
                onSelectChannel={(ch) => setSelectedChannel(ch)}
              />
            </motion.div>
          )}

          {/* 2. Inventory Section */}
          {(activeTab === "all" || activeTab === "inventory") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InventoryTable inventoryData={filteredInventory} />
            </motion.div>
          )}

          {/* 3. Transaction Log Table */}
          {(activeTab === "all" || activeTab === "table") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DataTable
                salesData={filteredSales}
                productsMap={productsMap}
                customersMap={customersMap}
              />
            </motion.div>
          )}

          {/* 4. Analyst Insights */}
          {(activeTab === "all" || activeTab === "insights") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <InsightsCard summary={summary} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesInventoryDashboard;
