import * as React from 'react';
import { Checkbox as UiCheckbox } from '../../untitledui/components/base/checkbox/checkbox';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
// variant: default only | size: sm only
export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  size?: 'sm';
  className?: string | ((state: { isSelected: boolean; isIndeterminate: boolean; isDisabled: boolean; isReadOnly: boolean; isPressed: boolean; isFocused: boolean; isFocusVisible: boolean; isHovered: boolean }) => string);
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ size = 'sm', className, ...props }, ref) => (
    <UiCheckbox
      ref={ref}
      size={size}
      className={className}
      {...props}
    />
  ),
);

Checkbox.displayName = 'Checkbox';
