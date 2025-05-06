import { useState } from "react";
import { fetchJunoReply } from "./chatApi";

interface Message {
  role: "user" | "juno";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(prompt: string) {
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setLoading(true);

    try {
      const reply = await fetchJunoReply(prompt);
      setMessages((prev) => [...prev, { role: "juno", content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "juno", content: "Something went wrong." }]);
    }

    setLoading(false);
  }

  return { messages, loading, sendMessage };
}
