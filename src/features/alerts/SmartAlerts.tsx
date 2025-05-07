import { useEffect, useState } from "react";

interface Alert {
  type: "risk" | "wallet" | "launch";
  message: string;
  severity: "low" | "medium" | "high";
}

const sampleAlerts: Alert[] = [
  {
    type: "risk",
    message: "Token $FLIP is flagged as mintable.",
    severity: "high",
  },
  {
    type: "wallet",
    message: "Watched wallet just moved 10,000 SOL to Raydium.",
    severity: "medium",
  },
  {
    type: "launch",
    message: "New token detected with high liquidity: $JGL",
    severity: "low",
  },
];

export default function SmartAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Placeholder: Simulate alert loading
  useEffect(() => {
    const timeout = setTimeout(() => setAlerts(sampleAlerts), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const getSeverityColor = (level: Alert["severity"]) => {
    switch (level) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-3">
      <h3 className="text-xl font-semibold mb-2">Juno's Secret Alerts</h3>
      {alerts.length === 0 ? (
        <p className="opacity-60">No alerts triggered… yet.</p>
      ) : (
        alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl flex items-start gap-3 shadow-md bg-glass backdrop-blur-sm border-l-4 ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div className="flex-1 text-sm">{alert.message}</div>
            <span className="text-xs uppercase opacity-50">{alert.type}</span>
          </div>
        ))
      )}
    </div>
  );
}
