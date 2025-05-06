import axios from "axios";

const COVALENT_API = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
const GOPLUS_API = process.env.NEXT_PUBLIC_GOPLUS_API_KEY;
const OPENAI_API = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// --- Covalent: Get token balances by wallet
export async function getTokenBalances(address: string, chainId = "solana-mainnet") {
  const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${COVALENT_API}`;
  const { data } = await axios.get(url);
  return data;
}

// --- GoPlus: Check contract risk
export async function getTokenSecurity(contract: string, chain = "1") {
  const url = `https://api.gopluslabs.io/api/v1/token_security/${chain}?contract_addresses=${contract}`;
  const { data } = await axios.get(url);
  return data;
}

// --- GPT-4: Chat with Juno
export async function askJuno(prompt: string) {
  const { data } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data.choices[0].message.content;
}
