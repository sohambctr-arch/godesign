# CLAUDE.md — [COMPANY] Design System

This file is automatically loaded by Claude Code on every invocation.
Read it fully before taking any action in this repository.

---

## What This Repo Is

This is the **[COMPANY] Design System** — a React + Tailwind CSS component library built on top
of [Untitled UI React](https://github.com/untitleduico/react), customised with [COMPANY]-specific
design tokens, and published as `@[company]/ui` for internal teams across the company.

Consumer teams install one package and get:
- The full Untitled UI component set, painted in [COMPANY]'s brand
- A wrapper API that enforces consistent prop contracts across every product
- Shared utility functions for interaction patterns, formatting, and async UX

---

## Critical Architectural Facts

### 1. Untitled UI is source code, not a dependency
Components are copied into this repo via the Untitled UI CLI. Once copied, they live
in `src/untitledui/` and are treated as **read-only vendor source**. They are never
edited directly — this keeps them updatable via CLI at any time.

```bash
npx untitledui@latest add button              # install
npx untitledui@latest add button --overwrite  # pull upstream update
```

The CLI install path is configured in `components.json` at the repo root. Do not
delete or move this file — without it, CLI installs land in the wrong directory.

```json
// components.json — DO NOT MODIFY
{
  "componentsDir": "src/untitledui/components"
}
```

### 2. Brand customisation happens entirely in theme.css
Every visual difference between stock Untitled UI and [COMPANY]'s brand is expressed
as a CSS token override in `styles/theme.css`. No inline styles. No hardcoded values
in component files. If a visual change cannot be expressed as a token, it is flagged
for human review before any code is written.

### 3. Every component is a wrapper
`src/untitledui/` contains the pristine CLI-installed source.
`src/components/` contains [COMPANY]'s wrapper for each component.
Consumers only ever import from `@[company]/ui` — they never touch the untitledui layer.

### 4. Utilities are co-located but independently tree-shakeable
All utility functions live in `src/utils/` and are exported from a separate entry point
(`src/utils/index.ts`) so they can be split into a separate package (`@[company]/utils`)
in a future scope without restructuring any code — only `package.json` changes.

### 5. Webpack is the build tool
Webpack is used instead of Vite or tsup because Tailwind v4's `@theme {}` syntax
requires a production-grade PostCSS pipeline. Webpack's `postcss-loader` +
`MiniCssExtractPlugin` provides this reliably. The Webpack config is read-only
for agents — treat it the same as vendor source. Type declarations are emitted
separately via `tsc --emitDeclarationOnly`.

---

## Repo Structure

```
[company]-design-system/
├── CLAUDE.md
├── components.json                    ← Untitled UI CLI config — DO NOT MODIFY
├── webpack.config.js                  ← build config — DO NOT MODIFY
├── webpack.config.cjs.js              ← CJS output config — DO NOT MODIFY
├── postcss.config.js                  ← PostCSS config — DO NOT MODIFY
├── tsconfig.json                      ← base TypeScript config
├── tsconfig.build.json                ← used by tsc --emitDeclarationOnly
├── package.json
│
├── .claude/
│   └── tasks/
│       ├── orchestrate.md             ← master pipeline runner
│       ├── extract-frame.md           ← Figma frame extraction sub-agent
│       ├── merge-tokens.md            ← conflict resolution + merge agent
│       ├── transform-tokens.md        ← theme.css token override agent
│       ├── generate-wrappers.md       ← wrapper component generation agent
│       └── generate-stories.md        ← Storybook story generation agent
│
├── figma/
│   ├── tokens.raw.json                ← merged token output (written by merge agent)
│   ├── conflicts.json                 ← all conflicts found across frames (human reviews this)
│   ├── frames/
│   │   └── [frame-name].json          ← per-frame extraction output (one file per sub-agent)
│   └── component-map.json             ← final component manifest (written by merge agent)
│
├── src/
│   ├── untitledui/                    ← READ-ONLY — CLI-installed Untitled UI source
│   │   └── components/
│   │       └── button.tsx
│   │
│   ├── components/                    ← [COMPANY] wrapper components
│   │   └── Button/
│   │       ├── Button.tsx             ← wrapper API
│   │       ├── Button.stories.tsx     ← Storybook stories
│   │       └── Button.test.tsx        ← unit tests
│   │
│   ├── utils/                         ← shared utility functions
│   │   ├── interaction/
│   │   │   ├── throttle.ts
│   │   │   ├── debounce.ts
│   │   │   ├── handle-outside-click.ts
│   │   │   ├── handle-escape-key.ts
│   │   │   ├── trap-focus.ts
│   │   │   └── copy-to-clipboard.ts
│   │   ├── formatting/
│   │   │   ├── format-date.ts
│   │   │   ├── format-relative-time.ts
│   │   │   ├── format-currency.ts
│   │   │   ├── format-number.ts
│   │   │   └── truncate.ts
│   │   ├── async/
│   │   │   ├── with-retry.ts
│   │   │   └── create-optimistic-update.ts
│   │   └── index.ts                   ← utils barrel export (separate entry point)
│   │
│   ├── hooks/                         ← DO NOT REGENERATE (bootstrapped by CLI)
│   │   ├── use-breakpoint.ts
│   │   └── use-clipboard.ts
│   │
│   └── index.ts                       ← main package entry — components only
│
├── styles/
│   ├── globals.css                    ← Tailwind imports + base utilities (from CLI — do not edit)
│   └── theme.css                      ← ALL [COMPANY] token overrides live here
│
└── .storybook/                        ← DO NOT REGENERATE (bootstrapped by CLI)
```

---

## Build Configuration

### Webpack (ESM output)

```js
// webpack.config.js — READ-ONLY, do not modify
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index:           './src/index.ts',
    'utils/index':   './src/utils/index.ts',
    'styles/theme':  './styles/theme.css',
    'styles/globals':'./styles/globals.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: { type: 'module' },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['@tailwindcss/postcss'],
          //     },
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
};
```

### Webpack (CJS output)

```js
// webpack.config.cjs.js — READ-ONLY, do not modify
// Identical to webpack.config.js except for output format.
// CSS is not re-emitted here — consumers use the ESM CSS files.
module.exports = {
  ...require('./webpack.config.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].cjs',
    library: { type: 'commonjs2' },
  },
  experiments: {},
  entry: {
    index:         './src/index.ts',
    'utils/index': './src/utils/index.ts',
  },
};
```

### PostCSS config

```js
// postcss.config.js — READ-ONLY, do not modify
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Type declarations

`tsc --emitDeclarationOnly` is run as a separate build step. It reads
`tsconfig.build.json` and emits `.d.ts` files into `dist/`.

```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true,
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.stories.tsx", "src/**/*.test.tsx"]
}
```

### package.json exports field

This must be kept in sync with the Webpack entry points. Do not add new
entry points without updating both `webpack.config.js` and this field.

```json
{
  "name": "@[company]/ui",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types":  "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils/index.js",
      "types":  "./dist/utils/index.d.ts"
    },
    "./styles": {
      "import":  "./dist/styles/globals.css"
    },
    "./theme": {
      "import":  "./dist/styles/theme.css"
    }
  }
}
```

Consumer usage:
```ts
import { Button } from '@[company]/ui';
import { debounce, formatCurrency } from '@[company]/ui/utils';
import '@[company]/ui/styles';   // once, in app root
```

### Build scripts

```json
"scripts": {
  "build":      "pnpm build:esm && pnpm build:types",
  "build:esm":  "webpack --config webpack.config.js",
  "build:types":"tsc --project tsconfig.build.json"
}
```

---

## Stage 1 — Figma Extraction (Parallel Sub-Agents)

Run one sub-agent per Figma frame **in parallel**. Each sub-agent writes independently
to `figma/frames/[frame-name].json`. Sub-agents do not wait for each other.

### What each sub-agent extracts

Every token value observable in the frame — do not filter or interpret at this stage:

**Colour tokens**
- All colour values (hex or rgb), mapped to their role: background, text, border, icon
- Brand, semantic (error/warning/success/info), neutral, and surface colours

**Typography tokens**
- Font family, font size, font weight, line height, letter spacing
- For every text style: display, heading (h1–h6), body, label, caption, code

**Spacing tokens**
- Padding and margin on every component and layout section
- Gap values in flex and grid layouts
- Base unit (infer from the smallest consistent spacing increment — e.g. 4px or 8px)

**Shape tokens**
- Border radius for every component type
- Border width and border colour

**Elevation tokens**
- Box shadow values with their context (card, modal, dropdown, tooltip)

**Grid and layout tokens**
- Column count, gutter width, margin width at each breakpoint
- Max content width

**Component states observed**
- For every component seen: list every state visible in the frame
  (default, hover, focus, active, disabled, loading, error, empty)

### Per-frame output schema

```jsonc
// figma/frames/[frame-name].json
{
  "frameName": "Dashboard",
  "figmaUrl": "https://figma.com/...",
  "tokens": {
    "color": {
      "brand": {
        "primary":      "rgb(127 86 217)",    // --color-brand-600 candidate
        "primaryHover": "rgb(105 65 198)"     // --color-brand-700 candidate
      },
      "text": {
        "primary":   "rgb(16 24 40)",
        "secondary": "rgb(71 84 103)"
      }
    },
    "typography": {
      "bodyMd": {
        "fontFamily":    "Inter",
        "fontSize":      "16px",
        "fontWeight":    "400",
        "lineHeight":    "24px",
        "letterSpacing": "0px"
      }
    },
    "spacing": {
      "baseUnit": "4px",
      "scale": ["0px","4px","8px","12px","16px","20px","24px","32px","40px","48px","64px","80px","96px"]
    },
    "radius": {
      "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px"
    },
    "shadow": {
      "card":  "0px 1px 3px rgba(16,24,40,0.1), 0px 1px 2px rgba(16,24,40,0.06)",
      "modal": "0px 20px 24px -4px rgba(16,24,40,0.08)"
    },
    "grid": {
      "columns": 12, "gutter": "24px", "margin": "32px", "maxWidth": "1280px"
    }
  },
  "components": {
    "Button": {
      "untitleduiName": "button",
      "available": true,
      "variants": ["primary", "secondary", "destructive", "ghost"],
      "sizes": ["sm", "md", "lg"],
      "states": ["default", "hover", "loading", "disabled"]
    }
  }
}
```

---

## Stage 2 — Merge Agent

Reads all `figma/frames/*.json` and produces three outputs.

### `figma/tokens.raw.json`
Union of all tokens. Consistent values are written as-is. Differing values are
written with all observed variants — the merge agent does not pick between them.

### `figma/conflicts.json`

**Hard stop:** If this file contains any entry with `"resolution": null`, the
transform agent must not proceed. Output the conflict list and wait for a human
to fill in resolutions before re-running.

```jsonc
{
  "conflicts": [
    {
      "token": "color.brand.primary",
      "type": "value-mismatch",
      "values": [
        { "value": "rgb(127 86 217)", "seenIn": ["Login", "Dashboard"] },
        { "value": "rgb(105 65 198)", "seenIn": ["Settings"] }
      ],
      "resolution": null    // human fills this in — do not proceed until resolved
    },
    {
      "token": "typography.bodyMd.lineHeight",
      "type": "value-mismatch",
      "values": [
        { "value": "24px", "seenIn": ["Dashboard"] },
        { "value": "20px", "seenIn": ["Login"] }
      ],
      "resolution": null
    },
    {
      "token": "color.surface.tooltip",
      "type": "unmapped-token",   // no matching Untitled UI CSS variable exists
      "values": [
        { "value": "rgb(12 17 29)", "seenIn": ["Dashboard"] }
      ],
      "resolution": null    // human decides: map to existing var, add new var, or drop
    }
  ]
}
```

## Stage 3 — Token Transform

Reads `figma/tokens.raw.json` (with all conflicts resolved) and writes the
`[COMPANY] brand overrides` block in `styles/theme.css`.

### Rules

- Write only into the `[COMPANY] brand overrides` block — never touch the base Untitled UI block
- Every value must map to a named Untitled UI CSS variable
- Use `rgb()` format for all colour values (consistent with Untitled UI convention)
- If a Figma token has no Untitled UI mapping, skip it and leave a comment noting it
- Do not re-emit the entire base token set — only override what differs

```css
/* styles/theme.css */

