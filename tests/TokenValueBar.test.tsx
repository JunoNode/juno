import React from 'react';
import { render } from '@testing-library/react';
import TokenValueBar from '../components/TokenValueBar';
import { TokenHolding } from '../types/token';

describe('TokenValueBar', () => {
  const mockTokens: TokenHolding[] = [
    { name: 'Solana', symbol: 'SOL', amount: 10, usdValue: 100 },
    { name: 'Bonk', symbol: 'BONK', amount: 50000, usdValue: 50 },
  ];

  it('renders the correct number of segments', () => {
    const { container } = render(<TokenValueBar tokens={mockTokens} />);
    const segments = container.querySelectorAll('div[style*="width"]');
    expect(segments.length).toBe(2);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<TokenValueBar tokens={mockTokens} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
