import { FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaChartPie } from "react-icons/fa";

const InsightsCard = ({ summary }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <FaLightbulb className="text-amber-400 text-lg" />
        <div>
          <h4 className="text-base font-bold text-white">Data Analyst Insights & Executive Takeaways</h4>
          <p className="text-xs text-white/50">
            Automated business findings derived from workbook transaction history
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5">
          <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Top Performing Channels</h5>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              <strong className="text-white">Walk-in</strong> (₱981,271.80) and <strong className="text-white">TikTok Shop</strong> (₱905,330.00) together represent over <span className="text-accent font-semibold">55.2%</span> of total sales revenue. Direct store foot traffic continues to deliver the highest conversion value.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5">
          <FaChartPie className="mt-1 shrink-0 text-accent" />
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Product Revenue Drivers</h5>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              The <strong className="text-white">New Balance 530</strong> (₱403,943.10) and <strong className="text-white">New Balance 550</strong> (₱389,539.90) are the top revenue generators, generating <span className="text-accent font-semibold">₱279,083.00</span> in cumulative gross profit alone.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5">
          <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Healthy Profit Margin & Fulfillment</h5>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              The business maintains a reliable <strong className="text-white">37.16% Gross Margin</strong> across 490 completed orders. Order fulfillment is strong at a <span className="text-emerald-400 font-semibold">98.0% completion rate</span> with minimal cancellations (2.0%).
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5">
          <FaExclamationTriangle className="mt-1 shrink-0 text-amber-400" />
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Inventory Velocity & Reorder Priority</h5>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              Current stock stands at <strong className="text-white">342 units (₱1,038,700 total valuation)</strong>. <strong className="text-white">New Balance 550</strong> (16 units remaining, 2.09 months cover) and <strong className="text-white">Nike Dunk Low</strong> (18 units, 3.24 months cover) warrant priority procurement before seasonal peaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsCard;
