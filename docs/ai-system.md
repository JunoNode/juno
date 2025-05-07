# Juno AI System Overview

Juno includes a context-aware AI interface powered by OpenAI GPT-4, used to interpret wallet activity, identify risks, and respond to user queries in a natural, crypto-native format.

---

## 1. Purpose

Juno's AI module ("The Grove") acts as a conversational assistant to help users:
- Understand what's happening in their wallet
- Detect risky tokens or contracts
- Track wallet movements and smart money behavior
- Ask general market questions

---

## 2. Architecture

```
[User Input] → [useChat Hook] → [GPT-4 API (chatApi.ts)] → [AI Response] → [Chat UI Render]
```

- `useChat.ts`: Manages conversation state and loading logic
- `chatApi.ts`: Makes POST requests to OpenAI’s GPT-4 endpoint
- `ChatContainer.tsx`: Renders conversation and input box

---

## 3. Prompt Strategy

We use structured prompt formatting to guide GPT-4. Prompts may include:

- Direct questions (from the user)
- Wallet context (fetched via Covalent)
- Token flags (from GoPlus)

**Example Prompt:**
```
The user holds 5 tokens. One of them is flagged as mintable. Should they be concerned?

Token List:
- ABC: $150, flagged: mintable
- XYZ: $400, safe

Respond clearly and concisely.
```

---

## 4. Future Plans

- [ ] Memory for session-based interactions
- [ ] GPT-assisted portfolio rebalancing suggestions
- [ ] Summaries of token movement from watched wallets
- [ ] Risk scoring over time based on user behavior

---

## 5. API Keys

- OpenAI GPT-4 (used in `chatApi.ts`)
  - Stored in `.env` as `NEXT_PUBLIC_OPENAI_API_KEY`
  - Never exposed client-side — routed via serverless function or edge route

---

## 6. Limitations

- GPT-4 can hallucinate or misinterpret incomplete data
- Always treat AI responses as suggestions, not financial advice
- We surface contract flags to help ground responses in real data

---

## 7. File Map

- `features/chat/chatApi.ts` → GPT-4 call logic
- `features/chat/useChat.ts` → Prompt handling and response flow
- `features/chat/ChatContainer.tsx` → Chat interface
- `lib/api.ts` → Where wallet/token data could be injected into prompt

