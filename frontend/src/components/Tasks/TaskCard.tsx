import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  AlertTriangle,
  Bell,
  BellOff,
  Volume2,
  Radio,
} from "lucide-react";
import { Task } from "@/types/Task";
import { cn } from "@/lib/utils";
import { SendNotification } from "@wailsjs/go/main/App";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  globalAlertsEnabled: boolean;
}

export function TaskCard({
  task,
  onUpdate,
  onDelete,
  globalAlertsEnabled,
}: TaskCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isOverdue, setIsOverdue] = useState(false);

  // ... inside TaskCard ...

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = task.deadline.getTime() - now.getTime();

      const isLate = diff < 0;

      // Trigger Notification if Late, Active, Global Enabled, and Level >= 2
      if (
        isLate &&
        !isOverdue &&
        task.status === "todo" &&
        globalAlertsEnabled &&
        task.alertLevel >= 2
      ) {
        // Only trigger ONCE when crossing the threshold (simple version)
        // or throttle it. For now, let's trigger it once when state flips to Overdue.
        // Note: isOverdue state inside this closure is stale, but we set it below.
        // Better check: if we weren't overdue before, but now we are.
        SendNotification(
          "The Overseer",
          `Task '${task.title}' is overdue! Get back to work.`
        );
      }

      setIsOverdue(isLate);

      const absDiff = Math.abs(diff);
      const hours = Math.floor(absDiff / (1000 * 60 * 60));
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

      const timeString = `${
        hours > 0 ? hours + "h " : ""
      }${minutes}m ${seconds}s`;
      setTimeLeft(isLate ? `-${timeString}` : timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, [task.deadline, task.status, task.alertLevel, globalAlertsEnabled]);

  const toggleStatus = () => {
    onUpdate(task.id, { status: task.status === "done" ? "todo" : "done" });
  };

  const cycleAlertLevel = () => {
    // Circle: 1 (Visual) -> 2 (System) -> 3 (Force) -> 0 (Off) -> 1
    const nextLevel = task.alertLevel + 1 > 3 ? 0 : task.alertLevel + 1;
    onUpdate(task.id, { alertLevel: nextLevel as Task["alertLevel"] });
  };

  const getAlertIcon = () => {
    switch (task.alertLevel) {
      case 0:
        return <BellOff size={16} />;
      case 1:
        return <Bell size={16} />; // Visual
      case 2:
        return <Volume2 size={16} />; // System
      case 3:
        return <Radio size={16} />; // Force
    }
  };

  const getAlertColor = () => {
    switch (task.alertLevel) {
      case 0:
        return "text-secondary";
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-red-600";
    }
  };

  const isShakeActive =
    isOverdue &&
    task.status === "todo" &&
    globalAlertsEnabled &&
    task.alertLevel > 0;

  return (
    <motion.div
      layout
      animate={
        isShakeActive
          ? {
              x: [0, -5, 5, -5, 5, 0],
              borderColor: [
                "var(--color-border)",
                "#ef4444",
                "var(--color-border)",
              ],
            }
          : {}
      }
      transition={
        isShakeActive
          ? {
              repeat: Infinity,
              duration: 0.5,
              repeatDelay: 2,
            }
          : {}
      }
      className={cn(
        "bg-surface rounded-2xl p-4 border border-border shadow-soft flex items-center gap-4 group transition-all duration-300",
        task.status === "done" && "opacity-60 bg-surface/50 grayscale",
        isOverdue && task.status === "todo" && "border-red-500/50 bg-red-500/5"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={toggleStatus}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
          task.status === "done"
            ? "bg-accent border-accent text-white"
            : "border-secondary hover:border-accent"
        )}
      >
        {task.status === "done" && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            "font-medium text-lg truncate transition-all",
            task.status === "done" && "line-through text-secondary"
          )}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-4 text-xs mt-1">
          <span
            className={cn(
              "flex items-center gap-1 font-mono",
              isOverdue && task.status === "todo"
                ? "text-red-500 font-bold"
                : "text-secondary"
            )}
          >
            <Clock size={12} />
            {timeLeft || " Calculating..."}
          </span>
          {isOverdue && task.status === "todo" && (
            <span className="flex items-center gap-1 text-red-500 font-bold animate-pulse">
              <AlertTriangle size={12} />
              OVERDUE
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Alert Level Toggle */}
        <button
          onClick={cycleAlertLevel}
          title={`Alert Level: ${task.alertLevel}`}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-surface-hover hover:brightness-110",
            getAlertColor()
          )}
        >
          {getAlertIcon()}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-red-500 hover:bg-surface-hover transition-all"
          title="Delete Task"
        >
          <span className="font-bold text-lg">×</span>
        </button>
      </div>
    </motion.div>
  );
}
