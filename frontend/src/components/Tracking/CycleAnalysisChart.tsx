import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Focus Work", value: 450, color: "#22c55e" }, // Green
  { name: "Auth Break", value: 120, color: "#eab308" }, // Yellow
  { name: "Idle/Lazy", value: 80, color: "#ef4444" }, // Red
];

export function CycleAnalysisChart() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary">Cycle Analysis</h3>
        <p className="text-xs text-secondary">Work-Reward Distribution</p>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
              }}
              itemStyle={{ color: "var(--color-primary)" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-primary">15</span>
          <span className="text-xs text-secondary">Cycles</span>
        </div>
      </div>
    </div>
  );
}
