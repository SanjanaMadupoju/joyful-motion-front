import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Loader2, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
}

interface ChatSessionSidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  isLoading?: boolean;
}

const ChatSessionSidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  isLoading,
}: ChatSessionSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="flex flex-col items-center py-3 px-1 border-r border-border/50 gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(false)}
          className="h-8 w-8"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onNewChat}
          className="h-8 w-8"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-60 flex-shrink-0 border-r border-border/50 flex flex-col bg-secondary/30">
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b border-border/50">
        <Button
          onClick={onNewChat}
          size="sm"
          className="flex-1 mr-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Chat
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(true)}
          className="h-8 w-8 flex-shrink-0"
        >
          <PanelLeftClose className="w-4 h-4" />
        </Button>
      </div>

      {/* Session list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {sessions.map((session) => (
              <motion.button
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => onSelectSession(session.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-start gap-2 group",
                  activeSessionId === session.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span className="truncate">{session.title}</span>
              </motion.button>
            ))}
          </AnimatePresence>
          {!isLoading && sessions.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No conversations yet
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSessionSidebar;
