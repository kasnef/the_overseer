import {
  LayoutDashboard,
  Activity,
  CheckSquare,
  Settings,
  SquareActivity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tracking", label: "Tracking", icon: Activity },
    { id: "task", label: "Task", icon: CheckSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-full w-20 flex flex-col items-center py-6 bg-surface border-r border-border shadow-soft z-20">
      <div className="mb-8 p-2 bg-accent/10 rounded-xl">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
          {/* Logo placeholder */}
          <span className="text-white font-bold text-lg">
            <SquareActivity />
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative group flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300",
                isActive
                  ? "text-accent"
                  : "text-secondary hover:text-primary hover:bg-main/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent/10 rounded-2xl border border-accent/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <Icon
                size={24}
                className={cn(
                  "relative z-10 transition-all duration-300",
                  isActive
                    ? "scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                    : "group-hover:scale-105"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
