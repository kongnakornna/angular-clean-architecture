# Objective
- Make Layout Settings feature work and fix UI display issues after Sass migration cleanup.

## Important Details
- Build compiles successfully with zero Sass compilation errors
- `login.component.scss` cleaned from 248 lines (611kB) → 12 lines (~0.5kB): removed duplicate Tabler library import (already in global `styles.scss`), duplicate Tailwind directives, and 200+ lines of duplicated theme CSS
- `tabler-themes.scss` now imported in global build chain via `_core.scss` — Layout Settings `data-bs-theme-*` CSS rules generated correctly
- Budget restored to original 2kB/4kB — component size is well under limit
- Login lazy chunk reduced from 793 kB → 6.77 kB

## Work State
### Completed
- All `@import` → `@use`/`@forward` migration in `scss/` directory
- Added `tabler-themes.scss` to build chain — fixes Layout Settings not working
- Cleaned `login.component.scss`: removed all duplicated theme CSS, Tabler import, Tailwind directives
- Restored original budget in `angular.json`
- Build passes with zero errors

### Active
- (none)

### Blocked
- (none)

## Relevant Files
- `src/assets/tabler/scss/tabler-themes.scss`: Theme CSS rules for Layout Settings (migrated to `@use`)
- `src/assets/tabler/scss/_core.scss:5`: Added `@use 'tabler-themes'`
- `src/app/features/auth/presentation/pages/login/login.component.scss`: Cleaned to only login-specific styles
- `src/styles.scss`: Entry point — 6 lines
