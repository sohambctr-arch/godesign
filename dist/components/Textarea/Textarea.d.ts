import * as React from 'react';
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
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLDivElement>>;
