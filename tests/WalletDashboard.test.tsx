import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import '@testing-library/jest-dom';
import WalletDashboard from '@/components/WalletDashboard';

describe('WalletDashboard', () => {
  const baseProps = {
    address: 'So1aNaWALLeTADDreSS1234567890',
    totalSignals: 24,
    topSignalType: 'trend-reversal',
    avgConfidence: 0.82,
  };

  it('renders heading and key fields', () => {
    render(<WalletDashboard {...baseProps} />);

    expect(
      screen.getByRole('heading', { name: /wallet overview/i })
    ).toBeInTheDocument();

    // Truncated address should show first 4 and last 4 chars
    expect(screen.getByText('So1a...7890')).toBeInTheDocument();

    // Totals and labels
    expect(screen.getByText(/total signals/i)).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();

    expect(screen.getByText(/top signal/i)).toBeInTheDocument();
    expect(screen.getByText('trend-reversal')).toBeInTheDocument();

    expect(screen.getByText(/avg\. confidence/i)).toBeInTheDocument();
    expect(screen.getByText('82.0%')).toBeInTheDocument(); // 0.82 * 100, toFixed(1)
  });

  it('updates when props change', () => {
    const { rerender } = render(<WalletDashboard {...baseProps} />);

    rerender(
      <WalletDashboard
        {...baseProps}
        totalSignals={99}
        topSignalType="buy-pressure"
        avgConfidence={0.905}
      />
    );

    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('buy-pressure')).toBeInTheDocument();
    expect(screen.getByText('90.5%')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<WalletDashboard {...baseProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
