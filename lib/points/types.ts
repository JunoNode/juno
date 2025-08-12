export type Action =
  | "connect_wallet"
  | "daily_login"
  | "token_query"
  | "portfolio_risk"
  | "share_signal"
  | "discover_signal"
  | "report_false_positive"
  | "invite_complete";

export interface HistoryItem {
  ts: number;               // epoch ms
  action: Action;
  delta: number;            // points awarded (can be 0 or negative if ever needed)
  meta?: Record<string, any>;
}

export interface WalletPoints {
  wallet: string;
  points: number;
  tier: string;
  history: HistoryItem[];
  lastUpdated: number;      // epoch ms
  lastDecay: number;        // epoch ms when decay last applied
  dailyTotals: Record<string, number>; // YYYY-MM-DD -> points from "query-like" actions (for daily caps)
}
