import { motion } from "framer-motion";
import { Globe, AppWindow } from "lucide-react";

const normalizeSource = (
  rawSource: string,
  timeSpent: string,
  percent: number
) => {
  const isUrl =
    rawSource.includes(".") &&
    !rawSource.includes("\\") &&
    !rawSource.includes("/");

  let name = rawSource;
  let type: "url" | "app" = "app";
  let value = rawSource;

  if (
    rawSource.includes("http") ||
    rawSource.includes("www") ||
    rawSource.includes(".com")
  ) {
    type = "url";
    // Extract domain name (simple version)
    try {
      const urlObj = new URL(
        rawSource.startsWith("http") ? rawSource : `https://${rawSource}`
      );
      value = urlObj.hostname;
      // Capitalize domain as name (youtube.com -> Youtube)
      name = urlObj.hostname.replace("www.", "").split(".")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
    } catch (e) {
      name = rawSource;
    }
  } else {
    // Is App Path (e.g., "C:\\Games\\Steam.exe" or just "Steam")
    type = "app";
    // Extract filename
    const parts = rawSource.split(/[/\\]/);
    const fileName = parts[parts.length - 1];
    name = fileName.split(".")[0]; // Remove .exe
  }

  return {
    id: rawSource,
    name,
    type,
    value,
    time: timeSpent,
    percent,
  };
};

// Mock "Raw Data" coming from Backend Tracker
const rawTrackedData = [
  {
    source: "https://www.youtube.com/watch?v=dQw...",
    time: "45m",
    percent: 60,
  },
  { source: "facebook.com", time: "20m", percent: 25 },
  { source: "C:\\Program Files\\Steam\\steam.exe", time: "10m", percent: 15 },
];

export function DistractionLeaderboard() {
  // Simulate processing
  const data = rawTrackedData.map((item) =>
    normalizeSource(item.source, item.time, item.percent)
  );

  const FallbackIcon = ({ type }: { type: "url" | "app" }) => {
    return type === "url" ? (
      <Globe size={20} className="text-secondary" />
    ) : (
      <AppWindow size={20} className="text-secondary" />
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary">Auth. Distractions</h3>
        <p className="text-xs text-secondary">Where your break time goes</p>
      </div>

      <div className="flex-1 w-full flex flex-col gap-3 overflow-y-auto">
        {data.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center relative shrink-0">
              {item.type === "url" ? (
                <>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${item.value}&sz=64`}
                    alt={item.name}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const sibling = e.currentTarget.nextElementSibling;
                      if (sibling)
                        (sibling as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div
                    style={{
                      display: "none",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FallbackIcon type={item.type} />
                  </div>
                </>
              ) : (
                <FallbackIcon type={item.type} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-primary truncate">
                  {item.name}
                </span>
                <span className="text-xs text-secondary whitespace-nowrap ml-2">
                  {item.time}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-secondary/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-secondary">Total Break Time</span>
            <span className="font-bold text-primary">1h 15m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
