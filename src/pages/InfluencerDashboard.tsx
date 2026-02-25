import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Star, CheckCircle, Clock, Upload, Eye, IndianRupee, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import GlowCard from "@/components/GlowCard";

const availableCampaigns = [
  { brand: "FitNow Supplements", product: "Whey Protein 2kg", bounty: "₹120/1K views", niche: "Fitness", city: "Bengaluru", deadline: "24 hrs" },
  { brand: "Namma Biryani", product: "Chicken Biryani Delivery", bounty: "₹80/1K views", niche: "Food", city: "Koramangala", deadline: "24 hrs" },
  { brand: "UrbanGlow Skincare", product: "Vitamin C Serum", bounty: "₹150/1K views", niche: "Beauty", city: "All India", deadline: "24 hrs" },
];

const activeTasks = [
  { brand: "FitNow Supplements", script: "Just finished my morning workout and this protein shake...", status: "In Progress", timeLeft: "18h 30m" },
  { brand: "Namma Biryani", script: "Late night craving solved! Just ordered from...", status: "Submitted", timeLeft: "Verifying" },
];

const InfluencerDashboard = () => {
  const [tab, setTab] = useState<"campaigns" | "tasks" | "wallet">("campaigns");

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Influencer Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Browse campaigns & earn SURGE tokens</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Wallet} label="SURGE Balance" value="₹4,820" change="+₹1,200 today" delay={0} />
          <StatCard icon={Star} label="Humanity Score" value="87/100" delay={0.1} />
          <StatCard icon={CheckCircle} label="Tasks Completed" value="34" delay={0.2} />
          <StatCard icon={Eye} label="Total Views" value="126K" change="+12K this week" delay={0.3} />
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-secondary p-1 mb-6 max-w-md">
          {(["campaigns", "tasks", "wallet"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Campaigns Tab */}
        {tab === "campaigns" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">Available Campaigns</h2>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                <Filter className="w-3 h-3 mr-2" />
                Filter
              </Button>
            </div>
            {availableCampaigns.map((c, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{c.brand}</h3>
                    <p className="text-sm text-muted-foreground">{c.product}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{c.niche}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{c.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-heading font-semibold text-primary">{c.bounty}</p>
                      <p className="text-xs text-muted-foreground">{c.deadline} deadline</p>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Join
                    </Button>
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}

        {/* Tasks Tab */}
        {tab === "tasks" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">Active Tasks</h2>
            {activeTasks.map((t, i) => (
              <GlowCard key={i} delay={i * 0.1} glow={t.status === "In Progress"}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground">{t.brand}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        t.status === "In Progress" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{t.script}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {t.timeLeft}
                      </div>
                    </div>
                    {t.status === "In Progress" && (
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Upload className="w-3 h-3 mr-1" />
                        Submit Proof
                      </Button>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}

        {/* Wallet Tab */}
        {tab === "wallet" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <GlowCard glow className="text-center py-8">
              <IndianRupee className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">SURGE Token Balance</p>
              <p className="text-4xl font-heading font-bold text-foreground glow-text">₹4,820</p>
              <p className="text-xs text-muted-foreground mt-2">Solana Wallet: 7xK...m9R</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                Withdraw SURGE
              </Button>
            </GlowCard>

            <h3 className="font-heading font-semibold text-foreground">Recent Payments</h3>
            {[
              { brand: "FitNow Supplements", amount: "+₹340", time: "2 min ago" },
              { brand: "Namma Biryani", amount: "+₹180", time: "1 hr ago" },
              { brand: "UrbanGlow Skincare", amount: "+₹680", time: "Yesterday" },
            ].map((p, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{p.brand}</p>
                    <p className="text-xs text-muted-foreground">{p.time}</p>
                  </div>
                  <p className="font-heading font-bold text-success">{p.amount}</p>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDashboard;