/* ─── Base Untitled UI tokens ── do not edit this block ─────────────────── */
@theme {
  /* ... full Untitled UI defaults ... */
}

/* ─── [COMPANY] brand overrides ── edit only this block ─────────────────── */
@theme {

  /* Fonts */
  --font-body:    "[COMPANY Font]", Inter, -apple-system, sans-serif;
  --font-display: "[COMPANY Font]", Inter, -apple-system, sans-serif;

  /* Brand colour ramp */
  --color-brand-25:  rgb(/* from tokens.raw.json */);
  --color-brand-50:  rgb(/* from tokens.raw.json */);
  --color-brand-100: rgb(/* from tokens.raw.json */);
  --color-brand-200: rgb(/* from tokens.raw.json */);
  --color-brand-300: rgb(/* from tokens.raw.json */);
  --color-brand-400: rgb(/* from tokens.raw.json */);
  --color-brand-500: rgb(/* from tokens.raw.json */);
  --color-brand-600: rgb(/* from tokens.raw.json */);  /* primary interactive */
  --color-brand-700: rgb(/* from tokens.raw.json */);  /* hover state */
  --color-brand-800: rgb(/* from tokens.raw.json */);
  --color-brand-900: rgb(/* from tokens.raw.json */);
  --color-brand-950: rgb(/* from tokens.raw.json */);

  /* Typography scale */
  --text-xs:          /* from tokens.raw.json */;
  --text-sm:          /* from tokens.raw.json */;
  --text-md:          /* from tokens.raw.json */;
  --text-lg:          /* from tokens.raw.json */;
  --text-xl:          /* from tokens.raw.json */;
  --text-display-xs:  /* from tokens.raw.json */;
  --text-display-sm:  /* from tokens.raw.json */;
  --text-display-md:  /* from tokens.raw.json */;
  --text-display-lg:  /* from tokens.raw.json */;

  /* Border radius */
  --radius-xs:  /* from tokens.raw.json */;
  --radius-sm:  /* from tokens.raw.json */;
  --radius-md:  /* from tokens.raw.json */;
  --radius-lg:  /* from tokens.raw.json */;
  --radius-xl:  /* from tokens.raw.json */;
  --radius-2xl: /* from tokens.raw.json */;

  /* Shadows */
  --shadow-xs: /* from tokens.raw.json */;
  --shadow-sm: /* from tokens.raw.json */;
  --shadow-md: /* from tokens.raw.json */;
  --shadow-lg: /* from tokens.raw.json */;
  --shadow-xl: /* from tokens.raw.json */;

  /* Layout */
  --max-width-container: /* from tokens.raw.json */;

  /* Semantic colours — only if Figma deviates from Untitled UI defaults */
  --color-error-600:   rgb(/* from tokens.raw.json */);
  --color-warning-600: rgb(/* from tokens.raw.json */);
  --color-success-600: rgb(/* from tokens.raw.json */);
}

