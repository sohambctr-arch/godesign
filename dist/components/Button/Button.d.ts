import * as React from 'react';
import { type ButtonProps as UiButtonProps } from '../../untitledui/components/base/buttons/button';
export type ButtonVariant = 'brand-solid' | 'secondary';
export type ButtonSize = 'sm' | 'md';
export interface ButtonProps extends Omit<UiButtonProps, 'color' | 'size'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}
export declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
