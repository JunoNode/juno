import React from 'react';

const statusColors: Record<string, string> = {
  'buy-pressure': 'bg-green-600',
  'trend-reversal': 'bg-yellow-500',
  'volume-spike': 'bg-blue-500',
};

interface Props {
  type: string;
}

const StatusPill: React.FC<Props> = ({ type }) => {
  const label = type.replace('-', ' ');
  return (
    <span className={`text-xs font-medium text-white px-2 py-1 rounded-full ${statusColors[type] || 'bg-gray-500'}`}>
      {label}
    </span>
  );
};

export default StatusPill;
