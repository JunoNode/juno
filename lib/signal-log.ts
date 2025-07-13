type SignalLogEntry = {
  source: string;
  type: string;
  glyph: string;
  hash: string;
  confidence: number;
  timestamp: string;
};

const signalLog: SignalLogEntry[] = [];

export const logSignal = (signal: SignalLogEntry) => {
  console.log(
    `[juno:signal] → elevated risk ${signal.type} (score: ${signal.confidence.toFixed(
      2
    )}) – glyph emitted`
  );

  signalLog.push(signal);
};

export const getSignalLog = () => [...signalLog];

export const clearSignalLog = () => {
  signalLog.length = 0;
};
