import React from 'react';
import { render } from '@testing-library/react';
import SignalTimeline from '../components/SignalTimeline';

describe('SignalTimeline', () => {
  const mockSignals = [
    { type: 'buy-pressure', confidence: 0.92, timestamp: '2024-05-25T10:00:00Z' },
    { type: 'volume-spike', confidence: 0.74, timestamp: '2024-05-27T08:45:00Z' },
  ];

  it('matches snapshot', () => {
    const { asFragment } = render(<SignalTimeline signals={mockSignals} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
