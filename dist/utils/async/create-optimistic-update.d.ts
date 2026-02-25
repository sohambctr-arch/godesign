export declare function createOptimisticUpdate<T>(options: {
    currentValue: T;
    optimisticValue: T;
    action: () => Promise<T>;
    onSuccess?: (confirmedValue: T) => void;
    onError?: (error: unknown, rolledBackValue: T) => void;
}): {
    apply: () => void;
    currentValue: T;
    isOptimistic: boolean;
};
