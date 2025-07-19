import React from 'react';
import { render, screen } from '@testing-library/react';
import WalletSignalFeed from '../components/WalletSignalFeed';

describe('WalletSignalFeed', () => {
  const mockSignals = [
    { type: 'buy-pressure', confidence: 0.92, timestamp: '2024-05-25T10:00:00Z' },
    { type: 'trend-reversal', confidence: 0.88, timestamp: '2024-05-26T15:30:00Z' },
    { type: 'volume-spike', confidence: 0.74, timestamp: '2024-05-27T08:45:00Z' },
  ];

  it('renders all signals', () => {
    render(<WalletSignalFeed signals={mockSignals} />);
    mockSignals.forEach(({ type }) => {
      expect(screen.getByText(new RegExp(type.replace('-', ' '), 'i'))).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<WalletSignalFeed signals={mockSignals} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles empty signal list', () => {
    render(<WalletSignalFeed signals={[]} />);
    expect(screen.getByText(/no signals found/i)).toBeInTheDocument();
  });
});