/* Dark mode — only if dark mode frames were extracted */
@layer base {
  .dark-mode {
    --color-brand-600: rgb(/* dark value */);
    /* ... only tokens that differ in dark mode */
  }
}
```

---

## Stage 4 — Wrapper Generation

For each component in `component-map.json`, generate a wrapper in `src/components/`.

### Rules

- Import the Untitled UI component from `src/untitledui/components/[name]`
- Use `React.forwardRef` on every wrapper
- Named exports only — no default exports
- Use `cx()` from `../../untitledui/utils/cx` for all className merging
- Restrict prop types to only variants and sizes confirmed in Figma extraction
- Always spread remaining props onto the underlying component
- Never hardcode colour, spacing, or radius values — everything comes from tokens
- For components where `available: false`, build from scratch using token variables
  and the same `forwardRef` + `cx()` pattern. Flag clearly in pipeline status report

### Wrapper template

```tsx
// src/components/Button/Button.tsx
import * as React from 'react';
import { Button as UiButton } from '../../untitledui/components/button';
import type { ButtonProps as UiButtonProps } from '../../untitledui/components/button';
import { cx } from '../../untitledui/utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<UiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <UiButton
      ref={ref}
      variant={variant}
      size={size}
      className={cx(className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
```

### Main entry point

```ts
// src/index.ts
export { Button, type ButtonProps } from './components/Button/Button';
export { Input,  type InputProps  } from './components/Input/Input';
export { Modal,  type ModalProps  } from './components/Modal/Modal';
// one line per component
```

---

## Stage 5 — Utility Functions

All utilities live in `src/utils/` and export from `src/utils/index.ts` independently
of components. This separation means a future `@[company]/utils` package split requires
only a `package.json` change — no code restructuring.

### Interaction utilities

```ts
// throttle.ts
// Limits a function to at most one execution per `wait` ms.
// Use for: scroll handlers, resize listeners, real-time search inputs.
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void

// debounce.ts
// Delays execution until `wait` ms after the last call.
// Use for: search inputs, form autosave, window resize callbacks.
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void

// handle-outside-click.ts
// Calls handler when a mousedown occurs outside the given ref.
// Use for: dropdowns, popovers, context menus, inline editors.
// Returns a cleanup function — always call it in useEffect return.
export function handleOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
): () => void

// handle-escape-key.ts
// Calls handler when the Escape key is pressed.
// Use alongside handleOutsideClick for modals and drawers.
// Returns a cleanup function.
export function handleEscapeKey(
  handler: () => void
): () => void

// trap-focus.ts
// Constrains Tab/Shift+Tab within a container element.
// NOTE: Only use this for custom components. Untitled UI's Modal and Dialog
// primitives are built on React Aria which handles focus trapping natively.
// Use this only for components that bypass React Aria entirely.
// Returns a cleanup function.
export function trapFocus(
  containerRef: React.RefObject<HTMLElement>
): () => void

// copy-to-clipboard.ts
// Copies text to clipboard. Resolves to true on success, false on failure.
// Use with a transient "Copied!" UI state — do not rely on the boolean alone.
export function copyToClipboard(text: string): Promise<boolean>
```

### Formatting utilities

```ts
// format-date.ts
// Formats a Date or ISO string via Intl.DateTimeFormat.
export function formatDate(
  date: Date | string,
  format?: 'short' | 'medium' | 'long'
): string

// format-relative-time.ts
// Returns a relative string: "2 hours ago", "in 3 days".
// Use for: activity feeds, notifications, comment timestamps.
export function formatRelativeTime(date: Date | string): string

// format-currency.ts
// Locale-aware currency formatting via Intl.NumberFormat.
// Defaults to user locale and USD.
export function formatCurrency(
  amount: number,
  currency?: string,
  locale?: string
): string

// format-number.ts
// Locale-aware number formatting with optional compact notation.
// compact: true → "1.2M", "4.5K". Use for metric cards and dashboards.
export function formatNumber(
  value: number,
  options?: { compact?: boolean; decimals?: number; locale?: string }
): string

// truncate.ts
// Truncates to maxLength characters at a word boundary.
// Prevents words being cut in half unlike CSS text-overflow alone.
export function truncate(
  text: string,
  maxLength: number,
  suffix?: string   // defaults to '…'
): string
```

### Async utilities

```ts
// with-retry.ts
// Retries an async function up to maxAttempts times with exponential backoff.
// Use for: transient network failures, upload retries, flaky third-party calls.
export function withRetry<T>(
  fn: () => Promise<T>,
  options?: { maxAttempts?: number; baseDelayMs?: number }
): Promise<T>

// create-optimistic-update.ts
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
  currentValue: T;          // read this to bind to UI state
  isOptimistic: boolean;    // true while the async action is in flight
}
```

### Utils barrel export

```ts
// src/utils/index.ts
export { throttle }             from './interaction/throttle';
export { debounce }             from './interaction/debounce';
export { handleOutsideClick }   from './interaction/handle-outside-click';
export { handleEscapeKey }      from './interaction/handle-escape-key';
export { trapFocus }            from './interaction/trap-focus';
export { copyToClipboard }      from './interaction/copy-to-clipboard';
export { formatDate }           from './formatting/format-date';
export { formatRelativeTime }   from './formatting/format-relative-time';
export { formatCurrency }       from './formatting/format-currency';
export { formatNumber }         from './formatting/format-number';
export { truncate }             from './formatting/truncate';
export { withRetry }            from './async/with-retry';
export { createOptimisticUpdate } from './async/create-optimistic-update';
```

---

## Commands

| Task | Command |
|---|---|
| Install deps | `pnpm install` |
| Add Untitled UI component | `npx untitledui@latest add [name]` |
| Update Untitled UI component | `npx untitledui@latest add [name] --overwrite` |
| Full build | `pnpm build` |
| ESM build only | `pnpm build:esm` |
| Emit type declarations | `pnpm build:types` |
| Run tests | `pnpm test` |
| Type check (no emit) | `pnpm tsc --noEmit` |
| Run Storybook | `pnpm storybook` |
| Lint | `pnpm lint` |

Using `pnpm workspaces` until monorepo tool is confirmed.

---

## Agent Responsibilities

| Agent | Reads | Writes | Blocked by |
|---|---|---|---|
| `extract-frame.md` (×N, parallel) | Figma frame URL | `figma/frames/[frame].json` | — |
| `merge-tokens.md` | `figma/frames/*.json` | `figma/tokens.raw.json`, `figma/conflicts.json` | All extract agents complete |
| `transform-tokens.md` | `figma/tokens.raw.json` | `styles/theme.css` override block only | Any `resolution: null` in conflicts.json → **STOP** |
| `generate-wrappers.md` | `figma/component-map.json` | `src/components/*/[Name].tsx`, `src/index.ts` | transform-tokens complete |
| `generate-stories.md` | `figma/component-map.json`, component source | `src/components/*/[Name].stories.tsx` | generate-wrappers complete |
| `orchestrate.md` | All task files | Pipeline status report | — |

---

## What to Do When You're Unsure

**A Figma token has no matching Untitled UI CSS variable?**
Write it to `figma/conflicts.json` with `"type": "unmapped-token"`. Do not invent
new CSS variable names. A human decides whether to map it to an existing variable,
add a net-new variable, or drop it entirely.

**A component in the design is not in Untitled UI (`available: false`)?**
Build the wrapper from scratch using only token variables and the `forwardRef` + `cx()`
pattern. Document it clearly in the pipeline status report so humans know it exists.

**A wrapper needs structural additions not expressible as props?**
Flag it for human review. Do not edit anything in `src/untitledui/`. If the addition
genuinely cannot be done through the wrapper's prop interface, a human decides whether
it warrants a net-new component or a structural extension.

**A token value conflict is blocking progress?**
Do not estimate or guess. Write the conflict to `conflicts.json` and stop the pipeline.
Design decisions belong to humans, not agents.

---

## Files Agents Must Never Modify

- Anything inside `src/untitledui/` — vendor source, update via CLI only
- `webpack.config.js` and `webpack.config.cjs.js` — build config
- `postcss.config.js` — PostCSS pipeline config
- `components.json` — CLI install path config
- `styles/globals.css` — bootstrapped by CLI
- `.storybook/` — bootstrapped by CLI
- `src/hooks/` — bootstrapped by CLI

---

## Out of Scope for Agents

- Publishing to npm or any artifact registry (next project scope)
- GitHub Actions or CI/CD pipelines (next project scope)
- Making design decisions — surface conflicts, never resolve them silently
- Modifying the Webpack or PostCSS configurationx
