const TokenDistributionBar = ({ tokens }: { tokens: Token[] }) => {
  const total = tokens.reduce((sum, t) => sum + t.usdValue, 0);
  return (
    <div className="flex h-4 rounded overflow-hidden bg-glass mt-4">
      {tokens.map((t, i) => {
        const width = (t.usdValue / total) * 100;
        return (
          <div
            key={i}
            style={{ width: `${width}%` }}
            className="bg-glow h-full"
            title={`${t.symbol}: ${width.toFixed(1)}%`}
          />
        );
      })}
    </div>
  );
};
