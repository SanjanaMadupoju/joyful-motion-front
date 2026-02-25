import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glow?: boolean;
}

const GlowCard = ({ children, className = "", delay = 0, glow = false }: GlowCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 ${glow ? "pulse-glow" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
