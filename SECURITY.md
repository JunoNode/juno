## Juno Security Policy

Juno is built with wallet-first safety in mind. We do not store private keys, sensitive personal information, or interact with user funds in any custodial way.

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

Please do not open a public issue.

Instead, contact us via X @JunoNode and open a private discussion labeled security.

We take all vulnerability reports seriously and will respond within 48 hours.
