import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletDashboard from './components/WalletDashboard';
import './index.css';


const dummyWallet = {
  address: "9gzLP8xR9dRka...vU7W",
  totalSignals: 24,
  topSignalType: "trend-reversal",
  avgConfidence: 0.82,
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WalletDashboard {...dummyWallet} />
  </React.StrictMode>
);

