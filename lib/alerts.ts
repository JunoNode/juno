export type AlertType = "risk" | "wallet" | "launch";
export type AlertSeverity = "low" | "medium" | "high";

export interface SmartAlert {
  type: AlertType;
  message: string;
  severity: AlertSeverity;
}

// High-risk GoPlus flags to elevate severity
const HIGH_RISK_FLAGS = new Set([
  "is_honeypot",
  "can_take_back_ownership",
  "is_blacklisted",
]);

/**
 * Transforms token risk flags into structured SmartAlerts.
 */
export function parseRiskFlags(
  tokenSymbol: string,
  flags: Record<string, string>
): SmartAlert[] {
  return Object.entries(flags)
    .filter(([, value]) => value === "1")
    .map(([key]) => {
      const readable = key.replace(/_/g, " ");
      const severity: AlertSeverity = HIGH_RISK_FLAGS.has(key)
        ? "high"
        : "medium";

      return {
        type: "risk",
        severity,
        message: `${tokenSymbol} flagged: ${readable}`,
      };
    });
}

/**
 * Constructs a wallet movement alert (inbound or outbound).
 */
export function createWalletAlert(
  address: string,
  token: string,
  direction: "in" | "out",
  amount: number
): SmartAlert {
  const short = `${address.slice(0, 5)}...`;
  return {
    type: "wallet",
    severity: "medium",
    message: `Watched wallet ${short} moved ${amount} ${token} ${direction === "in" ? "into" : "out of"} a tracked wallet.`,
  };
}

/**
 * Basic launch signal for new tokens with volume.
 */
export function createLaunchAlert(token: string): SmartAlert {
  return {
    type: "launch",
    severity: "low",
    message: `New token launched with initial volume: ${token}`,
  };
}
