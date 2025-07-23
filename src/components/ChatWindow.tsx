import { useState } from "react";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-glass backdrop-blur-sm p-6 rounded-xl shadow-soft">
      <div className="min-h-[200px] text-sm mb-4 opacity-90 space-y-2 overflow-y-auto max-h-80">
        {messages.length === 0 ? (
          <p className="italic text-white/60">
            Ask me anything about the chain...
          </p>
        ) : (
          messages.map((msg, idx) => (
            <p key={idx} className="text-white">
              {msg}
            </p>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 p-2 rounded bg-jungle-mist text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-sm text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
