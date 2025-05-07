export type AlertType = "risk" | "wallet" | "launch";
export type AlertSeverity = "low" | "medium" | "high";

export interface SmartAlert {
  type: AlertType;
  message: string;
  severity: AlertSeverity;
}

// List of known high-risk GoPlus flags
const HIGH_RISK_FLAGS = ["is_honeypot", "can_take_back_ownership", "is_blacklisted"];

// Map GoPlus flags into alert messages
export function parseRiskFlags(tokenSymbol: string, flags: Record<string, string>): SmartAlert[] {
  const alerts: SmartAlert[] = [];

  Object.entries(flags).forEach(([key, value]) => {
    if (value === "1") {
      const readable = key.replace(/_/g, " ");
      const severity: AlertSeverity = HIGH_RISK_FLAGS.includes(key) ? "high" : "medium";
      alerts.push({
        type: "risk",
        message: `${tokenSymbol} flagged: ${readable}`,
        severity,
      });
    }
  });

  return alerts;
}

// Sample wallet activity alert
export function createWalletAlert(address: string, token: string, direction: "in" | "out", amount: number): SmartAlert {
  return {
    type: "wallet",
    severity: "medium",
    message: `Watched wallet ${address.slice(0, 5)}... moved ${amount} ${token} ${direction === "in" ? "into" : "out of"} a tracked wallet.`,
  };
}

// Sample stealth launch alert
export function createLaunchAlert(token: string): SmartAlert {
  return {
    type: "launch",
    severity: "low",
    message: `New token launched with initial volume: ${token}`,
  };
}
