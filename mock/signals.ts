import { Signal } from "@/types";

export const mockSignals: Signal[] = [
  {
    type: "buy-pressure",
    confidence: 0.92,
    timestamp: "2025-07-01T14:32:00Z",
  },
  {
    type: "trend-reversal",
    confidence: 0.84,
    timestamp: "2025-07-02T10:17:00Z",
  },
  {
    type: "volume-spike",
    confidence: 0.76,
    timestamp: "2025-07-03T08:45:00Z",
  },
];
