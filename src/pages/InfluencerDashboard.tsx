import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, Star, CheckCircle, Clock, Upload, Eye, IndianRupee, Filter, Loader2, UserPlus, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StatCard from "@/components/StatCard";
import GlowCard from "@/components/GlowCard";
import { apiFetch } from "@/lib/api";

interface InfluencerProfile {
  influencer_id: string;
  name: string;
  instagram: string;
  status: string;
  tasks_completed: number;
  total_earned_surge: number;
  total_earned_inr: number;
  active_task: any;
  task_history: any[];
}

const InfluencerDashboard = () => {
  const [influencerId, setInfluencerId] = useState<string | null>(() => localStorage.getItem("influencer_id"));
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  const [tab, setTab] = useState<"campaigns" | "tasks" | "wallet" | "register">(influencerId ? "campaigns" : "register");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Registration form
  const [regForm, setRegForm] = useState({ name: "", instagram_handle: "", follower_count: "", bio: "", wallet_address: "" });
  const [regLoading, setRegLoading] = useState(false);
  const [regResult, setRegResult] = useState<string | null>(null);

  const loadDashboard = async (id: string) => {
    setLoading(true);
    try {
      const data = await apiFetch(`/influencer/dashboard/${id}`);
      setProfile({ influencer_id: id, ...data });
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async () => {
    try {
      const data = await apiFetch("/influencer/campaigns");
      setCampaigns(data.campaigns ?? data ?? []);
    } catch {
      setCampaigns([]);
    }
  };

  const loadTasks = async (id: string) => {
    try {
      const data = await apiFetch(`/influencer/my-tasks/${id}`);
      setTasks(data.tasks ?? []);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (influencerId) {
      loadDashboard(influencerId);
      loadCampaigns();
      loadTasks(influencerId);
    }
  }, [influencerId]);

  const handleRegister = async () => {
    setRegLoading(true);
    setRegResult(null);
    try {
      const data = await apiFetch("/influencer/register", {
        method: "POST",
        body: JSON.stringify({
          ...regForm,
          follower_count: parseInt(regForm.follower_count) || 0,
        }),
      });
      const newId = data.influencer_id;
      localStorage.setItem("influencer_id", newId);
      setInfluencerId(newId);
      setRegResult(data.message ?? "Registered successfully!");
      setTab("campaigns");
    } catch {
      setRegResult("Registration failed. Ensure backend is running.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Influencer Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {influencerId ? `ID: ${influencerId}` : "Register to get started"}
          </p>
        </motion.div>

        {/* Stats - only if logged in */}
        {profile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Wallet} label="SURGE Earned" value={`₹${profile.total_earned_surge}`} delay={0} />
            <StatCard icon={IndianRupee} label="INR Earned" value={`₹${profile.total_earned_inr}`} delay={0.1} />
            <StatCard icon={CheckCircle} label="Tasks Completed" value={String(profile.tasks_completed)} delay={0.2} />
            <StatCard icon={Star} label="Status" value={profile.status} delay={0.3} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex rounded-lg bg-secondary p-1 mb-6 max-w-lg overflow-x-auto">
          {(influencerId
            ? (["campaigns", "tasks", "wallet"] as const)
            : (["register", "campaigns"] as const)
          ).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all capitalize whitespace-nowrap px-3 ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Register Tab */}
        {tab === "register" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md">
            <GlowCard glow>
              <div className="flex items-center gap-3 mb-4">
                <UserPlus className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-lg font-semibold text-foreground">Register as Influencer</h2>
              </div>
              <div className="space-y-3">
                <Input placeholder="Your name" value={regForm.name} onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))} className="bg-secondary/50 border-border/50" />
                <Input placeholder="Instagram handle" value={regForm.instagram_handle} onChange={(e) => setRegForm((f) => ({ ...f, instagram_handle: e.target.value }))} className="bg-secondary/50 border-border/50" />
                <Input placeholder="Follower count" type="number" value={regForm.follower_count} onChange={(e) => setRegForm((f) => ({ ...f, follower_count: e.target.value }))} className="bg-secondary/50 border-border/50" />
                <Textarea placeholder="Bio" value={regForm.bio} onChange={(e) => setRegForm((f) => ({ ...f, bio: e.target.value }))} className="bg-secondary/50 border-border/50" rows={2} />
                <Input placeholder="Wallet address" value={regForm.wallet_address} onChange={(e) => setRegForm((f) => ({ ...f, wallet_address: e.target.value }))} className="bg-secondary/50 border-border/50" />
                <Button onClick={handleRegister} disabled={regLoading || !regForm.name || !regForm.instagram_handle} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {regLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Register
                </Button>
                {regResult && <p className="text-sm text-muted-foreground">{regResult}</p>}
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Campaigns Tab */}
        {tab === "campaigns" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">Available Campaigns</h2>
            {campaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">No active campaigns found.</p>
            ) : (
              campaigns.map((c: any, i: number) => (
                <GlowCard key={i} delay={i * 0.1}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-heading font-semibold text-foreground">{c.brand ?? c.name ?? c.title ?? `Campaign ${i + 1}`}</h3>
                      <p className="text-sm text-muted-foreground">{c.product ?? c.description ?? ""}</p>
                    </div>
                    {influencerId && (
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
                    )}
                  </div>
                </GlowCard>
              ))
            )}
          </motion.div>
        )}

        {/* Tasks Tab */}
        {tab === "tasks" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">My Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">No tasks assigned yet.</p>
            ) : (
              tasks.map((t: any, i: number) => (
                <GlowCard key={i} delay={i * 0.1}>
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {JSON.stringify(t, null, 2)}
                  </pre>
                </GlowCard>
              ))
            )}
          </motion.div>
        )}

        {/* Wallet Tab */}
        {tab === "wallet" && profile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <GlowCard glow className="text-center py-8">
              <IndianRupee className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">SURGE Token Balance</p>
              <p className="text-4xl font-heading font-bold text-foreground glow-text">₹{profile.total_earned_surge}</p>
              <p className="text-xs text-muted-foreground mt-2">INR earned: ₹{profile.total_earned_inr}</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6">Withdraw SURGE</Button>
            </GlowCard>

            {profile.task_history && profile.task_history.length > 0 && (
              <>
                <h3 className="font-heading font-semibold text-foreground">Task History</h3>
                {profile.task_history.map((t: any, i: number) => (
                  <GlowCard key={i} delay={i * 0.1}>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                      {JSON.stringify(t, null, 2)}
                    </pre>
                  </GlowCard>
                ))}
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDashboard;
