import React from 'react';
import { render } from '@testing-library/react';
import ConfidenceBadge from '../components/ConfidenceBadge';

describe('ConfidenceBadge', () => {
  it('renders green for high confidence', () => {
    const { getByText } = render(<ConfidenceBadge value={0.9} />);
    expect(getByText('90%')).toBeInTheDocument();
  });

  it('renders yellow for medium confidence', () => {
    const { getByText } = render(<ConfidenceBadge value={0.75} />);
    expect(getByText('75%')).toBeInTheDocument();
  });

  it('renders red for low confidence', () => {
    const { getByText } = render(<ConfidenceBadge value={0.65} />);
    expect(getByText('65%')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ConfidenceBadge value={0.82} />);
    expect(asFragment()).toMatchSnapshot();
  });
});