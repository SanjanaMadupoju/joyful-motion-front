import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Loader2, PanelLeftClose, PanelLeft, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
  onRenameSession?: (sessionId: string, newTitle: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  isLoading?: boolean;
}

const ChatSessionSidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onRenameSession,
  onDeleteSession,
  isLoading,
}: ChatSessionSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditValue(session.title);
  };

  const confirmRename = () => {
    if (editingId && editValue.trim()) {
      onRenameSession?.(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  const cancelRename = () => setEditingId(null);

  if (collapsed) {
    return (
      <div className="flex flex-col items-center py-3 px-1 border-r border-border/50 gap-2">
        <Button size="icon" variant="ghost" onClick={() => setCollapsed(false)} className="h-8 w-8">
          <PanelLeft className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={onNewChat} className="h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-60 flex-shrink-0 border-r border-border/50 flex flex-col bg-secondary/30">
      <div className="p-3 flex items-center justify-between border-b border-border/50">
        <Button onClick={onNewChat} size="sm" className="flex-1 mr-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-1" />
          New Chat
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setCollapsed(true)} className="h-8 w-8 flex-shrink-0">
          <PanelLeftClose className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 group",
                  activeSessionId === session.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {editingId === session.id ? (
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") confirmRename();
                        if (e.key === "Escape") cancelRename();
                      }}
                      className="h-6 text-xs px-1 bg-secondary border-border"
                      autoFocus
                    />
                    <Button size="icon" variant="ghost" onClick={confirmRename} className="h-5 w-5 flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={cancelRename} className="h-5 w-5 flex-shrink-0">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onSelectSession(session.id)}
                      className="flex items-start gap-2 flex-1 min-w-0 text-left"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span className="truncate">{session.title}</span>
                    </button>
                    <div className="hidden group-hover:flex items-center gap-0.5 flex-shrink-0">
                      <Button size="icon" variant="ghost" onClick={(e) => startRename(session, e)} className="h-5 w-5">
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession?.(session.id);
                        }}
                        className="h-5 w-5 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {!isLoading && sessions.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No conversations yet</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSessionSidebar;
