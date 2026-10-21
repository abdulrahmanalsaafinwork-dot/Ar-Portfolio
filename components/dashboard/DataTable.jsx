import { useState, useMemo } from "react";
import { FaDownload, FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const formatCurrency = (val) => {
  return "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const DataTable = ({ salesData = [], productsMap = {}, customersMap = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("orderDate");
  const [sortDirection, setSortDirection] = useState("desc"); // 'asc' or 'desc'

  // Filter based on search query
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return salesData;
    const term = searchTerm.toLowerCase();

    return salesData.filter((item) => {
      const orderMatch = item.orderId?.toLowerCase().includes(term);
      const custName = customersMap[item.customerId]?.name?.toLowerCase() || "";
      const custCity = customersMap[item.customerId]?.city?.toLowerCase() || "";
      const prodName = productsMap[item.productId]?.name?.toLowerCase() || "";
      const channelMatch = item.channel?.toLowerCase().includes(term);
      const paymentMatch = item.paymentMethod?.toLowerCase().includes(term);
      const statusMatch = item.orderStatus?.toLowerCase().includes(term);

      return (
        orderMatch ||
        custName.includes(term) ||
        custCity.includes(term) ||
        prodName.includes(term) ||
        channelMatch ||
        paymentMatch ||
        statusMatch
      );
    });
  }, [salesData, searchTerm, customersMap, productsMap]);

  // Sort
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "orderDate") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === "asc" ? valA - valB : valB - valA;
    });
  }, [filteredRecords, sortField, sortDirection]);

  // Paginate
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Export filtered CSV
  const exportFilteredCSV = () => {
    const headers = [
      "Order ID", "Date", "Customer", "City", "Product", "Quantity", 
      "Unit Price", "Discount", "Revenue", "Profit", "Channel", "Payment", "Status"
    ];

    const rows = sortedRecords.map((r) => [
      r.orderId,
      new Date(r.orderDate).toLocaleDateString("en-PH"),
      customersMap[r.customerId]?.name || r.customerId,
      customersMap[r.customerId]?.city || "",
      productsMap[r.productId]?.name || r.productId,
      r.quantity,
      r.unitPrice,
      r.discount,
      r.salesRevenue,
      r.grossProfit,
      r.channel,
      r.paymentMethod,
      r.orderStatus,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `filtered_sales_data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md">
      {/* Table Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            Underlying Sales Transactions
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/70">
              {filteredRecords.length} of {salesData.length} records
            </span>
          </h4>
          <p className="text-xs text-white/50">
            Granular order log from the Sales_Data worksheet
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs" />
            <input
              type="text"
              placeholder="Search order, customer, city, item..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-56 rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={exportFilteredCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-white"
          >
            <FaDownload className="text-[10px]" /> Export View CSV
          </button>
        </div>
      </div>

      {/* Table Element */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-accent">
              <th className="cursor-pointer px-3 py-3" onClick={() => handleSort("orderId")}>
                Order ID {sortField === "orderId" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-3" onClick={() => handleSort("orderDate")}>
                Date {sortField === "orderDate" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-3 py-3">Customer & Location</th>
              <th className="px-3 py-3">Product Name</th>
              <th className="cursor-pointer px-3 py-3 text-right" onClick={() => handleSort("quantity")}>
                Qty {sortField === "quantity" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-3 text-right" onClick={() => handleSort("salesRevenue")}>
                Revenue {sortField === "salesRevenue" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="cursor-pointer px-3 py-3 text-right" onClick={() => handleSort("grossProfit")}>
                Profit {sortField === "grossProfit" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-3 py-3">Channel</th>
              <th className="px-3 py-3">Payment</th>
              <th className="px-3 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-white/40">
                  No transaction records match the current search or filters.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((item) => {
                const prod = productsMap[item.productId] || {};
                const cust = customersMap[item.customerId] || {};
                const isCompleted = item.orderStatus === "Completed";
                const d = new Date(item.orderDate);
                const dateFormatted = !isNaN(d.getTime())
                  ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : item.orderDate;

                return (
                  <tr key={item.orderId} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-3 py-3 font-mono font-bold text-white">{item.orderId}</td>
                    <td className="px-3 py-3 text-white/60 whitespace-nowrap">{dateFormatted}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-white">{cust.name || item.customerId}</div>
                      <div className="text-[10px] text-white/40">{cust.city || "NCR"}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-white/90">{prod.name || item.productId}</div>
                      <div className="text-[10px] text-accent/80">{prod.brand} • {prod.category}</div>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-white">{item.quantity}</td>
                    <td className="px-3 py-3 text-right font-bold text-white">
                      {formatCurrency(item.salesRevenue)}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-emerald-400">
                      {formatCurrency(item.grossProfit)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-white/70">
                        {item.channel}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-white/60">{item.paymentMethod}</td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {item.orderStatus}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-4 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded border border-white/10 bg-primary/80 px-2 py-1 text-xs text-white focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-white/40">
            Showing {Math.min((currentPage - 1) * pageSize + 1, sortedRecords.length)} -{" "}
            {Math.min(currentPage * pageSize, sortedRecords.length)} of {sortedRecords.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaAngleLeft />
          </button>
          <span className="px-2 font-medium text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
