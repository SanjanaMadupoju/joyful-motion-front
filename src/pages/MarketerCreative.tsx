import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import GlowCard from "@/components/GlowCard";

const MarketerCreative = () => {
  const [dealId, setDealId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!dealId.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const data = await apiFetch(`/creative/generate/${dealId.trim()}`, { method: "POST" });
      setContent(data);
    } catch {
      setError("Failed to generate content. Ensure backend is running.");
    } finally {
      setGenerating(false);
    }
  };

  const handleFetch = async () => {
    if (!dealId.trim()) return;
    setFetching(true);
    setError(null);
    try {
      const data = await apiFetch(`/creative/content/${dealId.trim()}`);
      setContent(data);
    } catch {
      setError("No content found for this deal.");
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Creative Agent</h1>
        <p className="text-muted-foreground text-sm mt-1">Generate and view AI-created campaign content</p>
      </motion.div>

      <GlowCard className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={dealId}
            onChange={(e) => setDealId(e.target.value)}
            placeholder="Enter Deal ID…"
            className="bg-secondary/50 border-border/50 flex-1"
          />
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!dealId.trim() || generating} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {generating ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Sparkles className="w-4 h-4 mr-1" />}
              Generate
            </Button>
            <Button onClick={handleFetch} disabled={!dealId.trim() || fetching} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              {fetching ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <FileText className="w-4 h-4 mr-1" />}
              Fetch
            </Button>
          </div>
        </div>
      </GlowCard>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm mb-4">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {content && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlowCard glow>
            <h3 className="font-heading font-semibold text-foreground mb-3">Generated Content</h3>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-auto max-h-96">
              {typeof content === "string" ? content : JSON.stringify(content, null, 2)}
            </pre>
          </GlowCard>
        </motion.div>
      )}
    </div>
  );
};

export default MarketerCreative;
