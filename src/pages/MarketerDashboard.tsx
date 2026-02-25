import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, CreditCard, Plus, ArrowUpRight, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import GlowCard from "@/components/GlowCard";

const campaigns = [
  {
    name: "Protein Supplement Launch",
    status: "Active",
    influencers: 142,
    views: "486K",
    budget: "₹18,400",
    remaining: "₹6,200",
    progress: 72,
  },
  {
    name: "Namma Biryani Weekend",
    status: "Completed",
    influencers: 85,
    views: "312K",
    budget: "₹12,000",
    remaining: "₹0",
    progress: 100,
  },
  {
    name: "Craft Beer Tasting Event",
    status: "Pending",
    influencers: 0,
    views: "0",
    budget: "₹25,000",
    remaining: "₹25,000",
    progress: 0,
  },
];

const MarketerDashboard = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Marketer Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your influencer campaigns</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Eye} label="Total Views" value="798K" change="+18% this week" delay={0} />
          <StatCard icon={Users} label="Active Influencers" value="142" change="+23 today" delay={0.1} />
          <StatCard icon={CreditCard} label="SURGE Spent" value="₹30,400" delay={0.2} />
          <StatCard icon={TrendingUp} label="Avg. Engagement" value="11.4%" change="+2.1%" delay={0.3} />
        </div>

        {/* Campaigns */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Your Campaigns</h2>
          <div className="space-y-4">
            {campaigns.map((c, i) => (
              <GlowCard key={i} delay={0.1 * i} className="!p-0 overflow-hidden">
                <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading font-semibold text-foreground truncate">{c.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          c.status === "Active"
                            ? "bg-success/10 text-success"
                            : c.status === "Completed"
                            ? "bg-muted text-muted-foreground"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-secondary rounded-full mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Influencers</p>
                      <p className="font-heading font-semibold text-foreground">{c.influencers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Views</p>
                      <p className="font-heading font-semibold text-foreground">{c.views}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Budget</p>
                      <p className="font-heading font-semibold text-foreground">{c.budget}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                      View
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Agent Activity</h2>
          <GlowCard>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Validation Agent approved 12 proof submissions", time: "2 min ago", color: "text-success" },
                { icon: CreditCard, text: "Payment Agent disbursed ₹1,200 SURGE to 12 influencers", time: "3 min ago", color: "text-primary" },
                { icon: Users, text: "Scrutiny Agent rejected 3 bot accounts", time: "15 min ago", color: "text-destructive" },
                { icon: Clock, text: "Scheduler Agent sent 45 deadline reminders", time: "1 hr ago", color: "text-warning" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <activity.icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketerDashboard;
