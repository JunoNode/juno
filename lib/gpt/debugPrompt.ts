type DebugContext = Record<string, any>;

export function debugPrompt(prompt: string, context?: DebugContext) {
  if (process.env.NODE_ENV !== "development") return;

  console.groupCollapsed("%c[🧠 Prompt Debug]", "color:#82e5a9;font-weight:bold;");
  console.log("%c> Input:", "color:#80bfff", prompt);

  if (context) {
    console.log("%c> Context:", "color:#ffc078", context);
  }

  console.groupEnd();
}
