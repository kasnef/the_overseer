import { CycleAnalysisChart } from "./CycleAnalysisChart";
import { RecallEfficiencyChart } from "./RecallEfficiencyChart";
import { DistractionLeaderboard } from "./DistractionLeaderboard";
import { MomentumChart } from "./MomentumChart";

export function Tracking() {
  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">
            Performance Analytics
          </h1>
          <p className="text-secondary">
            Track your Work-Reward cycles and focus efficiency.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Cycle Analysis */}
          <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border h-80 flex flex-col">
            <CycleAnalysisChart />
          </section>

          {/* Recall Efficiency */}
          <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border h-80 flex flex-col">
            <RecallEfficiencyChart />
          </section>

          {/* Distraction Stats */}
          <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border h-80 flex flex-col">
            <DistractionLeaderboard />
          </section>

          {/* Momentum */}
          <section className="bg-surface rounded-3xl p-6 shadow-soft border border-border h-80 flex flex-col">
            <MomentumChart />
          </section>
        </div>
      </div>
    </div>
  );
}
