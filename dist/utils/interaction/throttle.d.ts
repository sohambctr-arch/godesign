export declare function throttle<T extends (...args: unknown[]) => unknown>(fn: T, wait: number): (...args: Parameters<T>) => void;
