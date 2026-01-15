import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

// Mock data generator
const generateData = () => {
  const now = new Date();
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now.getTime() - (20 - i) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    cpu: Math.floor(Math.random() * 40) + 10, // 10-50%
    network: Math.floor(Math.random() * 500) + 100, // 100-600 Kbps
  }));
};

export function LiveResourceChart() {
  const { theme } = useTheme();
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const lastTime = new Date();
        next.push({
          time: lastTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          cpu:
            Math.floor(Math.random() * 40) +
            10 +
            (Math.random() > 0.8 ? 30 : 0), // Occasional spikes
          network: Math.floor(Math.random() * 800) + 100,
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const textColor = theme === "dark" ? "#ADB2AD" : "#5F635F";
  const gridColor = theme === "dark" ? "#2C2E2C" : "#E2E8E2";

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold text-primary mb-4 px-2">
        Live Resource Stream
      </h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />
            <XAxis
              dataKey="time"
              stroke={textColor}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              interval={4}
            />
            <YAxis
              yAxisId="left"
              stroke={textColor}
              tick={{ fontSize: 12 }}
              label={{
                value: "CPU %",
                angle: -90,
                position: "insideLeft",
                fill: textColor,
                fontSize: 10,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={textColor}
              tick={{ fontSize: 12 }}
              label={{
                value: "Net (Kbps)",
                angle: 90,
                position: "insideRight",
                fill: textColor,
                fontSize: 10,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--bg-surface))",
                borderColor: "rgb(var(--border-color))",
                borderRadius: "12px",
                boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                color: "rgb(var(--text-primary))",
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="cpu"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCpu)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="network"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNetwork)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
