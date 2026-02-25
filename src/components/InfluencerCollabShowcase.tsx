import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Eye, TrendingUp, MessageSquare } from "lucide-react";

const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const comments = [
  { user: "sarah_101", text: "OMG need this! 😍", delay: 0 },
  { user: "mike_tech", text: "Just ordered! 💳", delay: 1 },
  { user: "fashion_queen", text: "Link please!! 🔥", delay: 2 },
];

const InfluencerCollabShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Live Preview</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
            See It <span className="gradient-text">In Action</span>
          </h2>
        </motion.div>

        {/* Main showcase grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT: 3D Floating Influencer Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={isInView ? {
                rotateY: [0, 8, -8, 0],
                y: [0, -15, 0],
              } : {}}
              transition={{
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-[280px] md:w-[320px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary opacity-60 blur-md animate-pulse" />

              {/* Card */}
              <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden">
                {/* Image area */}
                <div className="h-[320px] md:h-[380px] bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 flex items-center justify-center relative">
                  <div className="text-7xl">📸</div>

                  {/* Recording indicator */}
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute top-4 left-4 flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-semibold"
                  >
                    <div className="w-2 h-2 rounded-full bg-destructive-foreground" />
                    REC
                  </motion.div>

                  {/* Floating emojis */}
                  {["❤️", "🔥", "✨"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-2xl"
                      animate={{
                        y: [-20, -80],
                        x: [0, (i - 1) * 30],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                      style={{ bottom: "30%", left: `${30 + i * 20}%` }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                {/* Brand overlay tag */}
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-[90px] left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm px-5 py-2 rounded-full border border-border/50"
                >
                  <span className="text-sm font-bold text-primary">💄 @LuxuryBrand</span>
                </motion.div>

                {/* Card footer */}
                <div className="p-4 bg-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <span className="text-sm font-semibold text-foreground">@influencer_bella</span>
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Obsessed with this new collection! 💖✨ The quality is AMAZING! 😍
                    <span className="text-primary"> #ad #sponsored</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Metrics + Social Post UI */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-5"
          >
            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Eye, label: "Views", value: 847200, suffix: "" },
                { icon: TrendingUp, label: "Engagement", value: 12, suffix: "%" },
                { icon: MessageSquare, label: "Comments", value: 3420, suffix: "" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
                  className="glass-card p-4 text-center"
                >
                  <metric.icon className="w-4 h-4 text-primary mx-auto mb-2" />
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-xl md:text-2xl font-heading font-bold text-foreground glow-text">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Instagram-style post mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="glass-card overflow-hidden"
            >
              {/* Post header */}
              <div className="flex items-center gap-3 p-4 border-b border-border/30">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                  <div className="w-full h-full rounded-full bg-card" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">influencer_bella <span className="text-primary">✓</span></p>
                  <p className="text-[10px] text-muted-foreground">Sponsored</p>
                </div>
              </div>

              {/* Post image placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <motion.span
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-5xl"
                >
                  📸✨
                </motion.span>
              </div>

              {/* Post actions */}
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="w-5 h-5 text-destructive fill-destructive" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <MessageCircle className="w-5 h-5 text-foreground" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Share2 className="w-5 h-5 text-foreground" />
                  </motion.div>
                  <div className="ml-auto">
                    <Bookmark className="w-5 h-5 text-foreground" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  <AnimatedCounter target={24831} /> likes
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">influencer_bella</span>{" "}
                  Obsessed with this new collection from <span className="text-primary">@LuxuryBrand</span>! 💖✨
                </p>
              </div>
            </motion.div>

            {/* Comment bubbles */}
            <div className="flex flex-wrap gap-2">
              {comments.map((comment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + i * 0.2, duration: 0.5, type: "spring" }}
                  className="glass-card px-3 py-2 text-xs"
                >
                  <span className="font-semibold text-foreground">@{comment.user}:</span>{" "}
                  <span className="text-muted-foreground">{comment.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Revenue display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
              className="glass-card p-5 border-primary/30 glow-border text-center"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">💰 Campaign Earnings</p>
              <p className="text-3xl md:text-4xl font-heading font-bold text-foreground glow-text">
                $<AnimatedCounter target={12480} />
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerCollabShowcase;
