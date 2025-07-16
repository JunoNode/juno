export const getSignalIcon = (type: string): string => {
  switch (type) {
    case 'buy-pressure': return '📈';
    case 'sell-pressure': return '📉';
    case 'volume-spike': return // lib/getSignalIcon.ts

type SignalType =
  | 'buy-pressure'
  | 'sell-pressure'
  | 'volume-spike'
  | 'trend-reversal'
  | string;

export const getSignalIcon = (type: SignalType): string => {
  const icons: Record<string, string> = {
    'buy-pressure': '📈',
    'sell-pressure': '📉',
    'volume-spike': '💥',
    'trend-reversal': '🔄',
  };

  return icons[type] || '⚡';
};
'💥';
    case 'trend-reversal': return '🔄';
    default: return '⚡';
  }
};
