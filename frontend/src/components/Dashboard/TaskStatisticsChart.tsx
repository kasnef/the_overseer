import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";

const data = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 7 },
  { day: "Wed", tasks: 5 },
  { day: "Thu", tasks: 9 },
  { day: "Fri", tasks: 6 },
  { day: "Sat", tasks: 2 },
  { day: "Sun", tasks: 1 },
];

export function TaskStatisticsChart() {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "#ADB2AD" : "#5F635F";
  const barColor = "#10B981";

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold text-primary mb-4 px-2">
        Task Completion
      </h3>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme === "dark" ? "#2C2E2C" : "#E2E8E2"}
            />
            <XAxis
              dataKey="day"
              stroke={textColor}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke={textColor}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{
                fill: theme === "dark" ? "#2C2E2C" : "#E2E8E2",
                opacity: 0.3,
              }}
              contentStyle={{
                backgroundColor: "rgb(var(--bg-surface))",
                borderColor: "rgb(var(--border-color))",
                borderRadius: "12px",
                boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                color: "rgb(var(--text-primary))",
              }}
            />
            <Bar
              dataKey="tasks"
              fill={barColor}
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
