import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "09:00", intensity: 30 },
  { time: "10:00", intensity: 85 }, // High flow
  { time: "11:00", intensity: 90 },
  { time: "12:00", intensity: 40 }, // Lunch
  { time: "13:00", intensity: 60 },
  { time: "14:00", intensity: 95 }, // Peak
  { time: "15:00", intensity: 70 },
];

export function MomentumChart() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary">Momentum Flow</h3>
        <p className="text-xs text-secondary">Work Intensity over Time</p>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-accent)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="time"
              stroke="var(--color-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
              }}
              itemStyle={{ color: "var(--color-primary)" }}
            />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="var(--color-accent)"
              fillOpacity={1}
              fill="url(#colorIntensity)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
