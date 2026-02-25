// @[company]/ui/utils — separate entry point for tree-shakeable utility exports.
export { throttle }               from './interaction/throttle';
export { debounce }               from './interaction/debounce';
export { handleOutsideClick }     from './interaction/handle-outside-click';
export { handleEscapeKey }        from './interaction/handle-escape-key';
export { trapFocus }              from './interaction/trap-focus';
export { copyToClipboard }        from './interaction/copy-to-clipboard';
export { formatDate }             from './formatting/format-date';
export { formatRelativeTime }     from './formatting/format-relative-time';
export { formatCurrency }         from './formatting/format-currency';
export { formatNumber }           from './formatting/format-number';
export { truncate }               from './formatting/truncate';
export { withRetry }              from './async/with-retry';
export { createOptimisticUpdate } from './async/create-optimistic-update';
