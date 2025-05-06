import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (prompt: string) => void }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 bg-jungle-mist text-white p-3 rounded-xl outline-none"
        placeholder="Ask Juno..."
      />
      <button onClick={handleSend} className="px-4 py-2 bg-jungle-glow text-black rounded-xl font-semibold">
        Send
      </button>
    </div>
  );
}
