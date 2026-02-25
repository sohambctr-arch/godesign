// Applies an optimistic value immediately, then confirms or rolls back
// based on the async result. Returns the current value so the caller
// can bind it to state.
// Use for: like buttons, status toggles, inline edits.
export function createOptimisticUpdate<T>(options: {
  currentValue: T;
  optimisticValue: T;
  action: () => Promise<T>;
  onSuccess?: (confirmedValue: T) => void;
  onError?: (error: unknown, rolledBackValue: T) => void;
}): {
  apply: () => void;
  currentValue: T;
  isOptimistic: boolean;
} {
  const { currentValue, optimisticValue, action, onSuccess, onError } = options;
  let isOptimistic = false;

  const apply = () => {
    isOptimistic = true;
    action()
      .then((confirmed) => {
        isOptimistic = false;
        onSuccess?.(confirmed);
      })
      .catch((err) => {
        isOptimistic = false;
        onError?.(err, currentValue);
      });
  };

  return {
    apply,
    currentValue: isOptimistic ? optimisticValue : currentValue,
    isOptimistic,
  };
}
