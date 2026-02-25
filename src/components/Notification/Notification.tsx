/**
 * Notification — built from scratch (not available in Untitled UI CLI).
 *
 * Variants confirmed in Figma extraction: warning
 * Sizes confirmed: standard
 * Tokens sourced from figma/tokens.raw.json → components.Notification
 */
import * as React from 'react';
import { cx } from '../../utils/cx';

// Variants confirmed in Figma extraction (component-map.json)
export type NotificationVariant = 'warning';

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NotificationVariant;
  /** Icon rendered in the notification's leading icon slot */
  icon?: React.ReactNode;
  /** Primary heading text */
  title?: string;
  /** Supporting body text */
  description?: React.ReactNode;
  /** Optional action element (e.g. a link or button) */
  action?: React.ReactNode;
}

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      variant = 'warning',
      icon,
      title,
      description,
      action,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx(
        // Container tokens from figma/tokens.raw.json → components.Notification
        'flex w-full items-start gap-3',
        'rounded-[12px] border border-[rgba(0,0,0,0.08)]',
        'bg-[--color-background-primary]',
        'p-4',
        'shadow-[--shadow-md]',
        className,
      )}
      {...props}
    >
      {/* Leading icon slot */}
      {icon && (
        <div className="mt-0.5 shrink-0 text-[--color-foreground-fg-warning-primary]">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title && (
          <p className="text-sm font-semibold leading-5 text-[--color-text-primary-900]">
            {title}
          </p>
        )}
        {description && (
          <p className="text-sm font-normal leading-5 text-[--color-text-secondary-700]">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-1 text-sm font-semibold text-[--color-brand-700]">
            {action}
          </div>
        )}
      </div>
    </div>
  ),
);

Notification.displayName = 'Notification';
