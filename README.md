# Juno

Juno is an AI-powered crypto trading agent built to help users navigate the markets with clarity, calm, and confidence.  
It combines intelligent portfolio tracking, risk detection, and signal analysis — all within an immersive, jungle-inspired interface.

---

## Features

- Conversational AI Interface — Ask Juno for insights, market scans, wallet risks, and more.
- Portfolio Tracker — View real-time balances and historical PnL across chains.
- Smart Alerts Engine — Get notified about rugs, insider moves, stealth listings, and liquidity shifts.
- Wallet Watcher — Follow smart money wallets and whale activity.
- Stealth Launch Radar — Detect newly deployed tokens early and assess risks instantly.
- Multi-chain Support — Ethereum, Solana, Arbitrum, Base (extensible).
- Jungle-Themed UX — Light, clean, and immersive environment that enhances focus.

---

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: Node.js (Express) or Python (FastAPI), PostgreSQL
- AI/NLP: OpenAI GPT-4 API (natural language interaction)
- Blockchain APIs:
  - Covalent API – Portfolio and wallet data
  - DexScreener API – Market scanning, trending tokens
  - GoPlus API – Contract risk/security analysis
  - CoinGecko API – Token pricing and metadata
  - Moralis API – Optional real-time wallet tracking

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/juno.git
   cd juno
   
## Install Dependencies

2. npm install

## Configure Environment Variables

3. Copy .env.example to .env.local and add your API keys.

## Run The App

4. npm run dev


---

## Project Structure

juno/ 
  public/ 
    favicon.ico 
    assets/ 
      logo.svg 
      jungle-bg.png 
      glow-eyes.png 
    og/ 
      og-default.png 
      og-preview.jpg 

  src/ 
    components/ 
      Layout.tsx 
      Navbar.tsx 
      Footer.tsx 
      WalletConnect.tsx 
      ChatWindow.tsx 
    context/ 
      WalletProvider.tsx 
    features/ 
      chat/ 
        ChatContainer.tsx 
        ChatInput.tsx 
        ChatMessage.tsx 
        useChat.ts 
        chatApi.ts 
      alerts/  
        SmartAlerts.tsx 
      portfolio/ 
        PortfolioPanel.tsx 
      settings/ 
        SettingsPanel.tsx 
      watchtower/ 
        WatchedWallet.tsx 
        useWatchedWallets.ts 
    hooks/ 
      useWallet.ts
    lib/
      api.ts
      wallet.ts
      utils.ts
      alerts.ts
    pages/
      index.tsx
      portfolio.tsx
      watchtower.tsx
      chat.tsx
      settings.tsx
    styles/
      globals.css
    types/
      token.ts 
      wallet.ts 
    utils/ 
      parseRisks.ts 

  tests/ 
    chat.test.ts 
    utils.test.ts 

  .github/ 
    workflows/ 
      deploy.yml 

  .gitignore
  jest.config.js 
  jest.setup.js 
  tsconfig.json 
  tailwind.config.js 
  package.json 
  README.md 
  LICENSE 
  CONTRIBUTING.md 


---

## License

MIT © Juno

---

## Links

Website (Coming Soon)

Twitter: [@JunoNode](https://twitter.com/JunoNode)

![Foundation](https://github.com/user-attachments/assets/a13734d9-ecbd-4fd9-beb9-b1e4c6fee899)




