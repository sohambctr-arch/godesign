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
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs' | 'label-md' | 'label-sm';
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'inherit';
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
export declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
