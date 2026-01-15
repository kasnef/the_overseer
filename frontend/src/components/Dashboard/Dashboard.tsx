import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Activity, Zap, Shield, Clock } from "lucide-react";
import { LiveResourceChart } from "./LiveResourceChart";
import { ActivityTimeline } from "./ActivityTimeline";
import { TaskStatisticsChart } from "./TaskStatisticsChart";
import { FocusTimer } from "./FocusTimer";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">The Overseer</h1>
          <p className="text-secondary">Don't be lazy mah brother!</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">Export Report</Button>
          <Button>Pause Agent</Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-y-auto pr-2">
        {/* Top Section: Heatbeat & Focus Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
          {/* Live Agent Heartbeat Section (Span 2) */}
          <div className="lg:col-span-2 bg-surface rounded-3xl p-8 shadow-soft border border-border flex items-center gap-8 relative overflow-hidden">
            {/* Visual Pulse */}
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-accent rounded-full opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-2 bg-accent rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-accent to-accent-end rounded-full shadow-glow flex items-center justify-center">
                <Activity className="text-white w-6 h-6" />
              </div>
            </div>

            <div className="relative z-10 flex-1">
              <h2 className="text-2xl font-bold mb-2 text-primary">
                Agent is Active
              </h2>
              <div className="flex gap-6 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span>PID: 1342</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Uptime: 02:14:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Timer (Span 1) */}
          <FocusTimer />
        </div>

        {/* Middle Section: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0 min-h-[300px]">
          {/* Live Resource Chart (Span 2) */}
          <div className="lg:col-span-2 bg-surface p-6 rounded-3xl shadow-soft border border-border">
            <LiveResourceChart />
          </div>
          {/* Task Stats (Span 1) */}
          <div className="bg-surface p-6 rounded-3xl shadow-soft border border-border">
            <TaskStatisticsChart />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-surface p-6 rounded-3xl shadow-soft border border-border shrink-0">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
