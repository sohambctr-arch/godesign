/**
 * Notification — built from scratch (not available in Untitled UI CLI).
 *
 * Variants confirmed in Figma extraction: warning
 * Sizes confirmed: standard
 * Tokens sourced from figma/tokens.raw.json → components.Notification
 */
import * as React from 'react';
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
export declare const Notification: React.ForwardRefExoticComponent<NotificationProps & React.RefAttributes<HTMLDivElement>>;
