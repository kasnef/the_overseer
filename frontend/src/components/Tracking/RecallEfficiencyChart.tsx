import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { cycle: "1", time: 5 },
  { cycle: "2", time: 12 },
  { cycle: "3", time: 4 },
  { cycle: "4", time: 20 },
  { cycle: "5", time: 3 },
  { cycle: "6", time: 8 },
  { cycle: "7", time: 2 },
];

export function RecallEfficiencyChart() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary">Recall Efficiency</h3>
        <p className="text-xs text-secondary">Return-to-IDE Time (sec)</p>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="cycle"
              stroke="var(--color-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}s`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
              }}
              itemStyle={{ color: "var(--color-primary)" }}
              cursor={{
                stroke: "var(--color-accent)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Line
              type="monotone"
              dataKey="time"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-surface)",
                stroke: "var(--color-accent)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
