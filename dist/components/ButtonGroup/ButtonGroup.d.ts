import * as React from 'react';
import { ButtonGroupItem as UiButtonGroupItem } from '../../untitledui/components/base/button-group/button-group';
import type { ToggleButtonGroupProps } from 'react-aria-components';
export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, 'orientation' | 'className'> {
    size?: 'md';
    className?: string;
}
export declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
type UiProps = React.ComponentProps<typeof UiButtonGroupItem>;
export interface ButtonGroupItemProps extends Omit<UiProps, 'className'> {
    className?: string;
}
export declare const ButtonGroupItem: React.ForwardRefExoticComponent<Omit<ButtonGroupItemProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
