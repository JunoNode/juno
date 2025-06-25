import React from 'react';

const SignalLegend: React.FC = () => {
  return (
    <div className="mt-6 max-w-xl mx-auto px-4">
      <h3 className="text-lg font-semibold text-gray-100 mb-2">Signal Legend</h3>

      <div className="flex flex-col gap-3 text-sm text-gray-300">
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="font-medium">Buy Pressure</span> — strong upward signal
        </div>
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2" />
          <span className="font-medium">Trend Reversal</span> — pattern change expected
        </div>
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span className="font-medium">Volume Spike</span> — unusual trading activity
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-md font-semibold text-gray-100 mb-1">Confidence Scale</h4>
        <div className="flex gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full" /> 85%+
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-yellow-400 rounded-full" /> 70–84%
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full" /> Below 70%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalLegend;