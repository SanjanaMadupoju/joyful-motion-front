import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, MapPin, Calendar, Briefcase, Instagram, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GlowCard from "@/components/GlowCard";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  {
    icon: Briefcase,
    label: "Launch a campaign",
    prompt: "I want to launch a new influencer campaign for my brand. Help me set it up.",
  },
];

const MarketerChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let response = "";

      if (lowerMsg.includes("launch") || lowerMsg.includes("campaign") || lowerMsg.includes("set up")) {
        response = `Great! Let's set up your campaign. I'll need a few details:\n\n📌 **Brand Name** — What's your brand or product?\n📅 **Duration** — How many days should the campaign run?\n📍 **Target Area** — Which city or region should we target?\n🎯 **Niche** — What category? (Food, Fitness, Fashion, Tech, etc.)\n💰 **Budget** — What's your SURGE token budget?\n\nShare these details and I'll find the best influencers for you!`;
      } else if (lowerMsg.includes("target") || lowerMsg.includes("bangalore") || lowerMsg.includes("region") || lowerMsg.includes("area")) {
        response = `📍 Got it! I can target influencers in specific regions. Here's what I can do:\n\n• **Hyper-local targeting** — City-level (e.g., Bangalore, Mumbai, Chennai)\n• **Zone targeting** — South India, North India, etc.\n• **Radius targeting** — Within a specific km radius\n\nTell me the **city/region** and the **niche**, and I'll pull up matching influencers with their engagement stats.`;
      } else if (lowerMsg.includes("7-day") || lowerMsg.includes("timeline") || lowerMsg.includes("days") || lowerMsg.includes("duration")) {
        response = `📅 Perfect! Here's a suggested **7-day campaign timeline**:\n\n• **Day 1-2** — Influencer outreach & onboarding\n• **Day 3-5** — Content creation & posting window\n• **Day 6** — Engagement monitoring & boost\n• **Day 7** — Final reporting & SURGE disbursement\n\nWould you like me to proceed with this timeline? Also, please share your **brand name** and **target area** so I can start matching influencers.`;
      } else if (lowerMsg.includes("instagram") || lowerMsg.includes("outreach") || lowerMsg.includes("message") || lowerMsg.includes("draft")) {
        response = `📩 Here's a sample **Instagram outreach template**:\n\n---\n*"Hey {{influencer_name}}! 👋\n\nWe love your content on {{niche}}! We're launching a campaign for **{{brand_name}}** and think you'd be a perfect fit.\n\n📅 Duration: {{days}} days\n💰 Compensation: {{surge_amount}} SURGE tokens\n📍 Target: {{area}}\n\nInterested? Reply here and our AI agent will handle the rest!"*\n---\n\nWant me to customize this with your brand details?`;
      } else {
        response = `Thanks for the details! I'm processing your request. To create the best campaign, make sure I have:\n\n✅ Brand/product name\n✅ Campaign duration (days)\n✅ Target area/city\n✅ Influencer niche\n✅ Budget in SURGE tokens\n\nOnce confirmed, I'll match you with top influencers in the area and send outreach messages via Instagram. 🚀`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    simulateResponse(input.trim());
    setInput("");
  };

  const handlePromptClick = (prompt: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    simulateResponse(prompt);
  };

  return (
    <div className="flex flex-col h-[500px] glass-card rounded-2xl overflow-hidden">
      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 glow-border flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Campaign AI Assistant
              </h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Tell me about your brand, campaign duration, target area, and I'll find the right influencers and send outreach via Instagram.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 max-w-lg w-full">
              {suggestedPrompts.map((sp, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => handlePromptClick(sp.prompt)}
                  className="glass-card p-4 text-left hover:border-primary/40 transition-colors group cursor-pointer"
                >
                  <sp.icon className="w-4 h-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{sp.label}</p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "glass-card rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="glass-card rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking…</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-4">
        <div className="flex gap-3 items-end max-w-3xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your campaign — brand, duration, target area…"
            className="min-h-[48px] max-h-[120px] resize-none bg-secondary/50 border-border/50 focus:border-primary/50"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketerChat;
