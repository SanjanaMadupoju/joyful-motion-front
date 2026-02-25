import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Users, Eye, Bot, CreditCard, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlowCard from "@/components/GlowCard";
import heroBg from "@/assets/hero-bg.jpg";

const agents = [
  { icon: Bot, title: "Main Agent", desc: "Orchestrates campaigns from natural language briefs. Calculates plans, deploys escrow." },
  { icon: Zap, title: "Marketing Agent", desc: "Generates authentic story scripts & image prompts tailored to each influencer." },
  { icon: Shield, title: "Scrutiny Agent", desc: "Vets influencers with heuristic + LLM audit. Detects bots & fake accounts." },
  { icon: Eye, title: "Validation Agent", desc: "Vision LLM checks proof screenshots for fraud, fake metrics & AI content." },
  { icon: CreditCard, title: "Payment Agent", desc: "Instant SURGE token payments on Solana. Sub-second, < ₹0.02 per tx." },
  { icon: BarChart3, title: "Analytics Agent", desc: "Real-time campaign insights, geo heatmaps & budget optimization." },
];

const steps = [
  { num: "01", title: "Brief Your Campaign", desc: "Describe your product, budget, target audience in natural language." },
  { num: "02", title: "AI Plans & Pricing", desc: "Get 3 optimized plan tiers with ROI projections. Customize & approve." },
  { num: "03", title: "Autonomous Execution", desc: "7 agents recruit influencers, assign tasks, verify & pay — zero touchpoints." },
  { num: "04", title: "Real-Time Analytics", desc: "Watch views, engagement & spend live. Get daily AI-generated reports." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">SURGE × OpenClaw Hackathon 2026</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Shadow</span>
              <span className="gradient-text">Pulse</span>
              <br />
              <span className="text-foreground text-3xl md:text-5xl lg:text-5xl">Network</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              7 autonomous AI agents. Zero human touchpoints. Recruit, score, generate, assign, verify & pay
              micro-influencers — all on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 glow-border">
                  Launch Campaign
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Join as Influencer
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "AI Agents", value: "7" },
              { label: "Cost/Tx", value: "< ₹0.02" },
              { label: "Settlement", value: "< 1 sec" },
              { label: "Human Touch", value: "Zero" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <p className="text-2xl font-heading font-bold text-primary glow-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Powered by <span className="gradient-text">7 Agents</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each agent is a specialized OpenClaw Skill running Groq Llama 3.3 70B — working together autonomously.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <agent.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{agent.title}</h3>
                <p className="text-sm text-muted-foreground">{agent.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 relative gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <GlowCard key={i} delay={i * 0.15}>
                <span className="text-4xl font-heading font-bold text-primary/20">{step.num}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12 max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Ready to <span className="gradient-text">Shadow-Pulse</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Launch your first AI-powered influencer campaign in minutes.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-heading font-bold text-sm text-foreground">ShadowPulse Network</span>
          </div>
          <p className="text-xs text-muted-foreground">
            SURGE × OpenClaw Hackathon 2026 • Built with Groq Llama 3.3 70B • Payments on Solana
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
