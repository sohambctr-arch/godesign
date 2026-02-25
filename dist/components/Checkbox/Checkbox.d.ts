import * as React from 'react';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className'> {
    label?: React.ReactNode;
    hint?: React.ReactNode;
    size?: 'sm';
    className?: string | ((state: {
        isSelected: boolean;
        isIndeterminate: boolean;
        isDisabled: boolean;
        isReadOnly: boolean;
        isPressed: boolean;
        isFocused: boolean;
        isFocusVisible: boolean;
        isHovered: boolean;
    }) => string);
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLLabelElement>>;
