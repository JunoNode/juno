import { AlertSeverity } from "@/lib/alerts";

const HIGH_RISK_KEYS = ["is_honeypot", "can_take_back_ownership", "is_blacklisted"];
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

/**
 * Parses GoPlus flags into readable risk objects
 */
export function parseRiskFlags(flags: Record<string, string>): ParsedRisk[] {
  const parsed: ParsedRisk[] = [];

  Object.entries(flags).forEach(([key, value]) => {
    if (value !== "1") return;

    const label = FLAG_LABELS[key] || key.replace(/_/g, " ");
    const severity: AlertSeverity = HIGH_RISK_KEYS.includes(key) ? "high" : "medium";

    parsed.push({ key, label, severity });
  });

  return parsed;
}
