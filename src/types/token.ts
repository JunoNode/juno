export type Chain = 'solana' | 'ethereum' 
export type Network = 'mainnet' | 'testnet' | 'devnet';

export enum TokenFlag {
  Suspicious = 'SUSPICIOUS',
  Illiquid = 'ILLIQUID',
  Deprecated = 'DEPRECATED',
  Blacklisted = 'BLACKLISTED',
  HoneypotRisk = 'HONEY_POT_RISK',
}

export interface Token {
  readonly contractAddress: string;
  readonly chain: Chain;
  readonly network?: Network;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  balance: number;
  rawAmount?: string;
  priceUsd?: number;
  valueUsd?: number;
  quote?: number;
  logoUrl?: string | null;
  isNative?: boolean;
  flags?: ReadonlyArray<TokenFlag>;
  updatedAt?: string;
}

export function isToken(input: unknown): input is Token {
  if (!input || typeof input !== 'object') return false;
  const t = input as Partial<Token>;
  return (
    typeof t.contractAddress === 'string' &&
    typeof t.name === 'string' &&
    typeof t.symbol === 'string' &&
    typeof t.decimals === 'number' &&
    typeof t.balance === 'number' &&
    typeof t.chain === 'string'
  );
}

export function normalizeToken<T extends Partial<Token>>(t: T): Token {
  const chain: Chain = (t.chain as Chain) ?? 'solana';
  const decimals = t.decimals ?? 0;
  const balance = t.balance ?? 0;

  const price = t.priceUsd;
  const existingValue = t.valueUsd ?? t.quote;
  const computedValue =
    typeof price === 'number' ? safeMul(balance, price) : existingValue;
  const valueUsd =
    typeof computedValue === 'number' ? roundUsd(computedValue) : undefined;

  return {
    contractAddress: mustString(t.contractAddress, 'contractAddress'),
    chain,
    network: t.network,
    name: mustString(t.name, 'name'),
    symbol: mustString(t.symbol, 'symbol'),
    decimals,
    balance,
    rawAmount: t.rawAmount,
    priceUsd: typeof price === 'number' ? price : undefined,
    valueUsd,
    quote: valueUsd,
    logoUrl: t.logoUrl ?? null,
    isNative: !!t.isNative,
    flags: (Array.isArray(t.flags) ? t.flags : undefined) as
      | ReadonlyArray<TokenFlag>
      | undefined,
    updatedAt: t.updatedAt ?? new Date().toISOString(),
  };
}

export function computeValueUsd(balance: number, priceUsd?: number): number | undefined {
  if (typeof priceUsd !== 'number') return undefined;
  return roundUsd(safeMul(balance, priceUsd));
}

function mustString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Token.${field} must be a non-empty string`);
  }
  return value;
}

function safeMul(a: number, b: number): number {
  const x = a * b;
  return Number.isFinite(x) ? x : 0;
}

function roundUsd(v: number): number {
  return Math.round(v * 100) / 100;
}
