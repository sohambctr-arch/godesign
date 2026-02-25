/**
 * SelectionCard — built from scratch (not available in Untitled UI).
 *
 * Variants confirmed in Figma extraction: default, selected, highlighted
 * Sizes confirmed: standard, compact
 * Tokens sourced from figma/tokens.raw.json → components.SelectionCard
 */
import * as React from 'react';
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
export declare const SelectionCard: React.ForwardRefExoticComponent<SelectionCardProps & React.RefAttributes<HTMLButtonElement>>;
export interface SelectionCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
}
export declare const SelectionCardGrid: React.ForwardRefExoticComponent<SelectionCardGridProps & React.RefAttributes<HTMLDivElement>>;
