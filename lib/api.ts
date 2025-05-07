import axios from "axios";

const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const GOPLUS_API_KEY = process.env.NEXT_PUBLIC_GOPLUS_API_KEY;
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// 1. Get token balances for a wallet (Solana via Covalent)
export async function getTokenBalances(address: string) {
  const url = `https://api.covalenthq.com/v1/solana/mainnet-beta/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
  const res = await axios.get(url);
  return res.data.data;
}

// 2. Get token risk flags from GoPlus (EVM only for now)
export async function getTokenSecurity(contractAddress: string) {
  const url = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contractAddress}`;
  const res = await axios.get(url, {
    headers: { "User-Agent": "JunoBot", "Authorization": GOPLUS_API_KEY },
  });
  return res.data.result;
}

// 3. Send prompt to GPT-4
export async function askJuno(prompt: string) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.choices[0].message.content;
}

// 4. Placeholder: get recent Solana wallet txs (for Watchtower)
export async function getWalletTxs(address: string) {
  // Replace with Solana RPC, Helius, or SolanaFM call
  return [
    {
      txHash: "0x123",
      timestamp: "2 min ago",
      tokenSymbol: "SOL",
      amount: 4.25,
      direction: "in",
      valueUsd: 690,
    },
  ];
}
