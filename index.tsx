import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletDashboard from './components/WalletDashboard';
import WalletTokenTable from './components/WalletTokenTable';
import TokenValueBar from './components/TokenValueBar';
import WalletSignalFeed from './components/WalletSignalFeed';
import WalletHeader from './components/WalletHeader';
import ErrorBoundary from './components/ErrorBoundary';
import SignalLegend from './components/SignalLegend'; // ✅ Added
import './index.css';

const dummyWallet = {
  address: "9gzLP8xR9dRka...vU7W",
  totalSignals: 24,
  topSignalType: "trend-reversal",
  avgConfidence: 0.82,
};

const mockTokens = [
  { name: 'Solana', symbol: 'SOL', amount: 12.3, usdValue: 242.15 },
  { name: 'Bonk', symbol: 'BONK', amount: 98219323, usdValue: 118.56 },
  { name: 'USDC', symbol: 'USDC', amount: 89.5, usdValue: 89.5 },
];

const mockSignals = [
  { type: 'buy-pressure', confidence: 0.92, timestamp: '2024-05-25T10:00:00Z' },
  { type: 'trend-reversal', confidence: 0.88, timestamp: '2024-05-26T15:30:00Z' },
  { type: 'volume-spike', confidence: 0.74, timestamp: '2024-05-27T08:45:00Z' },
];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <>
        <WalletHeader
          address={dummyWallet.address}
          totalSignals={dummyWallet.totalSignals}
          onRefresh={() => console.log('🔄 Refresh triggered')}
        />
        <WalletDashboard {...dummyWallet} />
        <WalletTokenTable tokens={mockTokens} />
        <TokenValueBar tokens={mockTokens} />
        <WalletSignalFeed signals={mockSignals} />
        <SignalLegend /> {/* ✅ Added here */}
      </>
    </ErrorBoundary>
  </React.StrictMode>
);
