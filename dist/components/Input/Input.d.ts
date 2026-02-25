import * as React from 'react';
import { type InputBaseProps } from '../../untitledui/components/base/input/input';
export interface InputProps extends Omit<InputBaseProps, 'size'> {
    size?: 'md';
}
export declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
