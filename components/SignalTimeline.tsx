import React from 'react';

interface SignalEvent {
  timestamp: string;
  type: string;
  confidence: number;
}

interface Props {
  signals: SignalEvent[];
}

const getColor = (confidence: number) => {
  if (confidence >= 0.85) return 'bg-green-500';
  if (confidence >= 0.7) return 'bg-yellow-400';
  return 'bg-red-500';
};

const SignalTimeline: React.FC<Props> = ({ signals }) => {
  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Signal Timeline</h3>
      <div className="relative border-l-2 border-glass pl-4">
        {signals.map((signal, index) => (
          <div key={index} className="mb-6 relative">
            <div
              className={`absolute left-[-10px] top-1.5 w-3 h-3 rounded-full shadow-jungle ${getColor(signal.confidence)}`}
            ></div>
            <p className="text-sm text-white mb-1 font-medium">
              {new Date(signal.timestamp).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">
              {signal.type} — Confidence: {(signal.confidence * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalTimeline;
