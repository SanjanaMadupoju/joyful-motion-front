import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Users, AlertCircle, Instagram } from "lucide-react";
import { apiFetch } from "@/lib/api";
import GlowCard from "@/components/GlowCard";

interface Influencer {
  influencer_id: string;
  name: string;
  instagram_handle: string;
  follower_count: number;
  bio: string;
  status: string;
  tasks_completed: number;
  total_earned_surge: number;
}

const MarketerInfluencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/influencer/list")
      .then((data) => setInfluencers(data.influencers ?? []))
      .catch(() => setError("Could not fetch influencers."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Influencers</h1>
        <p className="text-muted-foreground text-sm mt-1">
          All registered micro-influencers ({influencers.length})
        </p>
      </motion.div>

      {influencers.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">No influencers registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {influencers.map((inf, i) => (
            <GlowCard key={inf.influencer_id} delay={i * 0.05}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-foreground truncate">{inf.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      inf.status === "available" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {inf.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <Instagram className="w-3 h-3" />
                    <span>@{inf.instagram_handle}</span>
                  </div>
                  {inf.bio && <p className="text-xs text-muted-foreground mt-1 truncate">{inf.bio}</p>}
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{inf.follower_count.toLocaleString()} followers</span>
                    <span>{inf.tasks_completed} tasks</span>
                    <span>₹{inf.total_earned_surge} earned</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketerInfluencers;
