import { useState, useEffect } from "react";
import { QuickAddBar } from "./QuickAddBar";
import { Task } from "@/types/Task";
import { AlertCircle } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { LoadTasks, SaveTasks, SendNotification } from "@wailsjs/go/main/App";

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [globalAlertsEnabled, setGlobalAlertsEnabled] = useState(true);

  // Load from Backend on mount
  useEffect(() => {
    LoadTasks()
      .then((loadedTasks: _Task[]) => {
        // Wails returns time.Time as string, need to convert to Date
        const parsedTasks: Task[] = (loadedTasks || []).map((t) => ({
          ...t,
          deadline: new Date(t.deadline),
          // Ensure alertLevel is typed correctly if backend returns number
          alertLevel: t.alertLevel as Task["alertLevel"],
          status: t.status as Task["status"],
        }));
        setTasks(parsedTasks);
      })
      .catch((err: unknown) => {
        console.error("Failed to load tasks:", err);
      });
  }, []);

  // Save to Backend on change
  useEffect(() => {
    // Only save if we have tasks or if we want to save empty state.
    // Deboucing could be good, but direct save is fine for now.
    // Convert Date to string? No, JSON.stringify handles Date -> ISO string,
    // which Wails/Go should unmarshal to time.Time.
    // However, SaveTasks expects the matching struct.
    // We cast to any to avoid strict type mismatch until bindings update.
    SaveTasks(tasks as any).then((res: string) => {
      console.log(res);
    });
  }, [tasks]);

  // Temporary interface to match the raw data from backend until bindings are generated
  interface _Task {
    id: string;
    title: string;
    deadline: string; // Received as string
    status: string;
    alertLevel: number;
  }

  const addTask = (title: string, deadline: Date) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      deadline,
      status: "todo",
      alertLevel: 1, // Default to Visual
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            Current Tasks
          </h1>
          <p className="text-secondary">
            Stay focused. Deadlines are closer than they appear.
          </p>
        </div>

        {/* Master Switch */}
        <div className="flex items-center gap-3 bg-surface p-2 rounded-xl border border-border">
          <span className="text-sm font-medium text-secondary pl-2">
            Pressure Mode
          </span>
          <button
            onClick={() => setGlobalAlertsEnabled(!globalAlertsEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
              globalAlertsEnabled ? "bg-red-500" : "bg-neutral-600"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                globalAlertsEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <QuickAddBar onAdd={addTask} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary opacity-50">
            <AlertCircle size={48} className="mb-4" />
            <p>No tasks yet. Add one properly, or suffer the consequences.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={(id, updates) =>
                  setTasks((current) =>
                    current.map((t) => (t.id === id ? { ...t, ...updates } : t))
                  )
                }
                onDelete={(id) =>
                  setTasks((current) => current.filter((t) => t.id !== id))
                }
                globalAlertsEnabled={globalAlertsEnabled}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
