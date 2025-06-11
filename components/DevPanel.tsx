import React from 'react';

interface Props {
  tokensCount: number;
  signalsCount: number;
  filter: string;
}

const DevPanel: React.FC<Props> = ({ tokensCount, signalsCount, filter }) => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-glass p-4 rounded-xl text-xs text-white shadow-md z-50">
      <p>🧪 <strong>DevPanel</strong></p>
      <p>Tokens: {tokensCount}</p>
      <p>Signals: {signalsCount}</p>
      <p>Filter: {filter}</p>
    </div>
  );
};

export default DevPanel;
