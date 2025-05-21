#  Signal Reference

Juno surfaces alerts with calm priority — here’s what each type means:

- `token_mintable`: Token contract allows minting
- `trading_paused`: Transfers frozen or blocked
- `new_liquidity`: Token just received LP on Solana DEX
- `wallet_activity_spike`: Tracked address shows burst in transactions

Each signal is scored and surfaced based on risk logic.

## Signal Severity Levels

- **Level 3** — Paused Trading (Critical, may block exits)
- **Level 2** — Mintable Token (Medium risk, needs watching)
- **Level 1** — Wallet Activity / New Launch (Informational)

Used to prioritize what Juno surfaces calmly vs urgently.
