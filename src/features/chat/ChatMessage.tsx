import { useState } from "react";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  role: "user" | "juno";
  content: string;
  isStreaming?: boolean; // true while response is being typed
  compact?: boolean; // optional: for shorter, quicker replies
};

export default function ChatMessage({
  role,
  content,
  isStreaming = false,
  compact = false,
}: ChatMessageProps) {
  const isUser = role === "user";
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = !expanded && compact && content.length > 240;
  const displayText = shouldTruncate
    ? content.slice(0, 240) + "..."
    : content;

  return (
    <div
      className={cn(
        "my-4 flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar bubble */}
      {!isUser && (
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-800 text-xs font-bold shadow-md">
          J
        </div>
      )}

      <div
        className={cn(
          "px-4 py-3 rounded-2xl max-w-[75%] md:max-w-[65%] text-sm md:text-base leading-relaxed relative group shadow-md transition-transform",
          isUser
            ? "bg-jungle-glow text-black hover:scale-[1.01]"
            : "bg-glass text-white backdrop-blur-md border border-white/10 hover:scale-[1.01]"
        )}
      >
        {/* Streaming dots */}
        {isStreaming ? (
          <span className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-current animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-current animate-bounce delay-150"></span>
            <span className="w-2 h-2 rounded-full bg-current animate-bounce delay-300"></span>
          </span>
        ) : (
          <p>{displayText}</p>
        )}

        {/* Expand/Collapse toggle */}
        {shouldTruncate && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-2 text-xs text-emerald-300 hover:text-emerald-200 underline"
          >
            Read more
          </button>
        )}
      </div>

      {/* User avatar bubble */}
      {isUser && (
        <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-
