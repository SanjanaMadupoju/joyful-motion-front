import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Zap, Shield, Users, Eye, Bot, CreditCard, BarChart3, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import InfluencerCollabShowcase from "@/components/InfluencerCollabShowcase";

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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* ═══ HERO — Full-screen immersive ═══ */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </motion.div>

        {/* Giant watermark text */}
        <motion.div
          style={{ x: watermarkX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="font-heading text-[18vw] font-bold text-foreground/[0.03] leading-none whitespace-nowrap">
            Shadow
          </span>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 mb-10">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
                  SURGE × OpenClaw 2026
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] mb-4 tracking-tight"
            >
              <span className="text-foreground">Shadow</span>
              <span className="gradient-text">Pulse</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-heading text-xl md:text-2xl text-muted-foreground font-light tracking-[0.15em] uppercase mb-12"
            >
              Network
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-14 leading-relaxed font-light"
            >
              7 autonomous AI agents. Zero human touchpoints.
              <br className="hidden md:block" />
              Recruit, verify & pay micro-influencers — on autopilot.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base glow-border">
                  Launch Campaign
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-border/60 text-foreground hover:bg-secondary h-14 px-10 text-base">
                  Join as Influencer
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-primary/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ ABOUT — Video on top + editorial text below ═══ */}
      <section className="relative py-32 overflow-hidden">
        {/* Giant background letter */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 pointer-events-none select-none">
          <span className="font-heading text-[40vw] font-bold text-foreground/[0.02] leading-none">P</span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Video on top */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 rounded-2xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/5 aspect-video max-w-4xl mx-auto"
          >
            <iframe
              src="https://player.vimeo.com/video/1008516986?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1&app_id=122963"
              className="w-full h-full"
              style={{ border: 'none' }}
              allow="autoplay; fullscreen"
              title="ShadowPulse Network"
            />
          </motion.div>

          {/* Content below */}
          <div className="max-w-3xl ml-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight"
              >
                The ShadowPulse
                <br />
                <span className="gradient-text">Network</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 font-light"
              >
                ShadowPulse is a fully autonomous, AI-driven micro-influencer marketing
                platform built for the SURGE × OpenClaw Hackathon 2026. It replaces the
                entire influencer campaign lifecycle — from brief to payment — with
                seven specialized AI agents.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-base md:text-lg text-muted-foreground leading-relaxed font-light"
              >
                Powered by Groq Llama 3.3 70B and Solana blockchain payments,
                each campaign is planned, executed, verified, and settled without
                a single human touchpoint.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ INFLUENCER COLLAB SHOWCASE ═══ */}
      <InfluencerCollabShowcase />

      {/* ═══ AGENTS — Grid with staggered reveals ═══ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Architecture
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Powered by
              <br />
              <span className="gradient-text">7 Agents</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30"
          >
            {agents.map((agent, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="group bg-background p-8 md:p-10 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                      <agent.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      Agent {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{agent.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — Numbered editorial steps ═══ */}
      <section className="py-32 relative overflow-hidden">
        {/* Giant background number */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/4 pointer-events-none select-none">
          <span className="font-heading text-[50vw] font-bold text-foreground/[0.02] leading-none">04</span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Process
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
              How It
              <br />
              <span className="gradient-text">Works</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="group border-t border-border/30 py-10 md:py-14 flex items-start md:items-center gap-6 md:gap-12"
              >
                <span className="font-heading text-5xl md:text-7xl font-bold text-primary/15 group-hover:text-primary/30 transition-colors duration-500 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border/30" />
          </div>
        </div>
      </section>

      {/* ═══ CTA — Cinematic final section ═══ */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[0.9]"
            >
              Ready to
              <br />
              <span className="gradient-text">Shadow-Pulse</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg mb-12 font-light max-w-md mx-auto">
              Launch your first AI-powered influencer campaign in minutes.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 h-14 text-base glow-border">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER — Minimal ═══ */}
      <footer className="border-t border-border/30 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-heading font-bold text-sm text-foreground tracking-wide">
              ShadowPulse Network
            </span>
          </div>
          <p className="text-xs text-muted-foreground tracking-wide">
            SURGE × OpenClaw Hackathon 2026 · Groq Llama 3.3 70B · Solana
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
