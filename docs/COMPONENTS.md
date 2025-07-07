# Juno Components Overview

This file documents all core visual components used in Juno.

---

## Dashboard

| Component            | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `WalletHeader`       | Displays wallet address and refresh action                 |
| `WalletDashboard`    | Summarized wallet metrics (signals, confidence)            |
| `WalletStats`        | Token count, total value, and signal count                 |
| `WalletTokenTable`   | Lists all tokens with USD value and amount                 |
| `TokenValueBar`      | Visual bar breakdown of token distribution                 |

---

## Signals

| Component            | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `WalletSignalFeed`   | Recent signals and their confidence                         |
| `SignalLegend`       | Color and type key for signal meanings                      |
| `SignalTimeline`     | Vertical chronological view of signals                      |
| `ConfidenceBadge`    | Color-coded signal strength UI                              |
| `SignalFilter`       | Dropdown to filter signals by type                          |

---

## System & Dev

| Component            | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `ErrorBoundary`      | Prevents app crashes from uncaught errors                   |
| `DevPanel`           | Debug panel for tokens, signals, filter state               |
| `ThemeToggle`        | Light/dark/ambient toggle control                           |
| `WalletAddressBadge` | Truncated and copyable wallet address display               |

---

## AI & User Interaction

| Component            | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `AIChatInterface`    | Interactive GPT-powered assistant tailored to wallet data   |

---

## Planned / Future Components

| Component            | Purpose                                                     |
|----------------------|-------------------------------------------------------------|
| `MapOverlay`         | Visual navigation layer — a "treasure map" for wallet info, showing token clusters, signal territories, and history trails on a spatial grid. Planned as a symbolic UX for exploring connected signal zones or past transactions in a visual timeline. |
