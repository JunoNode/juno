import React from 'react';

const signals = [
  { type: 'buy-pressure', label: 'Buy Pressure', icon: '🟢' },
  { type: 'trend-reversal', label: 'Trend Reversal', icon: '🔄' },
  { type: 'volume-spike', label: 'Volume Spike', icon: '📈' },
];

const SignalLegend: React.FC = () => {
  return (
    <div className="text-xs text-gray-300 mt-4 p-4 bg-glass rounded-xl max-w-md">
      <p className="mb-2 font-semibold text-white">Signal Legend:</p>
      <ul className="space-y-1">
        {signals.map(({ icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <span>{icon}</span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignalLegend;
