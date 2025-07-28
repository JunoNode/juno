export function applyJunoTone(response: string): string {
  return response
    .replace(/!/g, '.')
    .replace(/\bYou should\b/gi, "It's worth noting that")
    .replace(/\bYou must\b/gi, "You may want to")
    .replace(/\bConsider\b/gi, "You could explore")
    .replace(/As an AI language model, /gi, '')
    .replace(/I am an AI[^.]*\.\s*/gi, '')
    .trim();
}
