export const getSignalIcon = (type: string): string => {
  switch (type) {
    case 'buy-pressure': return '📈';
    case 'sell-pressure': return '📉';
    case 'volume-spike': return '💥';
    case 'trend-reversal': return '🔄';
    default: return '⚡';
  }
};
