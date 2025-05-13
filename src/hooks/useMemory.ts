import { useMemoryContext } from "@/context/MemoryProvider";

// ...
const { memory, add, reset } = useMemoryContext();

const sendToGPT = async (input: string) => {
  const fullPrompt = [...memory, { role: "user", content: input }];
  const reply = await askJuno(fullPrompt);

  add({ role: "user", content: input });
  add({ role: "assistant", content: reply });
};
