import React from 'react';

interface Signal {
  type: string;
  confidence: number;
  timestamp: string;
}

const getSignalIcon = (type: string) => {
  switch (type) {
    case 'buy-pressure': return '📈';
    case 'sell-pressure': return '📉';
    case 'volume-spike': return '💥';
    case 'trend-reversal': return '🔄';
    default: return '⚡';
  }
};

interface Props {
  signals: Signal[];
}

const WalletSignalFeed: React.FC<Props> = ({ signals }) => {
  return (
    <div className="mt-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">Recent Signals</h3>
      <ul className="divide-y divide-glass border border-glass rounded-xl overflow-hidden bg-glass">
        {signals.map((signal, i) => (
          <li key={i} className="p-4 text-sm text-white flex justify-between items-center">
            <div>
              <span className="mr-2">{getSignalIcon(signal.type)}</span>
              <span className="font-medium">{signal.type}</span>
              <span className="text-gray-400 ml-2">{new Date(signal.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-green-400 font-semibold">
              {(signal.confidence * 100).toFixed(1)}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletSignalFeed;
