import { useState } from "react";

export default function ChatWindow() {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-glass backdrop-blur-sm p-6 rounded-xl shadow-soft">
      <div className="min-h-[200px] text-sm mb-4 opacity-80">
        {/* Chat messages would render here */}
        <p className="italic">"Ask me anything about the chain..."</p>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question..."
        className="w-full p-2 rounded bg-jungle-mist text-white outline-none"
      />
    </div>
  );
}
