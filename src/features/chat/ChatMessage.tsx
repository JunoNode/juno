export default function ChatMessage({ role, content }: { role: "user" | "juno"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`my-2 ${isUser ? "text-right" : "text-left"}`}>
      <div className={`inline-block px-4 py-2 rounded-xl max-w-[75%] ${isUser ? "bg-jungle-glow text-black" : "bg-glass text-white backdrop-blur-sm"}`}>
        {content}
      </div>
    </div>
  );
}
