import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Eye, TrendingUp, MessageSquare } from "lucide-react";
import influencerGirl from "@/assets/influencer-girl.png";

const useAnimatedCounter = (target: number, duration: number, startWhen: boolean) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!startWhen) {
      setCount(0);
      setDone(false);
      return;
    }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        setDone(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [startWhen, target, duration]);

  return { count, done };
};

const comments = [
  { user: "sarah_101", text: "OMG need this! 😍" },
  { user: "mike_tech", text: "Just ordered! 💳" },
  { user: "fashion_queen", text: "Link please!! 🔥" },
];

const InfluencerCollabShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // once: false so it resets when scrolling away
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });

  // All counters run in parallel
  const views = useAnimatedCounter(847200, 2000, isInView);
  const engagement = useAnimatedCounter(12, 2000, isInView);
  const commentsCount = useAnimatedCounter(3420, 2000, isInView);
  const earnings = useAnimatedCounter(12480, 2000, isInView);

  const likesTarget = 24831;
  const likesApprox = isInView ? Math.floor((views.count / 847200) * likesTarget) : 0;

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex flex-col justify-center py-12 md:py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Live Preview</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
            See It <span className="gradient-text">In Action</span>
          </h2>
        </motion.div>

        {/* Main showcase grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-6xl mx-auto">

          {/* LEFT: 3D Floating Influencer Card with Girl */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              animate={isInView ? {
                rotateY: [0, 12, -12, 0],
                rotateX: [0, -5, 5, 0],
                y: [0, -16, 0],
              } : { rotateY: 0, rotateX: 0, y: 0 }}
              transition={{
                rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-[280px] md:w-[320px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated glow border */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary blur-md"
              />

              {/* Card */}
              <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden">
                {/* Girl image - full body visible, performing brand action */}
                <div className="h-[340px] md:h-[400px] relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                  <motion.img
                    src={influencerGirl}
                    alt="Influencer promoting brand"
                    className="h-full w-auto object-contain drop-shadow-[0_0_25px_hsl(var(--primary)/0.4)]"
                    animate={isInView ? {
                      y: [0, -6, 0],
                      rotate: [0, 1.5, -1.5, 0],
                    } : { y: 0, rotate: 0 }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    }}
                  />

                  {/* Floating product she's "showing off" */}
                  <motion.div
                    className="absolute top-[15%] right-[10%] bg-background/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-primary/40 shadow-lg"
                    animate={isInView ? {
                      y: [0, -8, 0],
                      scale: [0.95, 1.05, 0.95],
                      opacity: [0.8, 1, 0.8],
                    } : { opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <span className="text-lg">💄</span>
                    <p className="text-[8px] font-bold text-primary mt-0.5">NEW!</p>
                  </motion.div>

                  {/* "Tap to shop" action indicator */}
                  <motion.div
                    className="absolute bottom-[30%] right-[8%] bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-[9px] font-bold"
                    animate={isInView ? {
                      scale: [1, 1.1, 1],
                      opacity: [0, 1, 1, 0],
                    } : { opacity: 0 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    🛍️ Tap to Shop
                  </motion.div>

                  {/* Swipe-up arrow animation */}
                  <motion.div
                    className="absolute bottom-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center"
                    animate={isInView ? { opacity: [0, 1, 0], y: [10, -5, -15] } : { opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  >
                    <span className="text-foreground/70 text-[9px] font-semibold">Swipe Up</span>
                    <span className="text-primary text-sm">↑</span>
                  </motion.div>

                  {/* Top-left: view count */}
                  <motion.div
                    animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-semibold text-foreground"
                  >
                    <Eye className="w-3 h-3 text-primary" />
                    {views.count.toLocaleString()}
                  </motion.div>

                  {/* Floating emojis rising from the girl */}
                  {["❤️", "🔥", "✨", "💜", "🎯"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-xl"
                      animate={isInView ? {
                        y: [-10, -80],
                        x: [0, (i - 2) * 20],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.3, 0.7],
                      } : { opacity: 0 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeOut",
                      }}
                      style={{ bottom: "25%", left: `${15 + i * 17}%` }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>

                {/* Brand overlay tag */}
                <motion.div
                  animate={isInView ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-[75px] left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border/50"
                >
                  <span className="text-xs font-bold text-primary">💄 @LuxuryBrand</span>
                </motion.div>

                {/* Card footer */}
                <div className="p-3 bg-card">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <span className="text-xs font-semibold text-foreground">@influencer_bella</span>
                    <span className="text-primary text-[10px]">✓</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">
                    Obsessed with this new collection! 💖✨
                    <span className="text-primary"> #ad #sponsored</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Metrics + Social Post UI */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Eye, label: "Views", count: views.count, active: isInView, suffix: "" },
                { icon: TrendingUp, label: "Engagement", count: engagement.count, active: isInView, suffix: "%" },
                { icon: MessageSquare, label: "Comments", count: commentsCount.count, active: isInView, suffix: "" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={metric.active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="glass-card p-3 text-center"
                >
                  <metric.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-lg md:text-xl font-heading font-bold text-foreground glow-text">
                    {metric.count.toLocaleString()}{metric.suffix}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Instagram-style post mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="glass-card overflow-hidden"
            >
              <div className="flex items-center gap-3 p-3 border-b border-border/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                  <div className="w-full h-full rounded-full bg-card overflow-hidden">
                    <img src={influencerGirl} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">influencer_bella <span className="text-primary">✓</span></p>
                  <p className="text-[9px] text-muted-foreground">Sponsored</p>
                </div>
              </div>

              <div className="h-44 relative overflow-hidden bg-black">
                <iframe
                  src="https://player.vimeo.com/video/1008516986?muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1&app_id=122963"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                  allow="autoplay; fullscreen"
                  title="Influencer video"
                />
                {/* Product tag overlay on the post */}
                <motion.div
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-primary/30 text-[8px] font-bold text-primary z-10"
                  animate={isInView ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  💄 Shop Now
                </motion.div>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-3 mb-2">
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="w-4 h-4 text-destructive fill-destructive" />
                  </motion.div>
                  <MessageCircle className="w-4 h-4 text-foreground" />
                  <Share2 className="w-4 h-4 text-foreground" />
                  <Bookmark className="w-4 h-4 text-foreground ml-auto" />
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">
                  {likesApprox.toLocaleString()} likes
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">influencer_bella</span>{" "}
                  Obsessed with this collection from <span className="text-primary">@LuxuryBrand</span>! 💖
                </p>
              </div>
            </motion.div>

            {/* Comment bubbles */}
            <div className="flex flex-wrap gap-2">
              {comments.map((comment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 15 }}
                  animate={commentsCount.count > (i + 1) * 800 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 15 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="glass-card px-3 py-1.5 text-[10px]"
                >
                  <span className="font-semibold text-foreground">@{comment.user}:</span>{" "}
                  <span className="text-muted-foreground">{comment.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Revenue display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="glass-card p-4 border-primary/30 glow-border text-center"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-1">💰 Campaign Earnings</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground glow-text">
                ${earnings.count.toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerCollabShowcase;
