/**
 * SelectionCard — built from scratch (not available in Untitled UI).
 *
 * Variants confirmed in Figma extraction: default, selected, highlighted
 * Sizes confirmed: standard, compact
 * Tokens sourced from figma/tokens.raw.json → components.SelectionCard
 */
import * as React from 'react';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
export type SelectionCardVariant = 'default' | 'selected' | 'highlighted';
export type SelectionCardSize = 'standard' | 'compact';

export interface SelectionCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: SelectionCardVariant;
  size?: SelectionCardSize;
  /** Icon element rendered in the card's circular icon container */
  icon?: React.ReactNode;
  /** Card title — text-md-medium */
  title: string;
  /** Supporting subtitle — text-sm-regular */
  subtitle?: string;
}

export const SelectionCard = React.forwardRef<HTMLButtonElement, SelectionCardProps>(
  (
    {
      variant = 'default',
      size = 'standard',
      icon,
      title,
      subtitle,
      className,
      ...props
    },
    ref,
  ) => {
    const isSelected = variant === 'selected';
    const isHighlighted = variant === 'highlighted';

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isSelected}
        className={cx(
          // Base card: fixed width, padding, radius, bg, cursor
          'relative flex w-[304px] flex-col gap-4 rounded-[--radius-2xl] p-6 text-left',
          'cursor-pointer outline-none transition-all duration-100',
          'focus-visible:ring-2 focus-visible:ring-[--color-brand-600] focus-visible:ring-offset-2',

          // Default variant
          variant === 'default' && [
            'border border-[--color-border-primary]',
            'bg-[--color-background-primary]',
          ],

          // Selected variant — 3px brand-orange border
          isSelected && [
            'border-[3px] border-[--color-brand-600]',
            'bg-[--color-background-primary]',
          ],

          // Highlighted variant — light brand tint bg, muted brand border
          isHighlighted && [
            'border border-[--color-brand-300]',
            'bg-[--color-brand-25]',
          ],

          className,
        )}
        {...props}
      >
        {/* Icon container */}
        {icon && (
          <div
            className={cx(
              'flex shrink-0 items-center justify-center rounded-[--radius-circular]',
              // Standard size: 40px | Compact size: 30px
              size === 'standard' ? 'size-10' : 'size-[30px]',
              // Icon bg: default/selected → brand-primary-bg | highlighted → brand-utility-200
              isHighlighted
                ? 'bg-[--color-brand-200]'
                : 'bg-[--color-brand-100]',
            )}
          >
            {icon}
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium leading-6 text-[--color-text-primary-900]">
            {title}
          </p>
          {subtitle && (
            <p className="text-sm font-normal leading-5 text-[--color-text-secondary-700]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Selected check indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-[--color-brand-600]">
            <svg
              aria-hidden="true"
              viewBox="0 0 14 14"
              fill="none"
              className="size-3 text-white"
            >
              <path
                d="M11.667 3.5 5.25 9.917 2.333 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </button>
    );
  },
);

SelectionCard.displayName = 'SelectionCard';

// ── SelectionCardGrid ──────────────────────────────────────────────────────────
// Convenience layout wrapper: 3-column grid, 24px gap.
// Matches figma/tokens.raw.json → components.SelectionCard.grid-columns / grid-gap

export interface SelectionCardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectionCardGrid = React.forwardRef<HTMLDivElement, SelectionCardGridProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx('grid grid-cols-3 gap-6', className)}
      {...props}
    />
  ),
);

SelectionCardGrid.displayName = 'SelectionCardGrid';
