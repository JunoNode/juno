import React from 'react';
import { render } from '@testing-library/react';
import WalletDashboard from '../components/WalletDashboard';

describe('WalletDashboard', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <WalletDashboard
        address="9gzLP8xR9dRka...vU7W"
        totalSignals={24}
        topSignalType="trend-reversal"
        avgConfidence={0.82}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
