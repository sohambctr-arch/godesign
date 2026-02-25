/**
 * Typography — built from scratch (no Untitled UI Typography CLI component).
 *
 * Variant → token mapping follows Untitled UI's prose heading scale and the
 * confirmed composite styles from figma/tokens.raw.json → typography.styles.
 *
 * Heading scale (Untitled UI prose defaults):
 *   h1 → display-sm  (30px / 38px)
 *   h2 → display-xs  (24px / 32px)  ← also confirmed in Figma extraction
 *   h3 → text-xl     (20px)
 *   h4 → text-lg     (18px)
 *   h5 → text-md     (16px / 24px)  semibold → -0.16px tracking (text-md-semibold)
 *   h6 → text-sm     (14px / 20px)  semibold → 0px tracking  (text-sm-semibold)
 *
 * Body/label scale (confirmed in figma/tokens.raw.json → typography.styles):
 *   body-md  → text-md-regular  (16px / 24px / 0px tracking)
 *   body-sm  → text-sm-regular  (14px / 20px / -0.14px tracking)
 *   body-xs  → text-xs-regular  (12px / 18px / -0.12px tracking)
 *   label-md → text-sm-medium   (14px / 20px / -0.14px tracking)
 *   label-sm → text-xs-medium   (12px / 18px / -0.12px tracking)
 *
 * Colour and weight can be overridden per-instance when strictly necessary.
 * className is the last-resort escape hatch — not encouraged.
 */
import * as React from 'react';
import { cx } from '../../utils/cx';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'label-md'
  | 'label-sm';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'inherit';

export type TypographyWeight = 'regular' | 'medium' | 'semibold';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /**
   * Text colour mapped to a semantic token.
   * Use 'inherit' to let the parent colour bleed through.
   * @default 'primary'
   */
  color?: TypographyColor;
  /**
   * Override the default font weight for this variant.
   * Note: weight overrides do not adjust letter-spacing — use className if
   * you also need a tracking change alongside a weight deviation.
   * Avoid unless the design explicitly requires it.
   */
  weight?: TypographyWeight;
  /**
   * Override the rendered HTML element.
   * Useful for SEO (e.g. render an h1-sized span for a sub-heading slot).
   */
  as?: keyof React.JSX.IntrinsicElements;
}

// ─── Default HTML element per variant ────────────────────────────────────────

const defaultTag: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'label-md': 'span',
  'label-sm': 'span',
};

// ─── Size · weight · tracking per variant ────────────────────────────────────
//
// Heading scale follows Untitled UI's prose defaults (h1 = display-sm, etc.).
// Body/label scale uses only confirmed Figma composite styles.
//
// Line-heights are handled entirely by --text-{size}--line-height companion
// variables. Tailwind v4 applies these automatically when the utility is used.
// Companions for display-xs, display-sm, text-md, and text-xs (corrected) are
// defined in styles/theme.css. No leading-[px] overrides are needed here.
//
// Letter-spacing is set only where Figma confirms a non-zero value:
//   text-xs: -0.12px  |  text-sm: -0.14px  |  text-md-semibold: -0.16px
// text-sm-semibold overrides tracking to 0px (no class = browser default).

const variantClasses: Record<TypographyVariant, string> = {
  // Headings — Untitled UI prose scale
  // Line-heights are applied automatically via --text-{size}--line-height companions
  // defined in theme.css (display-xs, display-sm, text-md) and Tailwind's base theme
  // (text-xl, text-lg, text-sm, text-xs with corrected companion for xs).
  h1:         'text-display-sm font-semibold',
  h2:         'text-display-xs font-semibold',
  h3:         'text-xl font-semibold',
  h4:         'text-lg font-semibold',
  h5:         'text-md font-semibold tracking-[-0.16px]',
  h6:         'text-sm font-semibold',

  // Body text — confirmed Figma composite styles
  'body-lg':  'text-xl font-normal',
  'body-md':  'text-md font-normal',
  'body-sm':  'text-sm font-normal tracking-[-0.14px]',
  'body-xs':  'text-xs font-normal tracking-[-0.12px]',

  // Labels — confirmed Figma composite styles
  'label-md': 'text-sm font-medium tracking-[-0.14px]',
  'label-sm': 'text-xs font-medium tracking-[-0.12px]',
};

// ─── Semantic colour → token mapping ─────────────────────────────────────────

const colorClasses: Record<TypographyColor, string> = {
  primary:    'text-[--color-text-primary-900]',
  secondary:  'text-[--color-text-secondary-700]',
  tertiary:   'text-[--color-text-tertiary-600]',
  quaternary: 'text-[--color-text-quaternary-500]',
  inherit:    '',
};

// ─── Weight override classes ──────────────────────────────────────────────────

const weightClasses: Record<TypographyWeight, string> = {
  regular:  'font-normal',
  medium:   'font-medium',
  semibold: 'font-semibold',
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body-md', color = 'primary', weight, as, className, ...props }, ref) => {
    const Tag = (as ?? defaultTag[variant]) as React.ElementType;

    return (
      <Tag
        ref={ref}
        className={cx(
          variantClasses[variant],
          colorClasses[color],
          weight !== undefined && weightClasses[weight],
          className,
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
