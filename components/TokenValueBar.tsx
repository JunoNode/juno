import React from "react";
import { IMPACT_THRESHOLDS } from "@/constants/ui";

type Token = {
  symbol: string;
  usdValue: number;
  priceImpactPct?: number;
};

export default function TokenValueBar({ tokens }: { tokens: Token[] }) {
  const total = tokens.reduce((sum, t) => sum + t.usdValue, 0);

  return (
    <div className="mt-4">
      <div className="flex h-4 rounded overflow-hidden bg-glass">
        {tokens.map((t, i) => {
          const share = total ? (t.usdValue / total) * 100 : 0;
          return (
            <div
              key={i}
              style={{ width: `${share}%` }}
              className="bg-glow h-full"
              title={`${t.symbol}: ${share.toFixed(1)}%`}
            />
          );
        })}
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
        {tokens.slice(0, 6).map((t, i) => {
          const impact = t.priceImpactPct ?? 0;
          const impactClass =
            impact >= IMPACT_THRESHOLDS.high
              ? "bg-red-600"
              : impact >= IMPACT_THRESHOLDS.low
              ? "bg-yellow-600"
              : "bg-emerald-600";

          return (
            <span key={i} className="px-2 py-1 rounded bg-glass border border-glass">
              {t.symbol}
              {t.priceImpactPct !== undefined && (
                <span className={`ml-2 px-1.5 py-0.5 rounded ${impactClass}`}>
                  impact {(impact * 100).toFixed(1)}%
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
