import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type TimelineSegment = {
  status: "busy" | "idle";
  duration: number; // in minutes
  startTime: string;
};

// Mock data: Last 60 minutes
const mockSegments: TimelineSegment[] = [
  { status: "busy", duration: 15, startTime: "09:00" },
  { status: "idle", duration: 5, startTime: "09:15" },
  { status: "busy", duration: 25, startTime: "09:20" },
  { status: "idle", duration: 10, startTime: "09:45" },
  { status: "busy", duration: 5, startTime: "09:55" },
];

export function ActivityTimeline() {
  const { theme } = useTheme();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-lg font-semibold text-primary">
          Activity Timeline
        </h3>
        <span className="text-xs text-secondary">Last 60 Minutes</span>
      </div>

      {/* Timeline Bar */}
      <div className="w-full h-12 flex rounded-xl overflow-hidden shadow-soft border border-border">
        {mockSegments.map((segment, index) => {
          const widthPercent = (segment.duration / 60) * 100;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "h-full relative group cursor-pointer border-r border-main/10 last:border-0",
                segment.status === "busy"
                  ? "bg-accent/80 hover:bg-accent"
                  : "bg-gray-600 dark:bg-zinc-700 hover:bg-gray-500 dark:hover:bg-zinc-600"
              )}
              style={{ width: `${widthPercent}%` }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="bg-primary text-main text-xs py-1 px-2 rounded-lg shadow-lg">
                  <p className="font-bold capitalize">{segment.status}</p>
                  <p>
                    {segment.startTime} - {segment.duration}m
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent/80"></div>
          <span className="text-xs text-secondary">Busy (Working)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-border bg-gray-600"></div>
          <span className="text-xs text-secondary">Idle (Break)</span>
        </div>
      </div>
    </div>
  );
}
