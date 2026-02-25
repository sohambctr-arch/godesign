import type * as React from 'react';

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Constrains Tab/Shift+Tab within a container element.
// NOTE: Only use this for custom components. Untitled UI's Modal and Dialog
// primitives are built on React Aria which handles focus trapping natively.
// Use this only for components that bypass React Aria entirely.
// Returns a cleanup function.
export function trapFocus(containerRef: React.RefObject<HTMLElement>): () => void {
  const listener = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !containerRef.current) return;

    const focusable = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', listener);
  return () => document.removeEventListener('keydown', listener);
}
