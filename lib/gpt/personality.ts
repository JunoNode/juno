export function applyJunoTone(response: string): string {
  // Applies a calm, observant tone to GPT responses
  return response
    .replace(/!/g, '.')
    .replace(/You should/g, "It's worth observing that")
    .replace(/\byou must\b/gi, "you may want to")
    .replace(/As an AI language model, /g, "")
    .trim();
}
