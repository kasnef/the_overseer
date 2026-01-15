import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FocusTimer() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [preventedCount, setPreventedCount] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        // Simulate "Lazy Avoidance" events randomly
        if (Math.random() > 0.99) {
          setPreventedCount((prev) => prev + 1);
        }
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setPreventedCount(0);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-surface rounded-3xl p-6 shadow-soft border border-border flex flex-col gap-6 relative overflow-hidden">
      {/* Ghost Mode Overlay (Simulated when Active) */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-accent/5 pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      <div className="flex justify-between items-center relative z-10">
        <div>
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Zap className="text-accent w-5 h-5" />
            Focus Session
          </h3>
          <p className="text-xs text-secondary">Anti-Lazy Mode</p>
        </div>
        <div className="flex items-center gap-2 bg-main/50 px-3 py-1 rounded-full border border-border">
          <ShieldAlert size={14} className="text-orange-500" />
          <span className="text-xs font-semibold text-primary">
            {preventedCount} blocked
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
        <motion.div
          className="text-6xl font-black font-mono tracking-wider text-primary"
          animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {formatTime(time)}
        </motion.div>
        <p className="text-sm text-secondary mt-2">
          {isActive
            ? "Target locked. Distractions blocked."
            : "Ready to focus?"}
        </p>
      </div>

      <div className="flex gap-4 relative z-10">
        <Button
          className="flex-1"
          variant={isActive ? "secondary" : "primary"}
          onClick={toggleTimer}
        >
          {isActive ? (
            <>
              <Pause className="mr-2 w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 w-4 h-4" /> Start Focus
            </>
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={resetTimer}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
