import type * as React from 'react';

// Calls handler when a mousedown occurs outside the given ref.
// Use for: dropdowns, popovers, context menus, inline editors.
// Returns a cleanup function — always call it in useEffect return.
export function handleOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
): () => void {
  const listener = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler();
    }
  };
  document.addEventListener('mousedown', listener);
  return () => document.removeEventListener('mousedown', listener);
}
