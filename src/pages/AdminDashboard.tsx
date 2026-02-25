import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, Activity, Bot, CheckCircle, XCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import GlowCard from "@/components/GlowCard";

const fraudAlerts = [
  { type: "Bot Farm Detected", detail: "Coordinated registration from 12 accounts — same IP range", severity: "high", time: "5 min ago" },
  { type: "Fake Screenshot", detail: "Vision LLM detected manipulated view count in proof submission", severity: "medium", time: "18 min ago" },
  { type: "AI Content Detected", detail: "Story image flagged — distorted fingers, perfect lighting artifacts", severity: "low", time: "1 hr ago" },
];

const agentStatus = [
  { name: "Main Agent", status: "Running", tasks: 3 },
  { name: "Marketing Agent", status: "Running", tasks: 8 },
  { name: "Scrutiny Agent", status: "Running", tasks: 2 },
  { name: "Scheduler Agent", status: "Running", tasks: 45 },
  { name: "Validation Agent", status: "Running", tasks: 12 },
  { name: "Payment Agent", status: "Idle", tasks: 0 },
  { name: "Analytics Agent", status: "Running", tasks: 1 },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Platform health & fraud monitoring</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Activity} label="Active Campaigns" value="24" change="+3 today" delay={0} />
          <StatCard icon={Users} label="Total Influencers" value="1,847" delay={0.1} />
          <StatCard icon={Shield} label="Fraud Blocked" value="₹42K" change="saved this week" delay={0.2} />
          <StatCard icon={AlertTriangle} label="Pending Alerts" value="3" delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Agent Status */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Agent Status</h2>
            <GlowCard>
              <div className="space-y-3">
                {agentStatus.map((agent, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Bot className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{agent.tasks} tasks</span>
                      <span className={`flex items-center gap-1 text-xs ${
                        agent.status === "Running" ? "text-success" : "text-muted-foreground"
                      }`}>
                        {agent.status === "Running" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Fraud Alerts */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Fraud Alerts</h2>
            <div className="space-y-4">
              {fraudAlerts.map((alert, i) => (
                <GlowCard key={i} delay={0.1 * i} glow={alert.severity === "high"}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${
                      alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-warning" : "text-muted-foreground"
                    }`} />
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{alert.type}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.detail}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
