// Calls handler when the Escape key is pressed.
// Use alongside handleOutsideClick for modals and drawers.
// Returns a cleanup function.
export function handleEscapeKey(handler: () => void): () => void {
  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler();
    }
  };
  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}
