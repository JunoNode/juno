import { OpenAIStream } from "@/lib/OpenAIStream";
import { ChatMessage } from "@/types/chat";
import { buildJunoPrompt } from "./promptBuilder";

interface ChatRequestBody {
  messages: ChatMessage[];
  walletSummary: string;
}

export async function POST(req: Request) {
  try {
    const { messages, walletSummary }: ChatRequestBody = await req.json();

    const userMessage = messages.find((msg) => msg.role === "user");
    const memory = messages
      .filter((msg) => msg.role !== "user")
      .map((msg) => msg.content);

    const prompt = buildJunoPrompt({
      memory,
      walletSummary,
      input: userMessage?.content || "",
    });

    const response = await OpenAIStream({
      model: "gpt-4",
      prompt,
      temperature: 0.7,
      max_tokens: 800,
    });

    return new Response(response);
  } catch (err: any) {
    console.error("[ChatAPI Error]", err.message || err);
    return new Response("Failed to generate response", { status: 500 });
  }
}
