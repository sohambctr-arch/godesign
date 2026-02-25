import * as React from 'react';
import { Button as UiButton, type ButtonProps as UiButtonProps } from '../../untitledui/components/base/buttons/button';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
export type ButtonVariant = 'brand-solid' | 'secondary';
export type ButtonSize = 'sm' | 'md';

// Map Figma variant names to Untitled UI color prop values
const variantToColor: Record<ButtonVariant, UiButtonProps['color']> = {
  'brand-solid': 'primary',
  secondary: 'secondary',
};

export interface ButtonProps extends Omit<UiButtonProps, 'color' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'brand-solid', size = 'md', className, ...props }, ref) => (
    <UiButton
      ref={ref}
      color={variantToColor[variant]}
      size={size}
      className={cx(className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
