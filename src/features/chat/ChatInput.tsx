import { useState } from "react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  onSend: (prompt: string, options?: { compact: boolean }) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [compact, setCompact] = useState(false);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input, { compact });
    setInput("");
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-6">
      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          disabled={disabled}
          className={cn(
            "flex-1 p-3 rounded-xl outline-none transition-all",
            "bg-glass text-white placeholder-white/40 backdrop-blur-md border border-white/10",
            "focus:ring-2 focus:ring-emerald-400",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          placeholder={disabled ? "Juno is thinking..." : "Ask Juno..."}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-xl font-semibold transition-all shadow-md",
            "bg-jungle-glow text-black hover:scale-[1.03]",
            disabled && "opacity-50 cursor-not-allowed hover:scale-100"
          )}
        >
          Send
        </button>
      </div>

      {/* Compact toggle */}
      <div className="flex items-center gap-2 text-xs text-white/70">
        <input
          id="compact-mode"
          type="checkbox"
          checked={compact}
          onChange={(e) => setCompact(e.target.checked)}
          className="w-4 h-4 accent-emerald-500"
        />
        <label htmlFor="compact-mode" className="cursor-pointer select-none">
          Short responses mode
        </label>
      </div>
    </div>
  );
}
