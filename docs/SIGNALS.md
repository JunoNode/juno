# Signal Reference

Juno surfaces real-time on-chain events through lightweight signal logic. Each signal is assigned a risk level and confidence score, letting you triage the chain without noise.

---

## Signal Types

These are the core signal types currently surfaced:

- `token_mintable`: Contract allows further token minting: inflation risk.
- `trading_paused`: Transfers frozen or disabled: exit risk.
- `new_liquidity`: LP was added recently: likely a fresh launch.
- `wallet_activity_spike`: Tracked wallet has a sudden burst in transactions.

All signals are scored and filtered before surfacing, using context-aware rules.

---

## Signal Severity Levels

Juno ranks signals by severity to control urgency:

- **Level 3 — High**  
  `trading_paused`: Critical. May prevent exits or signal rug attempts.

- **Level 2 — Medium**  
  `token_mintable`: Token is mintable, could lead to dilution or abuse.

- **Level 1 — Low**  
  `wallet_activity_spike`, `new_liquidity`: Informational. Requires context.

These levels help Juno surface high-risk events with priority, while keeping ambient signals visible but low-pressure.

---

## Confidence Scoring

Each signal includes a `confidenceScore` between `0.00` and `1.00`, based on:

- **Wallet Age** — Older wallets carry stronger weight.  
- **USD Volume** — Higher transaction volume = higher confidence.  
- **Signal Type** — Some signals are naturally more predictive.  
- **Historical Accuracy** — (Planned) Juno will track past outcomes to tune signal trust.  
- **Direction** — Bias applied based on buy/sell flow.

Use confidence scores to:

- Visually rank severity (`0.85+` = high confidence)
- Filter low-quality signals
- Pipe into downstream automation models

---
