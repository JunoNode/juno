import React from "react";

export function PointsBadge({ points, tier }: { points: number; tier: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-glass px-3 py-1 border border-glass text-white">
      <span className="text-xs uppercase tracking-wide opacity-80">{tier}</span>
      <span className="text-sm font-semibold">{points.toLocaleString()} pts</span>
    </div>
  );
}
