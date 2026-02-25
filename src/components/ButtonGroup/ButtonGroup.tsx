import * as React from 'react';
import {
  ButtonGroup as UiButtonGroup,
  ButtonGroupItem as UiButtonGroupItem,
} from '../../untitledui/components/base/button-group/button-group';
import type { ToggleButtonGroupProps, ToggleButtonProps } from 'react-aria-components';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
// variant: default only | size: md only

export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, 'orientation' | 'className'> {
  size?: 'md';
  className?: string;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <UiButtonGroup
      ref={ref}
      size={size}
      className={cx(className)}
      {...props}
    />
  ),
);

ButtonGroup.displayName = 'ButtonGroup';

type UiProps = React.ComponentProps<typeof UiButtonGroupItem>;

export interface ButtonGroupItemProps
  extends Omit<UiProps, 'className'> {
  className?: string;
}


export const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ className, ...props }, ref) => (
    <UiButtonGroupItem
      ref={ref}
      className={cx(className)}
      {...props}
    />
  ),
);

ButtonGroupItem.displayName = 'ButtonGroupItem';
