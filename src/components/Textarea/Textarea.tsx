import * as React from 'react';
import { TextArea as UiTextArea } from '../../untitledui/components/base/textarea/textarea';
// import type { AriaTextAreaProps } from 'react-aria-components';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
// variant: default only | size: md only
export interface TextareaProps {
  label?: string;
  hint?: React.ReactNode;
  placeholder?: string;
  rows?: number;
  cols?: number;
  className?: string;
  textAreaClassName?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, textAreaClassName, ...props }, ref) => (
    <UiTextArea
      ref={ref}
      textAreaClassName={cx(textAreaClassName)}
      className={cx(className)}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
