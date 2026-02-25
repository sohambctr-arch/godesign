// Copies text to clipboard. Resolves to true on success, false on failure.
// Use with a transient "Copied!" UI state — do not rely on the boolean alone.
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
