import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletDashboard from './components/WalletDashboard';
import WalletTokenTable from './components/WalletTokenTable';
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <>
      <WalletDashboard {...dummyWallet} />
      <WalletTokenTable tokens={mockTokens} />
    </>
  </React.StrictMode>
);
