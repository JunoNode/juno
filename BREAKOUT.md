# Solana Breakout Hackathon Submission: Juno

## Project Overview
**Juno** is an AI-native crypto assistant built for the Solana ecosystem. Through a calm, jungle-themed interface, it helps users:

- Connect and monitor their Phantom wallet
- Track token balances, prices, and risk (Treasure Map)
- Monitor high-value wallet activity (Watchtower)
- Ask portfolio-related questions via GPT-4 (Juno’s Grove)
- Detect contract risk with GoPlus integration
- Receive smart alerts for stealth launches, whale moves, and suspicious behavior

---

## Built During the Hackathon

This submission includes:

- Frontend setup with Next.js, Tailwind CSS, Framer Motion
- Solana-native wallet integration (Phantom)
- Real-time portfolio tracking via Covalent API
- GPT-4 powered AI chat interface with Solana-aware prompts
- Initial implementation of alert system (GoPlus risk checks)
- UI mockups and interaction layout (map, tower, grove)

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **Wallets**: Phantom (Solana), MetaMask (EVM optional)
- **APIs**: Covalent, GoPlus, OpenAI (GPT-4)
- **Deployment**: Vercel + GitHub Actions
- **Language**: TypeScript

---

## How to Run Locally

```bash
npm install
npm run dev
```

> Configure `.env` file with API keys for Covalent, GoPlus, and OpenAI.

---

## Post-Hackathon Plans

- Add memory + session context to AI
- Connect alert engine to Watchtower events
- Improve Solana tx indexing (Helius/SolanaFM)
- Expand UX for mobile, theme modes, and depth

---

## Note to Judges

The design and AI logic are intentionally calm and minimal — Juno is meant to feel more like a space than a tool. This submission represents our functional MVP, with deep system work behind a focused UI. More is coming soon.

Thank you for reviewing Juno.
