import React from 'react';

interface Props {
  selected: string;
  onChange: (type: string) => void;
}

const signalTypes = ['all', 'buy-pressure', 'trend-reversal', 'volume-spike'];

const SignalFilter: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="mb-4 flex gap-2 text-sm">
      {signalTypes.map(type => (
        <button
          key={type}
          className={`px-3 py-1 rounded ${
            selected === type ? 'bg-glow text-black' : 'bg-glass text-white'
          }`}
          onClick={() => onChange(type)}
        >
          {type.replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};

export default SignalFilter;