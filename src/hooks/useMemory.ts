import { useMemoryContext } from "@/context/MemoryProvider";
import { askJuno } from "@/lib/chatApi";

export function useMemoryHandler() {
  const { memory, add, reset } = useMemoryContext();

  const sendToGPT = async (input: string) => {
    try {
      const prompt = [...memory, { role: "user", content: input }];
      const response = await askJuno(prompt);

      add({ role: "user", content: input });
      add({ role: "assistant", content: response });
    } catch (error) {
      console.error("Juno GPT error:", error);
      add({
        role: "assistant",
        content: "Something went wrong while generating a response. Please try again.",
      });
    }
  };

  return { memory, add, reset, sendToGPT };
}