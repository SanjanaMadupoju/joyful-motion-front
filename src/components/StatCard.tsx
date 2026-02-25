import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, label, value, change, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 glow-border flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        {change && (
          <p className="text-xs text-success mt-1">
            {change}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
