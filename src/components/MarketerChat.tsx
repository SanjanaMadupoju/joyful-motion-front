import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE } from "@/lib/api";
import ChatSessionSidebar, { ChatSession } from "@/components/ChatSessionSidebar";

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

const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const MarketerChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const fetchHistory = useCallback(async (sessionId: string) => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch(`${API_BASE}/sales/history/${sessionId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const history: Message[] = (data.history ?? data.messages ?? data ?? []).map(
        (msg: any, i: number) => ({
          id: `${sessionId}-${i}`,
          role: msg.role ?? (msg.sender === "user" ? "user" : "assistant"),
          content: msg.content ?? msg.message ?? msg.text ?? "",
          timestamp: new Date(msg.timestamp ?? Date.now()),
        })
      );
      setMessages(history);
    } catch {
      setMessages([
        { id: Date.now().toString(), role: "assistant", content: "⚠️ Could not load chat history.", timestamp: new Date() },
      ]);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  const handleNewChat = useCallback(() => {
    const newId = generateSessionId();
    const newSession: ChatSession = { id: newId, title: "New Chat", createdAt: new Date() };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setMessages([]);
    setInput("");
  }, []);

  const handleSelectSession = useCallback(
    (sessionId: string) => {
      if (sessionId === activeSessionId) return;
      setActiveSessionId(sessionId);
      setMessages([]);
      fetchHistory(sessionId);
    },
    [activeSessionId, fetchHistory]
  );

  const handleRenameSession = useCallback((sessionId: string, newTitle: string) => {
    setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, title: newTitle } : s)));
  }, []);

  const handleDeleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([]);
      }
    },
    [activeSessionId]
  );

  const sendMessage = async (userMessage: string) => {
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      const newId = generateSessionId();
      const newSession: ChatSession = {
        id: newId,
        title: userMessage.slice(0, 40) + (userMessage.length > 40 ? "…" : ""),
        createdAt: new Date(),
      };
      setSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newId);
      currentSessionId = newId;
    } else {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId && s.title === "New Chat"
            ? { ...s, title: userMessage.slice(0, 40) + (userMessage.length > 40 ? "…" : "") }
            : s
        )
      );
    }

    setIsTyping(true);
    try {
      const res = await fetch(`${API_BASE}/sales/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: currentSessionId, message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.response ?? data.message ?? data.reply ?? JSON.stringify(data.reply),
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "⚠️ Could not reach the backend. Make sure the server is running at localhost:8000.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    sendMessage(input.trim());
    setInput("");
  };

  const handlePromptClick = (prompt: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: prompt, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    sendMessage(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] glass-card rounded-2xl overflow-hidden">
      <ChatSessionSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onRenameSession={handleRenameSession}
        onDeleteSession={handleDeleteSession}
        isLoading={isLoadingHistory}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 glow-border flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Campaign AI Assistant</h2>
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-start">
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
    </div>
  );
};

export default MarketerChat;
