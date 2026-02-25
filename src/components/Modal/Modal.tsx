import * as React from 'react';
import {
  Dialog as UiDialog,
  DialogTrigger as UiDialogTrigger,
  Modal as UiModal,
  ModalOverlay as UiModalOverlay,
} from '../../untitledui/components/application/modals/modal';
import type { DialogProps, ModalOverlayProps } from 'react-aria-components';
import { cx } from '../../utils/cx';

// Variants and sizes confirmed in Figma extraction (component-map.json)
// variant: confirmation | size: standard

export const ModalTrigger = UiDialogTrigger;

export interface ModalProps extends ModalOverlayProps {
  children: React.ReactNode;
  maxWidth?: string;
  dialogClassName?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ children, className, maxWidth = '544px', dialogClassName, ...props }, ref) => (
    <UiModalOverlay>
      <UiModal
        className={
        typeof className === "function"
          ? (values) => cx(className(values))
          : cx(className)
      }
        {...props}
      >
        <UiDialog
          className={cx(
            'bg-[--color-background-primary] rounded-[16px] shadow-[--shadow-xl] w-full p-0',
            dialogClassName,
          )}
          style={{ maxWidth }}
        >
          {children}
        </UiDialog>
      </UiModal>
    </UiModalOverlay>
  ),
);

Modal.displayName = 'Modal';
