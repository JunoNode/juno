import React from "react";
import type { TokenAnalysis } from "@/utils/tokenAnalysis";

type Props = {
  analysis: TokenAnalysis | null | undefined;
  compact?: boolean;         // smaller density if true
  className?: string;
};

function formatUSD(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(n < 1 ? 4 : 2)}`;
}

function formatNum(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  return n.toFixed(n < 1 ? 4 : 2);
}

function RiskBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-red-500/15 text-red-300 border border-red-400/20 px-2 py-0.5 text-[11px] font-medium">
      {text}
    </span>
  );
}

export default function TokenAnalysisCard({ analysis, compact = false, className = "" }: Props) {
  // Empty / loading state
  if (!analysis) {
    return (
      <div className={`rounded-2xl bg-glass backdrop-blur-md border border-white/10 p-4 text-white ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-40 bg-white/10 rounded" />
          <div className="h-4 w-28 bg-white/10 rounded" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const { name, symbol, contractAddress, priceUsd, liquidityUsd, volume24hUsd, fdvUsd, pairUrl, riskFlags } = analysis;

  return (
    <div
      className={[
        "rounded-2xl bg-glass backdrop-blur-md border border-white/10 text-white shadow-soft",
        compact ? "p-4" : "p-6",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Fallback avatar with initials */}
          <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-600/25 ring-1 ring-emerald-300/20 flex items-center justify-center text-sm font-semibold">
            {(symbol || name || "T").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-base md:text-lg font-semibold leading-tight">
              {name || symbol || "Unknown Token"}
            </div>
            <div className="text-xs text-white/60 break-all">
              {symbol ? `${symbol} • ` : ""}
              {contractAddress}
            </div>
          </div>
        </div>

        {pairUrl ? (
          <a
            href={pairUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs rounded-lg px-3 py-1 bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
            title="Open on DexScreener"
          >
            View Pair
          </a>
        ) : (
          <span className="text-xs text-white/50">DEX-listed</span>
        )}
      </div>

      {/* Metrics */}
      <div className={`grid ${compact ? "grid-cols-2 gap-3 pt-3" : "grid-cols-4 gap-4 pt-5"}`}>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="text-xs text-white/60">Price</div>
          <div className="text-base md:text-lg font-semibold">{priceUsd == null ? "—" : formatUSD(priceUsd)}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="text-xs text-white/60">Liquidity</div>
          <div className="text-base md:text-lg font-semibold">{formatUSD(liquidityUsd)}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="text-xs text-white/60">Volume 24h</div>
          <div className="text-base md:text-lg font-semibold">{formatUSD(volume24hUsd)}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <div className="text-xs text-white/60">FDV</div>
          <div className="text-base md:text-lg font-semibold">{formatUSD(fdvUsd)}</div>
        </div>
      </div>

      {/* Risk flags */}
      <div className="pt-4">
        {riskFlags && riskFlags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {riskFlags.map((f) => (
              <RiskBadge key={f} text={f} />
            ))}
          </div>
        ) : (
          <div className="text-xs text-emerald-300/80">No immediate risk signals detected.</div>
        )}
      </div>
    </div>
  );
}
