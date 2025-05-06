import { useChat } from "./useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-glass backdrop-blur-md p-6 rounded-2xl shadow-soft">
      <div className="max-h-[400px] overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
        {loading && <p className="text-sm opacity-50 italic">Juno is thinking...</p>}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
