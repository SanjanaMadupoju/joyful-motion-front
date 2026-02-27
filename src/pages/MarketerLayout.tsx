import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, LayoutDashboard } from "lucide-react";
import MarketerChat from "@/components/MarketerChat";
import MarketerDashboard from "@/pages/MarketerDashboard";

const tabs = [
  { id: "chat", label: "AI Campaign Chat", icon: MessageSquare },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

type TabId = (typeof tabs)[number]["id"];

const MarketerLayout = () => {
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 mb-6 border-b border-border/50 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="marketer-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "chat" ? <MarketerChat /> : <MarketerDashboard embedded />}
      </div>
    </div>
  );
};

export default MarketerLayout;
