# Prompt Examples

This page shows how Juno builds intelligent prompts using wallet context, memory, and chain activity.  
The goal is clarity, not chatter.

---

## Example 1: Portfolio Risk Insight  
**User asks:**  
> “Is anything in my wallet risky right now?”

**Wallet context:**
```
8400 ZENTOK (5DgB3mQZdXTqfJRxqsjzpJ9zMqskAeFY3aB2NhzZYnWm)  
3.1 SOL  
215 BONK
```

**Memory entries:**
- User previously asked about mintable tokens  
- ZENTOK was flagged for minting and paused trading

**Built prompt:**
```json
[
  {
    "role": "system",
    "content": "This user holds: 8400 ZENTOK, 3.1 SOL, 215 BONK. ZENTOK is flagged as mintable and currently has trading paused."
  },
  {
    "role": "user",
    "content": "Is anything in my wallet risky right now?"
  }
]
```

**Output:**  
> “ZENTOK appears to carry risk its contract allows minting and trading is paused. SOL and BONK are stable.”

---

## Example 2: Wallet Movement Tracker  
**User asks:**  
> “What’s the most active wallet I’m watching?”

**System context:**  
User is tracking three wallets in the Watchtower module.

**Built prompt:**
```json
[
  {
    "role": "system",
    "content": "This user is monitoring 3 wallets. Wallet A had 6 transactions in the past 8 hours. Wallet B had none. Wallet C had 2 minor transfers."
  },
  {
    "role": "user",
    "content": "What’s the most active wallet I’m watching?"
  }
]
```

**Output:**  
> “Wallet A has shown the most recent activity with 6 transactions in the last 8 hours.”

---

## Example 3: Stealth Launch Detection  
**User asks:**  
> “Any new tokens just launched?”

**Internal scanner logic:**  
Two new liquidity pairs added in the past 3 hours.

**Built prompt:**
```json
[
  {
    "role": "system",
    "content": "New Solana tokens detected: ZENTOK and SHADOWLIME. ZENTOK (5DgB3mQZdXTqfJRxqsjzpJ9zMqskAeFY3aB2NhzZYnWm) has $600 liquidity, SHADOWLIME has $420. No social links or audits found."
  },
  {
    "role": "user",
    "content": "Any new tokens just launched?"
  }
]
```

**Output:**  
> “Yes ZENTOK and SHADOWLIME have just launched. Liquidity is very low and neither token shows social or audit info yet. Use caution.”

---

These examples demonstrate how Juno combines:
- **Solana wallet activity**  
- **Real-time risk detection**  
- **Session memory**

...to offer useful, timely insight without noise or overload.
