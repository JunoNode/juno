export const DASHBOARD_SECTIONS = [
  { key: 'walletHeader', label: 'Wallet Overview' },
  { key: 'walletStats', label: 'Stats' },
  { key: 'walletTokens', label: 'Token Holdings' },
  { key: 'tokenValue', label: 'Token Value' },
  { key: 'signalFeed', label: 'Signal Feed' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'legend', label: 'Legend' },
];

// ↓ Add these defaults (used by hooks/components below)
export const ROUTING_DEFAULTS = {
  slippageBps: 50,      // 0.5%
  debounceMs: 180,      // quote debounce for inputs
  allowMultiHop: true,  // routing engine may multi-hop by default
} as const;

export const IMPACT_THRESHOLDS = {
  low: 0.02,   // 2%
  high: 0.05,  // 5%
} as const;
