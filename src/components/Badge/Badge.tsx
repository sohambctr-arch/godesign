/**
 * Badge — built from scratch (not available in Untitled UI CLI).
 *
 * Variants confirmed in Figma extraction: blue-light
 * Sizes confirmed: sm
 * Tokens sourced from figma/tokens.raw.json → components.Badge
 */
import * as React from 'react';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
export type BadgeVariant = 'blue-light';
export type BadgeSize = 'sm';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'blue-light', size = 'sm', className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cx(
        // Base: pill shape, inline-flex, border
        'inline-flex items-center border',
        // blue-light variant tokens
        variant === 'blue-light' && [
          'bg-[--color-blue-light-50]',
          'border-[--color-blue-light-200]',
          'text-[--color-blue-light-700]',
        ],
        // sm size tokens: padding 2px 8px, text-xs
        size === 'sm' && 'rounded-[--radius-full] px-2 py-0.5 text-xs font-medium leading-[18px]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
