import { AlertSeverity } from "@/lib/alerts";

const HIGH_RISK_KEYS = new Set([
  "is_honeypot",
  "can_take_back_ownership",
  "is_blacklisted",
]);

const FLAG_LABELS: Record<string, string> = {
  is_open_source: "Not Open Source",
  is_proxy: "Proxy Contract",
  is_mintable: "Mintable",
  is_honeypot: "Honeypot Risk",
  can_take_back_ownership: "Ownership Risk",
  is_blacklisted: "Blacklisted",
  trading_disabled: "Trading Paused",
};

export interface ParsedRisk {
  key: string;
  label: string;
  severity: AlertSeverity;
}

export function parseRiskFlags(flags: Record<string, string | number | boolean>): ParsedRisk[] {
  const parsed: ParsedRisk[] = [];

  for (const [key, rawValue] of Object.entries(flags)) {
    const isActive =
      rawValue === "1" ||
      rawValue === 1 ||
      rawValue === true ||
      rawValue === "true";

    if (!isActive) continue;

    const label = FLAG_LABELS[key] ?? key.replace(/_/g, " ");
    const severity: AlertSeverity = HIGH_RISK_KEYS.has(key) ? "high" : "medium";

    parsed.push({ key, label, severity });
  }

  return parsed;
}
