# Juno Component Reference

This document lists all UI components used in the Juno project and their responsibilities.

---

## `WalletDashboard.tsx`
Displays wallet summary info:
- Address
- Total signals
- Top signal type
- Average confidence

---

## `WalletTokenTable.tsx`
Table displaying token balances:
- Token name, symbol, amount, and USD value

---

## `TokenValueBar.tsx`
Visual bar showing portfolio distribution:
- Width = token's % of total USD value
- Colored segments

---

## `WalletSignalFeed.tsx`
List of most recent wallet signals:
- Signal type, confidence %, and timestamp
- Emoji icons to help differentiate signal types

---

## `SignalTimeline.tsx`
Vertical timeline of signal events:
- Date/time, signal type, confidence

---

## `WalletSkeleton.tsx`
Loading skeleton used while fetching data:
- Animates shimmer placeholder blocks

---

## Coming Soon
- `WalletNftTable.tsx`
- `Token/NFT Toggle Tabs`
- `Signal Confidence Badges`
