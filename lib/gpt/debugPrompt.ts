export function debugPrompt(prompt: string, context: any) {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[Prompt Input]', prompt);
    console.debug('[Prompt Context]', context);
  }
}
