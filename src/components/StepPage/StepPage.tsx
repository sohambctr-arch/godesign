import * as React from 'react';
import { cx } from '../../utils/cx';

// ─── StepPage ────────────────────────────────────────────────────────────────

export interface StepPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rendered in the absolute top-left corner. Pass a <Button> with an arrow icon. */
  backSlot?: React.ReactNode;
}

export const StepPage = React.forwardRef<HTMLDivElement, StepPageProps>(
  ({ backSlot, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        'relative min-h-screen w-full bg-[--color-background-secondary-alt]',
        className
      )}
      {...props}
    >
      {backSlot && (
        <div className="absolute left-[--spacing-container-padding] top-[--spacing-container-padding]">
          {backSlot}
        </div>
      )}
      {children}
    </div>
  )
);

StepPage.displayName = 'StepPage';

// ─── StepContent ─────────────────────────────────────────────────────────────

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Per-step max-width in px. Confirmed values: 512, 760, 844. Accepts any number. */
  maxWidth: number;
}

export const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ maxWidth, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full flex-col items-center gap-12',
        className
      )}
      style={{ maxWidth, ...style }}
      {...props}
    >
      {children}
    </div>
  )
);

StepContent.displayName = 'StepContent';

// ─── StepHeader ──────────────────────────────────────────────────────────────

export interface StepHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** e.g. "Step 4 / 5" */
  stepLabel?: string;
  title: string;
  subtitle?: string;
}

export const StepHeader = React.forwardRef<HTMLDivElement, StepHeaderProps>(
  ({ stepLabel, title, subtitle, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx('flex w-full flex-col items-center gap-2 text-center', className)}
      {...props}
    >
      {stepLabel && (
        <p className="text-xs text-[--color-text-disabled]">{stepLabel}</p>
      )}
      <div className="flex w-full flex-col items-center gap-1">
        <p className="text-display-xs font-semibold text-[--color-text-primary-900]">{title}</p>
        {subtitle && (
          <p className="text-md text-[--color-text-quaternary-500]">{subtitle}</p>
        )}
      </div>
    </div>
  )
);

StepHeader.displayName = 'StepHeader';

// ─── StepCard ────────────────────────────────────────────────────────────────

export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Internal vertical gap. Default 'sm' = 16px (gap-4). Use 'lg' = 40px (gap-10) for sparse content. */
  gap?: 'sm' | 'lg';
}

export const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  ({ gap = 'sm', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        'flex w-full flex-col rounded-[--radius-2xl] border border-[--color-border-primary] bg-[--color-background-primary] p-6',
        gap === 'sm' ? 'gap-4' : 'gap-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

StepCard.displayName = 'StepCard';

// ─── StepActions ─────────────────────────────────────────────────────────────

export interface StepActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary CTA — renders right. Pass a <Button variant="brand-solid">. */
  primary: React.ReactNode;
  /** Secondary CTA — renders left. Pass a <Button variant="secondary">. */
  secondary?: React.ReactNode;
  /** Small helper text below the buttons. */
  note?: React.ReactNode;
}

export const StepActions = React.forwardRef<HTMLDivElement, StepActionsProps>(
  ({ primary, secondary, note, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx('flex flex-col items-center gap-4', className)}
      {...props}
    >
      <div className="flex items-center gap-4">
        {secondary}
        {primary}
      </div>
      {note && (
        <p className="text-xs text-[--color-text-disabled]">{note}</p>
      )}
    </div>
  )
);

StepActions.displayName = 'StepActions';
