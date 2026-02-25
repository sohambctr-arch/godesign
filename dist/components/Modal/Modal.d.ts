import * as React from 'react';
import type { ModalOverlayProps } from 'react-aria-components';
export declare const ModalTrigger: typeof import("react-aria-components").DialogTrigger;
export interface ModalProps extends ModalOverlayProps {
    children: React.ReactNode;
    maxWidth?: string;
    dialogClassName?: string;
}
export declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
