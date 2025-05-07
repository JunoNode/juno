# Juno Architecture Overview

Juno is a jungle-themed AI-powered crypto assistant built with Next.js, GPT-4, and real-time Web3 integrations. This document outlines the core technical architecture and flow of the application.

---

## 1. High-Level System Flow

```
[Wallet Connect] → [Data Fetching Layer] → [Dashboard UI + AI Layer] → [User Interaction + Alerts]
```

- Wallets connect via MetaMask or Phantom
- Data fetched from Covalent, GoPlus, and optional APIs
- UI built with modular features: Portfolio ("Treasure Map"), Alerts, AI ("Juno's Grove")
- GPT-4 powers the AI interaction, optionally injected with wallet context

---

## 2. Core Technologies

- **Frontend**: Next.js (TypeScript) + Tailwind CSS + Framer Motion
- **Backend/API Layer**: Serverless (via Vercel or Express/FastAPI API routes)
- **Wallet Integration**: ethers.js (EVM), Phantom (Solana)
- **AI Integration**: OpenAI GPT-4 API
- **Data Providers**: Covalent (token data), GoPlus (contract security), Moralis (tx history, optional)

---

## 3. Folder Structure

```
src/
├── components/        # Shared UI elements
├── context/           # Wallet state context
├── features/          # Core feature modules
│   ├── chat/          # AI chat UI & logic
│   ├── portfolio/     # Portfolio rendering
│   ├── alerts/        # Token risk alerting
│   ├── settings/      # UI preferences
│   └── watchtower/    # Tracked wallet movements
├── hooks/             # Custom hooks
├── lib/               # API logic (GPT-4, GoPlus, Covalent, wallet utils)
├── pages/             # Next.js routes
├── styles/            # Global styles
├── types/             # Global TypeScript types
└── utils/             # Helpers & formatters
```

---

## 4. Key Features & Flow

### Wallet Connection
- EVM: MetaMask via ethers.js
- Solana: Phantom via window.solana

### Portfolio View
- Wallet address triggers Covalent API
- Tokens listed with balance, USD value, GoPlus flags

### Risk Engine (GoPlus)
- Token smart contracts scanned for risks: mintable, paused, honeypot, etc.
- Flags shown as visual badges in UI and referenced by GPT-4

### AI Chat (Juno’s Grove)
- User asks questions
- Prompt passed through GPT-4 API
- Future: wallet/token context injected

### Alerts
- Smart alert system surfaces warnings: suspicious tokens, new launches, etc.
- Alerts shown as banners or injected into the chat

---

## 5. Deployment & CI/CD

- **Hosting**: Vercel (frontend), Railway or Supabase (backend/database)
- **CI/CD**: GitHub Actions – deploys on push to `main`
- **Env Vars**: API keys stored in `.env` and excluded via `.gitignore`

---

## 6. Future Extensions

- User watchlists and tracked wallets
- AI-powered portfolio summaries
- Alert priority system based on risk tolerance
- Thematic sound & ambient mode toggles

---

## 7. Contributors Guide

- Start with `README.md`
- Folder by folder separation for features
- Use `tests/` for component and logic testing
- Follow naming: camelCase for variables, PascalCase for components

---

Juno is designed to feel minimal on the surface, while being deeply powerful underneath. This architecture is structured to support that vision.
