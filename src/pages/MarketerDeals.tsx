import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowUpRight, Briefcase, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import GlowCard from "@/components/GlowCard";

interface Deal {
  deal_id: string;
  brand?: string;
  name?: string;
  title?: string;
  status?: string;
  [key: string]: any;
}

const MarketerDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    apiFetch("/sales/deals")
      .then((data) => {
        setDeals(data.deals ?? data ?? []);
      })
      .catch(() => setError("Could not fetch deals. Ensure backend is running."))
      .finally(() => setLoading(false));
  }, []);

  const viewDeal = async (dealId: string) => {
    setDetailLoading(true);
    try {
      const data = await apiFetch(`/sales/deals/${dealId}`);
      setSelectedDeal(data.deal ?? data);
    } catch {
      setSelectedDeal(null);
    } finally {
      setDetailLoading(false);
    }
  };

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
        <h1 className="font-heading text-3xl font-bold text-foreground">Deals</h1>
        <p className="text-muted-foreground text-sm mt-1">All campaign deals from the sales agent</p>
      </motion.div>

      {selectedDeal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <GlowCard glow className="relative">
            <Button size="sm" variant="ghost" onClick={() => setSelectedDeal(null)} className="absolute top-3 right-3 text-muted-foreground">
              ✕
            </Button>
            <h3 className="font-heading font-semibold text-foreground text-lg mb-3">Deal Detail</h3>
            {detailLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-auto max-h-64">
                {JSON.stringify(selectedDeal, null, 2)}
              </pre>
            )}
          </GlowCard>
        </motion.div>
      )}

      <div className="space-y-3">
        {deals.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">No deals found.</p>
        ) : (
          deals.map((deal, i) => (
            <GlowCard key={deal.deal_id ?? i} delay={i * 0.05}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-foreground truncate">
                      {deal.name ?? deal.title ?? deal.brand ?? deal.deal_id}
                    </p>
                    {deal.status && (
                      <span className="text-xs text-muted-foreground">{deal.status}</span>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => viewDeal(deal.deal_id)} className="border-primary/30 text-primary hover:bg-primary/10 flex-shrink-0">
                  View <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </GlowCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MarketerDeals;
