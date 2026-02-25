/**
 * Badge — built from scratch (not available in Untitled UI CLI).
 *
 * Variants confirmed in Figma extraction: blue-light
 * Sizes confirmed: sm
 * Tokens sourced from figma/tokens.raw.json → components.Badge
 */
import * as React from 'react';
export type BadgeVariant = 'blue-light';
export type BadgeSize = 'sm';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
