import type { Action } from "./types";

export const ACTION_POINTS: Record<Action, number> = {
  connect_wallet: 50,
  daily_login: 10,
  token_query: 5,
  portfolio_risk: 5,
  share_signal: 15,
  discover_signal: 20,
  report_false_positive: 10,
  invite_complete: 100,
};

// Actions that count toward the daily cap (to avoid spam farming)
export const DAILY_CAPPED_ACTIONS: Action[] = ["token_query", "portfolio_risk"];

// Daily cap for capped actions (sum of their points per day)
export const DAILY_CAP_POINTS = 200;

// Quality bonus (+2) can be optionally added by server if engagement was meaningful
export const QUALITY_BONUS = 2;

// Tier thresholds
export const TIERS = [
  { name: "Watcher", min: 0 },
  { name: "Signal Scout", min: 1_000 },
  { name: "Analyst", min: 5_000 },
  { name: "Juno Operative", min: 10_000 },
];

// Decay after 14 days inactivity: -5% per week until next activity/fetch
export const DECAY_INACTIVITY_DAYS = 14;
export const DECAY_RATE_PER_WEEK = 0.05;
