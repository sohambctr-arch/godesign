export declare function withRetry<T>(fn: () => Promise<T>, options?: {
    maxAttempts?: number;
    baseDelayMs?: number;
}): Promise<T>;
