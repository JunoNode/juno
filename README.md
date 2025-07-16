<img width="4026" height="1001" alt="image" src="https://github.com/user-attachments/assets/5b1c504e-c28e-4edb-8586-1bf9455ebd8d" />

<p align="center">
Juno: The ambient intelligence of your Solana wallet.
</p>

<p align="center">
Track signals. Visualize confidence. Chat with your wallet.
</p>

<p align="center">
Modular. Minimal. Memory-aware. Built for explorers.
</p>

<p align="center">
<a href="https://junonode.gitbook.io/junonode">Docs</a> • <a href="https://github.com/JunoNode/juno/tree/main/components">Components</a> • <a href="./BREAKOUT.md">Breakout Submission</a> • <a href="./MANIFESTO.md">Juno Manifesto</a>

</p>

---

Juno is a real-time Solana dashboard that listens to what your wallet is doing and helps you understand it.

It shows token values, visual timelines, and signal strength with a clean, ambient UI.  
An onboard AI assistant lets you ask questions about your wallet activity using custom code mixed with GPT‑4 powered by memory, prompts, and real-time context.

No setup friction. No bloated UX.  
Just clarity, precision, and your own private signal tracker.

---

### Features

- **Conversational AI** — Ask Juno about wallet activity, market behavior, token risks, and signal trends.

- **Portfolio Tracking** — Monitor real-time balances, value shifts, and historical performance across supported chains.

- **Smart Alerts** — Surface critical events like stealth listings, liquidity shifts, insider activity, and potential rugs.

- **Wallet Watching** — Track influential wallets and follow smart money movements as they happen.

- **Launch Radar** — Detect and analyze newly deployed tokens before they trend.

- **Multi-chain Ready** — Built with extensibility in mind for Solana, Ethereum, Arbitrum, Base, and more.

- **Ambient UI** — Jungle-inspired interface designed for clarity, minimalism, and deep focus.


---

### Tech Stack

- `frontend` : React (Vite), Tailwind CSS, Framer Motion for modular, animated UI

- `backend` : Node.js (Express) and Python (FastAPI) microservices for signal processing and memory

- `ui-system` : Component-driven layout with reusable elements and dynamic transitions

- `data-layer` : PostgreSQL for wallet session storage, signal logs, and prompt history

- `ai-layer` : GPT-4 powered natural language assistant connected to wallet and signals

- `dev-tools` : TypeScript, ESLint, Prettier, Jest, React Testing Library

---

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/JunoNode/juno.git
   cd juno
   
### Install Dependencies

2. npm install

### Configure Environment Variables

3. Copy .env.example to .env.local and add your keys.

### Run The App

4. npm run dev

---

### How It Works

1. Wallet connects (or uses mock data)
2. Tokens and signals are parsed and scored
3. Data flows through session memory
4. AI assistant responds based on wallet state
5. Visual components update live as new events arrive

---

### License

![MIT License](https://img.shields.io/badge/license-MIT-green)

---

### Links

Website: [junonode.io](https://junonode.io/)

Twitter: [@JunoNode](https://twitter.com/JunoNode)

---

### Powered By

![Powered by GPT-4](https://img.shields.io/badge/powered%20by-GPT--4-black)
![Built with Vite](https://img.shields.io/badge/build-vite-blue)

