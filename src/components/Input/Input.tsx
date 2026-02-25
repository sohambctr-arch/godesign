import * as React from 'react';
import { Input as UiInput, type InputBaseProps } from '../../untitledui/components/base/input/input';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
// variant: default only | size: md only
export interface InputProps extends Omit<InputBaseProps, 'size'> {
  size?: 'md';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <UiInput
      ref={ref}
      size={size}
       className={
              typeof className === "function"
                ? (values) => cx(className(values))
                : cx(className)
            }
      {...props}
    />
  ),
);

Input.displayName = 'Input';
