# @go/ui

A React + Tailwind CSS component library built on [Untitled UI React](https://github.com/untitleduico/react), painted with the company brand. One package gives your app the full component set, the correct design tokens, and a suite of shared utility functions.

- **Components** — wrappers around Untitled UI primitives with restricted, Figma-confirmed prop contracts
- **Tokens** — brand colours, typography scale, shadows, and radii exposed as Tailwind utilities
- **Utils** — tree-shakeable helpers for interaction, formatting, and async UX patterns

---

## Table of contents

1. [Installation](#installation)
2. [CSS setup](#css-setup)
3. [Use cases](#use-cases)
   - [Forms](#1-forms)
   - [Confirmation dialogs](#2-confirmation-dialogs)
   - [Inline notifications](#3-inline-notifications)
   - [Selection flows](#4-selection-flows)
   - [Segmented controls](#5-segmented-controls)
   - [Data formatting](#6-data-formatting)
   - [Async UX patterns](#7-async-ux-patterns)
4. [Component reference](#component-reference)
5. [Utility reference](#utility-reference)
6. [Token system](#token-system)
   - [Always use Tailwind utilities — never `var(--...)`](#always-use-tailwind-utilities--never-var)
7. [Best practices](#best-practices)
8. [Registry integration](#registry-integration)

---

## Installation

```bash
pnpm add @go/ui
# or
npm install @go/ui
# or
yarn add @go/ui
```

Peer dependencies — your app must already have these:

```bash
pnpm add react react-dom react-aria-components
```

---

## CSS setup

**This step is required.** Import the design system styles in your app's CSS entry point — not via a JS import. This makes the brand tokens available to your own Tailwind build so that all `text-brand-*`, `bg-brand-*`, and related utilities work everywhere in your app.

```css
/* app/globals.css  (or wherever your Tailwind entry lives) */
@import "tailwindcss";
@import "@go/ui/styles";
```

If you only need the brand token overrides without the full Tailwind base (e.g. you already import Tailwind separately):

```css
@import "tailwindcss";
@import "@go/ui/theme";   /* brand tokens only */
```

Once imported, every brand token is available as a Tailwind utility in your app:

| Token | Utilities generated |
|---|---|
| `--color-brand-600` | `text-brand-600` · `bg-brand-600` · `border-brand-600` |
| `--color-brand-700` | `text-brand-700` · `bg-brand-700` · `border-brand-700` |
| `--shadow-md` | `shadow-md` |
| `--radius-xl` | `rounded-xl` |
| `--text-display-sm` | `text-display-sm` |

---

## Use cases

### 1. Forms

Compose `Input`, `Checkbox`, `Button`, and `Typography` to build consistent form UI.

```tsx
import { Button, Checkbox, Input, Typography } from '@go/ui';

export function LoginForm() {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Typography as="label" variant="label-md" htmlFor="email">
          Email address
        </Typography>
        <Input
          id="email"
          type="email"
          placeholder="you@go.com"
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Typography as="label" variant="label-md" htmlFor="password">
          Password
        </Typography>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <Checkbox>Remember me for 30 days</Checkbox>

      <Button type="submit" variant="brand-solid" size="md">
        Sign in
      </Button>

      <Button type="button" variant="secondary" size="md">
        Create account
      </Button>
    </form>
  );
}
```

**Best practice:** Always pair `Input` with a `Typography` label using `as="label"` and matching `htmlFor`/`id` — the Untitled UI primitives do not inject labels automatically.

---

### 2. Confirmation dialogs

Use `Modal`, `ModalTrigger`, `Button`, and `Typography` together. `ModalTrigger` is a re-export of React Aria's `DialogTrigger` — any element inside it that has `slot="trigger"` opens the dialog.

```tsx
import { Button, Modal, ModalTrigger, Typography } from '@go/ui';

export function DeleteAccountModal() {
  return (
    <ModalTrigger>
      <Button variant="secondary" size="md" slot="trigger">
        Delete account
      </Button>

      <Modal maxWidth="480px">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Delete your account?</Typography>
            <Typography variant="body-sm" color="secondary">
              This action is permanent and cannot be undone. All your data
              will be removed immediately.
            </Typography>
          </div>

          <div className="flex justify-end gap-3">
            {/* Closing a modal: use the ARIA close button pattern */}
            <Button variant="secondary" size="md">Cancel</Button>
            <Button variant="brand-solid" size="md">Delete account</Button>
          </div>
        </div>
      </Modal>
    </ModalTrigger>
  );
}
```

**Best practice:** Pass `maxWidth` to `Modal` to match the Figma frame width. The default is `544px` (standard confirmation size). Focus trapping and scroll locking are handled by React Aria — do not add `trapFocus` manually here.

---

### 3. Inline notifications

`Notification` is a standalone banner component. Pass an `icon`, `title`, `description`, and optionally an `action` link.

```tsx
import { Notification } from '@go/ui';
import { AlertTriangle } from '@untitledui/icons';

export function StorageBanner() {
  return (
    <Notification
      variant="warning"
      icon={<AlertTriangle size={20} />}
      title="Storage almost full"
      description="You've used 90% of your 5 GB. Upgrade your plan to avoid service interruption."
      action={
        <a href="/settings/billing" className="underline underline-offset-2">
          Upgrade plan
        </a>
      }
    />
  );
}
```

Conditionally showing a notification:

```tsx
export function SyncStatus({ hasSyncError }: { hasSyncError: boolean }) {
  if (!hasSyncError) return null;

  return (
    <Notification
      variant="warning"
      title="Sync failed"
      description="Changes made in the last 5 minutes haven't been saved."
      action={<button onClick={retrySync}>Retry now</button>}
    />
  );
}
```

---

### 4. Selection flows

`SelectionCard` and `SelectionCardGrid` are designed for multi-step onboarding and configuration screens where users choose between options.

```tsx
import { useState } from 'react';
import { Button, SelectionCard, SelectionCardGrid, Typography } from '@go/ui';
import { BuildingIcon, PersonIcon, TeamIcon } from '@untitledui/icons';

type AccountType = 'individual' | 'team' | 'enterprise';

const options: Array<{
  value: AccountType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}> = [
  { value: 'individual', icon: <PersonIcon />,   title: 'Individual',  subtitle: 'Just me, working solo' },
  { value: 'team',       icon: <TeamIcon />,     title: 'Team',        subtitle: 'A group of up to 25 people' },
  { value: 'enterprise', icon: <BuildingIcon />, title: 'Enterprise',  subtitle: 'Large organisation with SSO' },
];

export function AccountTypeStep() {
  const [selected, setSelected] = useState<AccountType | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h2">What describes you best?</Typography>
        <Typography variant="body-md" color="secondary">
          We'll tailor your experience based on your selection.
        </Typography>
      </div>

      <SelectionCardGrid>
        {options.map(({ value, icon, title, subtitle }) => (
          <SelectionCard
            key={value}
            icon={icon}
            title={title}
            subtitle={subtitle}
            variant={selected === value ? 'selected' : 'default'}
            onClick={() => setSelected(value)}
          />
        ))}
      </SelectionCardGrid>

      <Button
        variant="brand-solid"
        size="md"
        disabled={selected === null}
        className="self-end"
      >
        Continue
      </Button>
    </div>
  );
}
```

The `highlighted` variant is intended for a pre-recommended option (e.g. most popular plan). Use it alongside `selected` to communicate a recommendation before the user interacts:

```tsx
<SelectionCard
  variant={selected === 'team' ? 'selected' : 'highlighted'}
  title="Team"
  subtitle="Recommended for most companies"
  onClick={() => setSelected('team')}
/>
```

---

### 5. Segmented controls

`ButtonGroup` and `ButtonGroupItem` implement a toggle group (single or multiple selection) using React Aria's `ToggleButtonGroup`. Keyboard navigation and ARIA roles are handled automatically.

```tsx
import { ButtonGroup, ButtonGroupItem } from '@go/ui';

// Single-select — e.g. chart time range
export function TimeRangePicker() {
  return (
    <ButtonGroup selectionMode="single" defaultSelectedKeys={['7d']}>
      <ButtonGroupItem id="24h">24h</ButtonGroupItem>
      <ButtonGroupItem id="7d">7 days</ButtonGroupItem>
      <ButtonGroupItem id="30d">30 days</ButtonGroupItem>
      <ButtonGroupItem id="90d">90 days</ButtonGroupItem>
    </ButtonGroup>
  );
}

// Multi-select — e.g. filter tags
export function StatusFilter() {
  return (
    <ButtonGroup selectionMode="multiple">
      <ButtonGroupItem id="active">Active</ButtonGroupItem>
      <ButtonGroupItem id="pending">Pending</ButtonGroupItem>
      <ButtonGroupItem id="archived">Archived</ButtonGroupItem>
    </ButtonGroup>
  );
}
```

Controlled selection with `onSelectionChange`:

```tsx
import { useState } from 'react';
import type { Selection } from 'react-aria-components';

export function ViewToggle() {
  const [view, setView] = useState<Selection>(new Set(['list']));

  return (
    <ButtonGroup
      selectionMode="single"
      selectedKeys={view}
      onSelectionChange={setView}
    >
      <ButtonGroupItem id="list">List</ButtonGroupItem>
      <ButtonGroupItem id="grid">Grid</ButtonGroupItem>
      <ButtonGroupItem id="kanban">Kanban</ButtonGroupItem>
    </ButtonGroup>
  );
}
```

---

### 6. Data formatting

The `/utils` entry point exports locale-aware formatting helpers. Import them independently — they are tree-shakeable and add no component code to your bundle.

```tsx
import { formatCurrency, formatDate, formatNumber, formatRelativeTime, truncate } from '@go/ui/utils';

// Currency — respects locale by default, USD fallback
formatCurrency(4999.5);                          // "$4,999.50"
formatCurrency(1250, 'EUR', 'de-DE');            // "1.250,00 €"

// Numbers with compact notation for metric cards
formatNumber(1_420_000, { compact: true });      // "1.4M"
formatNumber(4500, { compact: true });           // "4.5K"
formatNumber(3.14159, { decimals: 2 });          // "3.14"

// Dates
formatDate(new Date(), 'short');                 // "Feb 24, 2026"
formatDate('2025-01-15', 'long');                // "January 15, 2025"

// Relative time for activity feeds and timestamps
formatRelativeTime(new Date(Date.now() - 90_000));   // "2 minutes ago"
formatRelativeTime(new Date(Date.now() + 86_400_000)); // "in 1 day"

// Truncate at word boundary
truncate('The quick brown fox jumped over the lazy dog', 30);
// → "The quick brown fox jumped…"
```

Using in a component:

```tsx
import { Typography } from '@go/ui';
import { formatCurrency, formatRelativeTime } from '@go/ui/utils';

export function InvoiceRow({ amount, date }: { amount: number; date: string }) {
  return (
    <div className="flex items-center justify-between">
      <Typography variant="body-sm" color="secondary">
        {formatRelativeTime(date)}
      </Typography>
      <Typography variant="label-md">
        {formatCurrency(amount)}
      </Typography>
    </div>
  );
}
```

---

### 7. Async UX patterns

#### Optimistic updates

`createOptimisticUpdate` applies a value immediately and rolls back if the async action fails. Useful for toggles, likes, and inline edits where you want instant feedback.

```tsx
import { useState } from 'react';
import { createOptimisticUpdate } from '@go/ui/utils';
import { Checkbox } from '@go/ui';

export function TaskItem({ id, completed }: { id: string; completed: boolean }) {
  const [isDone, setIsDone] = useState(completed);

  const toggle = () => {
    const update = createOptimisticUpdate({
      currentValue: isDone,
      optimisticValue: !isDone,
      action: () => api.updateTask(id, { completed: !isDone }),
      onSuccess: (confirmed) => setIsDone(confirmed),
      onError:   (_err, rolledBack) => setIsDone(rolledBack),
    });
    setIsDone(update.optimisticValue);
    update.apply();
  };

  return (
    <Checkbox isSelected={isDone} onChange={toggle}>
      Mark complete
    </Checkbox>
  );
}
```

#### Retry on failure

`withRetry` wraps any async function with exponential backoff. Use it for uploads, flaky API calls, or any transient network operation.

```tsx
import { withRetry } from '@go/ui/utils';

// Retry up to 4 times, starting at 500 ms
const result = await withRetry(
  () => fetch('/api/sync').then(r => r.json()),
  { maxAttempts: 4, baseDelayMs: 500 },
);
```

#### Debounce and throttle

```tsx
import { useCallback } from 'react';
import { debounce, throttle } from '@go/ui/utils';
import { Input } from '@go/ui';

export function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  // Fire at most once per 300 ms after the user stops typing
  const handleChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    }, 300),
    [onSearch],
  );

  return <Input placeholder="Search…" onChange={handleChange} />;
}
```

---

## Component reference

| Component | Variants | Sizes | Notes |
|---|---|---|---|
| `Typography` | `h1`–`h6`, `body-lg/md/sm/xs`, `label-md/sm` | — | `color`, `weight`, `as` props available |
| `Button` | `brand-solid`, `secondary` | `sm`, `md` | Wraps Untitled UI Button |
| `Input` | — | `md` | Wraps Untitled UI Input |
| `Textarea` | — | `md` | Wraps Untitled UI Textarea |
| `Checkbox` | — | `sm` | React Aria-powered; supports `label` and `hint` props |
| `ButtonGroup` | — | `md` | Single or multiple `selectionMode` |
| `ButtonGroupItem` | — | — | Used inside `ButtonGroup` |
| `Modal` | `confirmation` | `standard` | `maxWidth` prop, focus trap built in |
| `ModalTrigger` | — | — | Re-export of React Aria `DialogTrigger` |
| `Badge` | `blue-light` | `sm` | Built from scratch; pill shape |
| `Notification` | `warning` | — | `icon`, `title`, `description`, `action` slots |
| `SelectionCard` | `default`, `selected`, `highlighted` | `standard`, `compact` | `aria-pressed` managed automatically |
| `SelectionCardGrid` | — | — | 3-column grid wrapper for `SelectionCard` |

---

## Utility reference

### Interaction

| Function | Signature | Use for |
|---|---|---|
| `debounce` | `(fn, wait) => fn` | Search inputs, autosave |
| `throttle` | `(fn, wait) => fn` | Scroll/resize handlers |
| `handleOutsideClick` | `(ref, handler) => cleanup` | Dropdowns, popovers |
| `handleEscapeKey` | `(handler) => cleanup` | Modals, drawers |
| `trapFocus` | `(ref) => cleanup` | Custom components that bypass React Aria |
| `copyToClipboard` | `(text) => Promise<boolean>` | Copy-to-clipboard buttons |

`handleOutsideClick`, `handleEscapeKey`, and `trapFocus` return cleanup functions — always call them in a `useEffect` return:

```ts
useEffect(() => {
  const cleanup = handleOutsideClick(ref, () => setOpen(false));
  return cleanup;
}, []);
```

### Formatting

| Function | Signature | Returns |
|---|---|---|
| `formatDate` | `(date, format?)` | `"Feb 24, 2026"` |
| `formatRelativeTime` | `(date)` | `"3 hours ago"` |
| `formatCurrency` | `(amount, currency?, locale?)` | `"$1,234.56"` |
| `formatNumber` | `(value, options?)` | `"1.2M"` / `"4,500"` |
| `truncate` | `(text, maxLength, suffix?)` | `"Hello wor…"` |

### Async

| Function | Signature | Returns |
|---|---|---|
| `withRetry` | `(fn, options?)` | `Promise<T>` |
| `createOptimisticUpdate` | `(options)` | `{ apply, currentValue, isOptimistic }` |

---

## Token system

All brand tokens are defined in `styles/theme.css` as Tailwind v4 `@theme` variables. After [setting up the CSS import](#css-setup), these are available as Tailwind utilities in your app.

### Always use Tailwind utilities — never `var(--...)`

Every token in this design system is consumed through a Tailwind class. **Do not reference CSS variables directly** — they are an implementation detail, not a public API.

```tsx
// WRONG — bypasses Tailwind's JIT, breaks purging, no IDE autocomplete
<div style={{ color: 'var(--color-brand-600)' }}>...</div>
<div style={{ backgroundColor: 'var(--color-brand-50)' }}>...</div>

// WRONG — same problem, slightly different syntax
<div className="[color:var(--color-brand-600)]">...</div>

// CORRECT — use the Tailwind utility class
<div className="text-brand-600">...</div>
<div className="bg-brand-50">...</div>
```

The mapping is straightforward: `--color-brand-600` → `text-brand-600` / `bg-brand-600` / `border-brand-600`. Every `--color-*` token becomes `text-*`, `bg-*`, and `border-*` utilities. Every `--shadow-*` token becomes `shadow-*`. Every `--radius-*` token becomes `rounded-*`.

```tsx
// Token → Tailwind class  (the full pattern)
--color-brand-50   →  text-brand-50    bg-brand-50    border-brand-50
--color-brand-600  →  text-brand-600   bg-brand-600   border-brand-600
--color-brand-700  →  text-brand-700   bg-brand-700   border-brand-700
--shadow-md        →  shadow-md
--radius-xl        →  rounded-xl
--text-display-sm  →  text-display-sm
```

This approach ensures classes are statically analysable by Tailwind's compiler, participates correctly in dead-code elimination, and gives you full IDE autocomplete when IntelliSense is configured (see [Registry integration](#registry-integration)).

### Colours

```
text-brand-600    bg-brand-600    border-brand-600   (primary interactive)
text-brand-700    bg-brand-700    border-brand-700   (hover state)
text-brand-25     bg-brand-25                        (light tint background)
text-brand-100    bg-brand-100                       (brand primary bg)
text-brand-200    bg-brand-200
text-brand-300    bg-brand-300

text-blue-light-50    bg-blue-light-50
text-blue-light-200   bg-blue-light-200
text-blue-light-700   bg-blue-light-700
```

### Typography

```
text-xs          (12px / lh 1.5)
text-sm          (14px)
text-md          (16px / lh 1.5)   ← Untitled UI addition, not in Tailwind base
text-lg          (18px)
text-xl          (20px)
text-display-xs  (24px / lh 32px)
text-display-sm  (30px / lh 38px)
```

### Radii

```
rounded-xs    (4px)
rounded-md    (8px)
rounded-xl    (12px)
rounded-2xl   (16px)
rounded-full  (9999px)
```

### Shadows

```
shadow-xs               (subtle, 1px)
shadow-xs-skeuomorphic  (button depth effect)
shadow-md               (notifications, cards)
shadow-xl               (modals)
```

---

## Best practices

**Use semantic colour props before Tailwind classes.** `Typography` has a `color` prop (`primary`, `secondary`, `tertiary`, `quaternary`) that maps to the correct text token. Reach for `className="text-brand-700"` only when the design intentionally deviates from the semantic scale.

```tsx
// Preferred
<Typography variant="body-md" color="secondary">Supporting text</Typography>

// Use only when the design explicitly calls for brand colour on body text
<Typography variant="body-md" className="text-brand-700">Brand-tinted text</Typography>
```

**Never use `style={{ color: "var(--color-brand-700)" }}`**. After importing the CSS with `@import`, the equivalent Tailwind utility `text-brand-700` is available everywhere and participates in Tailwind's JIT purging correctly.

**Respect prop boundaries.** Each component only accepts variants and sizes confirmed in the Figma extraction. If you need a variant that doesn't exist, open a request rather than extending locally — undocumented variants break silently on the next design system update.

**Keep the `as` prop for semantic HTML, not visual overrides.** `Typography`'s `as` prop exists for SEO and accessibility (e.g. rendering an `h1`-sized `<span>` inside a section that already has an `<h1>`). Use it to fix heading hierarchy, not to change visual size.

```tsx
// Correct — visual h1 size but correct semantic level in a nested section
<Typography variant="h1" as="h2">Section title</Typography>
```

**Import utils from the separate entry point.** Importing from `@go/ui/utils` rather than `@go/ui` ensures the utility bundle is split from the component bundle, keeping your component chunk lean.

```ts
// Correct — separate bundle
import { formatCurrency } from '@go/ui/utils';

// Wrong — pulls in the entire component bundle
import { formatCurrency } from '@go/ui';
```

**Clean up interaction utilities.** `handleOutsideClick`, `handleEscapeKey`, and `trapFocus` attach DOM event listeners and return cleanup functions. Always call the cleanup in `useEffect`'s return to prevent listener leaks.

---

## Registry integration

These notes apply once the package is published to an npm-compatible registry.

### Publishing

The package exports ESM only. There is no CJS output. Ensure your registry and any bundler pipeline support ES modules.

```json
{
  "name": "@go/ui",
  "type": "module",
  "exports": {
    ".":         { "import": "./dist/index.js",       "types": "./dist/index.d.ts" },
    "./utils":   { "import": "./dist/utils/index.js", "types": "./dist/utils/index.d.ts" },
    "./styles":  { "import": "./dist/styles/globals.css" },
    "./theme":   { "import": "./dist/styles/theme.css" }
  }
}
```

Build before publishing:

```bash
pnpm build       # compiles ESM + emits .d.ts declarations
```

### Consuming app setup

1. **Install the package and peer dependencies**

   ```bash
   pnpm add @go/ui react react-dom react-aria-components
   ```

2. **Import styles in your CSS entry point** (see [CSS setup](#css-setup))

   ```css
   @import "tailwindcss";
   @import "@go/ui/styles";
   ```

3. **Configure Tailwind to scan the package source** (optional but recommended for IDE autocomplete)

   In Tailwind v4, add a `@source` directive so your editor's Tailwind IntelliSense plugin picks up class names used inside the design system:

   ```css
   @import "tailwindcss";
   @import "@go/ui/styles";
   @source "../node_modules/@go/ui/dist";
   ```

4. **Use components and utilities**

   ```tsx
   import { Button, Typography } from '@go/ui';
   import { formatCurrency } from '@go/ui/utils';
   import '@go/ui/styles';  // if using JS import rather than CSS @import
   ```

### Next.js

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@go/ui'],
};

export default nextConfig;
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@go/ui/styles";
```

### Webpack

No extra config needed — Webpack handles ESM packages natively. Just ensure `@import "@go/ui/styles"` is in your CSS entry point.

### TypeScript path resolution

If you use `paths` in `tsconfig.json`, the package exports field takes precedence in bundler mode. No additional TypeScript config is needed for `moduleResolution: "bundler"` (the default for Webpack and Next.js 14+).

For `moduleResolution: "node16"` or `"nodenext"`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

