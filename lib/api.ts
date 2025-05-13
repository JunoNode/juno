import axios from "axios";
import { buildPrompt } from "@/lib/gpt/promptBuilder";
import { MemoryEntry } from "@/lib/memory";

const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const GOPLUS_API_KEY = process.env.NEXT_PUBLIC_GOPLUS_API_KEY;
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Get wallet token balances (Solana via Covalent)
export async function getTokenBalances(address: string) {
  const url = `https://api.covalenthq.com/v1/solana/mainnet-beta/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
  const res = await axios.get(url);
  return res.data.data;
}

// Get token contract risk data from GoPlus
export async function getTokenSecurity(contractAddress: string) {
  const url = `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${contractAddress}`;
  const res = await axios.get(url, {
    headers: {
      "User-Agent": "JunoBot",
      Authorization: GOPLUS_API_KEY,
    },
  });
  return res.data.result;
}

// Ask GPT-4 via OpenAI with Juno's memory and wallet context
export async function askJuno(
  prompt: string,
  memory: MemoryEntry[],
  walletSummary?: string
) {
  const fullMessages = buildPrompt(memory, prompt, walletSummary);

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: fullMessages,
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

// Mocked wallet transactions (replace with real source soon)
export async function getWalletTxs(address: string) {
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
