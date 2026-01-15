import { useState, KeyboardEvent } from "react";
import { Plus, Calendar, Clock } from "lucide-react";

interface QuickAddBarProps {
  onAdd: (title: string, deadline: Date) => void;
}

export function QuickAddBar({ onAdd }: QuickAddBarProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim() && date && time) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (!title.trim() || !date || !time) return;

    // Combine date and time
    const deadline = new Date(`${date}T${time}`);
    onAdd(title.trim(), deadline);

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <div className="bg-surface rounded-2xl p-3 shadow-soft border border-border flex flex-col gap-3">
      {/* Top Row: Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
          <Plus size={18} />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-secondary/50 text-lg font-medium"
        />
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-border/50 w-full" />

      {/* Bottom Row: Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Date Input */}
          <div className="relative group">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-surface-hover rounded-lg border border-transparent hover:border-border/50 outline-none text-xs text-primary pl-8 pr-2 py-1.5
                        focus:ring-2 focus:ring-accent/20 cursor-pointer w-[130px] transition-all"
            />
          </div>

          {/* Time Input */}
          <div className="relative group">
            <Clock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-surface-hover rounded-lg border border-transparent hover:border-border/50 outline-none text-xs text-primary pl-8 pr-2 py-1.5
                        focus:ring-2 focus:ring-accent/20 cursor-pointer w-[108px] transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={!title.trim() || !date || !time}
          className="px-6 py-1.5 rounded-lg bg-accent text-white text-xs font-bold uppercase tracking-wide
                   hover:brightness-110 active:scale-95 transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
