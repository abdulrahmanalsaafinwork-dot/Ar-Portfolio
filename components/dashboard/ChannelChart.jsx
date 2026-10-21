import { motion } from "framer-motion";

const formatCurrency = (val) => {
  return "₱" + Number(val).toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const ChannelChart = ({ channelData = {}, paymentData = {}, selectedChannel, onSelectChannel }) => {
  const totalRevenue = Object.values(channelData).reduce((acc, c) => acc + (c.revenue || 0), 0);
  const totalOrders = Object.values(channelData).reduce((acc, c) => acc + (c.orders || 0), 0);

  const channels = Object.entries(channelData).map(([name, stats]) => {
    const share = totalRevenue > 0 ? (stats.revenue / totalRevenue) * 100 : 0;
    return {
      name,
      revenue: stats.revenue,
      orders: stats.orders,
      units: stats.units,
      share,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Channel Breakdown */}
      <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 className="text-base font-bold text-white">Sales Channel Mix</h4>
            <p className="text-xs text-white/50">Revenue & order distribution by acquisition channel</p>
          </div>
          <span className="text-xs font-semibold text-accent">
            {formatCurrency(totalRevenue)} Total
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {channels.map((ch, idx) => {
            const isSelected = selectedChannel === ch.name;
            return (
              <div
                key={ch.name}
                onClick={() => onSelectChannel && onSelectChannel(isSelected ? "All" : ch.name)}
                className={`group cursor-pointer rounded-lg border p-3 transition-all duration-200 ${
                  isSelected
                    ? "border-accent bg-accent/15"
                    : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20 text-xs font-bold text-accent">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-white group-hover:text-accent transition-colors">
                      {ch.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">
                      {formatCurrency(ch.revenue)}
                    </span>
                    <span className="ml-2 text-xs font-semibold text-accent">
                      ({ch.share.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.share}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${
                        isSelected ? "bg-accent" : "bg-gradient-to-r from-accent to-[#e838cc]"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-white/40 whitespace-nowrap">
                    {ch.orders} orders • {ch.units} units
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h4 className="text-base font-bold text-white">Payment Methods</h4>
              <p className="text-xs text-white/50">Customer transaction preference breakdown</p>
            </div>
            <span className="text-xs font-semibold text-white/60">
              {totalOrders} Transactions
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(paymentData).map(([method, count], idx) => {
              const pct = totalOrders > 0 ? ((count / totalOrders) * 100).toFixed(1) : 0;
              return (
                <div
                  key={method}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-center transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {method}
                  </p>
                  <h5 className="mt-1 text-2xl font-bold text-white">{count}</h5>
                  <p className="mt-1 text-[11px] text-white/50">{pct}% of orders</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytical Note */}
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-3">
          <p className="text-xs text-white/70">
            <span className="font-semibold text-accent">Payment Insight:</span> Digital payments (GCash, Maya, Card) represent over 74% of all sales volume, while in-store Cash remains steady for Walk-in shoppers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelChart;
