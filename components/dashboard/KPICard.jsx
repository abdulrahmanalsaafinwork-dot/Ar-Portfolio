import { motion } from "framer-motion";

const KPICard = ({ title, value, subtitle, icon: Icon, badge, highlight, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-primary/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/40 ${
        highlight ? "ring-1 ring-accent/30" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {title}
          </p>
          <h3
            className="mt-2 text-2xl font-bold tracking-tight text-white"
          >
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-white/60">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-xl text-accent">
            <Icon />
          </div>
        )}
      </div>

      {badge && (
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
            {badge}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;
