import React from 'react';

interface Signal {
  type: string;
  confidence: number;
  timestamp: string;
}

const getSignalIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'buy-pressure': '📈',
    'sell-pressure': '📉',
    'volume-spike': '💥',
    'trend-reversal': '🔄',
  };
  return icons[type] || '⚡';
};

interface Props {
  signals: Signal[];
}

const WalletSignalFeed: React.FC<Props> = ({ signals }) => {
  if (!signals.length) {
    return (
      <div className="mt-6 max-w-xl mx-auto text-center text-gray-400 text-sm">
        No recent signals detected.
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Recent Signals</h3>
      <ul
        className="divide-y divide-glass border border-glass rounded-xl overflow-hidden bg-glass"
        aria-label="Recent wallet signals"
      >
        {signals.map((signal, i) => (
          <li
            key={`${signal.type}-${i}`}
            className="p-4 text-sm text-white flex justify-between items-center hover:bg-glass/50 transition"
          >
            <div>
              <span className="mr-2">{getSignalIcon(signal.type)}</span>
              <span className="font-medium capitalize">{signal.type}</span>
              <span className="text-gray-400 ml-2">
                {new Date(signal.timestamp).toLocaleString()}
              </span>
            </div>
            <div
              className={`font-semibold ${
                signal.confidence > 0.8 ? 'text-green-400' : 'text-yellow-400'
              }`}
            >
              {(signal.confidence * 100).toFixed(1)}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletSignalFeed;
