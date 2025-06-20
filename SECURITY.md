## Juno Security Policy

Juno is built with wallet-first safety in mind. We do not store private keys, sensitive personal information, or interact with user funds in any custodial way.

## Scope

We welcome reports related to vulnerabilities in the following areas:

- Wallet connection and Phantom login flows
- Signal scoring, rendering, and storage logic
- Token risk flags and smart contract integrations
- Frontend UI components that expose private or financial data
- API route protection and validation
- DevPanel and developer-facing tools

---

## Core Principles

- Juno connects to wallets (like Phantom) in read-only mode unless explicitly interacting

- API keys for third-party services (GoPlus, Covalent, OpenAI) are stored securely

- No user data is collected or persisted without permission

- Smart alert logic does not require contract write access

---

## Reporting Vulnerabilities

If you discover a security issue related to:

- Wallet connection logic

- Risk alert misclassification

- Data exposure in the dashboard

---

## Safe Harbor

We will not pursue legal action against individuals who:

- Act in good faith to disclose vulnerabilities
- Avoid exploiting or accessing user data
- Follow the steps outlined in this policy

Please do not open a public issue.

Instead, contact us via Twitter: [@JunoNode](https://twitter.com/JunoNode) and open a private discussion labeled security.

We take all vulnerability reports seriously and will respond within 48 hours.
