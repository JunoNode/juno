# Juno AI System Overview

Juno features a context-aware AI layer designed for parsing wallet signals, flagging risks, and returning Solana-native insights via structured GPT-4 prompting.

---

## 1. Purpose

The AI system — internally referred to as the Grove — functions as an assistant that helps users:

- Parse unusual wallet activity  
- Understand token-level risk implications  
- Track movements from watched wallets  
- Get market-aware responses grounded in their actual holdings

---

## 2. Architecture

```txt
[User Input]
   ↓
[useChat Hook]
   ↓
[GPT Prompt w/ Wallet Context]
   ↓
[AI Response]
   ↓
[Chat UI Render]

```

- `useChat.ts` manages conversation memory and status flags  
- `promptBuilder.ts` injects wallet data + memory into a structured GPT input  
- `ChatContainer.tsx` renders the full session as a conversational feed  

---

## 3. Prompt Strategy

All messages passed to GPT-4 are constructed dynamically based on:

- User query  
- Wallet context (via Covalent or internal indexing)  
- Risk metadata (GoPlus flags, signal types)  

**Prompt Example:**


Prompt structure is critical—Juno uses modular formatting to keep answers grounded in real state.

---

## 4. Current Capabilities

- Parses token metadata and flags  
- Surfaces wallet activity context  
- Responds in a stable, stripped-back tone (see: `applyJunoTone`)  
- Chained memory support via `sessionMemory.ts` (experimental)

---

## 5. Roadmap

- [ ] Memory decay and summarization over time  
- [ ] Multi-wallet context switching  
- [ ] Visual prompt builder for custom questions  
- [ ] Layered summarization for large wallet sets  

---

## 6. File Reference

- `lib/gpt/promptBuilder.ts` → Combines wallet data + memory into prompt format  
- `lib/memory/sessionMemory.ts` → Experimental memory chaining  
- `features/chat/useChat.ts` → Wraps GPT flow and handles local state  
- `features/chat/ChatContainer.tsx` → UI composition  
- `lib/gpt/personality.ts` → Applies the “Juno tone” to model output
