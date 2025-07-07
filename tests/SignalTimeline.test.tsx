import React from 'react';
import { render, screen } from '@testing-library/react';
import SignalTimeline from '../components/SignalTimeline';

const mockSignals = [
  { type: 'buy-pressure', confidence: 0.92, timestamp: '2024-06-01T12:00:00Z' },
  { type: 'volume-spike', confidence: 0.74, timestamp: '2024-06-02T09:30:00Z' },
];

describe('SignalTimeline', () => {
  it('renders all signals in order', () => {
    render(<SignalTimeline signals={mockSignals} />);
    expect(screen.getByText(/buy-pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/volume-spike/i)).toBeInTheDocument();
  });

  it('displays formatted confidence', () => {
    render(<SignalTimeline signals={mockSignals} />);
    expect(screen.getByText(/92.0%/)).toBeInTheDocument();
    expect(screen.getByText(/74.0%/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<SignalTimeline signals={mockSignals} />);
    expect(container).toMatchSnapshot();
  });
});

