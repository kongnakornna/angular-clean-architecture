# Auth UI Enhancement Report

## Objective
Improve login page visuals and internationalization:
- Center logo on auth layout
- Add language switcher (top-right) with all 10 project languages
- Make all Theme Builder controls i18n-aware

## Changes

### 1. Auth Layout (`auth-layout.component`)
- **Logo**: repositioned to center, uses `logo-light.png` / `logo-dark.png` based on theme
- **Language Selector**: `position-absolute top-0 end-0` with dropdown showing all 10 languages
- **Theme Builder**: wiring preserved via offcanvas; removed unused `TablerIconsModule` import

### 2. Language Selector (`language-selector.component`)
- **`SupportedLanguage`** expanded from `'th' | 'en'` to all 10: `en, th, zh, ja, ko, vi, ms, my, km, lo`
- **Flags**: loaded from `assets/flags/{us,th,cn,jp,kr,vn,my,mm,kh,la}.svg`
- **Switch**: calls `I18nService.loadLanguage()` on selection

### 3. Theme Builder (`theme-builder.component`)
- Added `AppTranslatePipe` to constructor
- Refactored `themes` and `fonts` arrays to include `labelKey` (e.g. `'layout.settings.theme.light'`)
- **All controls** wired to `appTranslate` pipe: labels, hints, dropdowns, titles, buttons
- Added `{{ 'layout.settings.reset' | appTranslate }}` and `{{ 'common.save' | appTranslate }}`

### 4. Cleanup
- Removed unused `TablerIconComponent` imports from:
  - `forgot-password.component.ts`
  - `reset-password.component.ts`
- Test files updated:
  - `theme-builder.component.spec.ts`: mock `TranslateService`
  - `auth-layout.component.spec.ts`: removed `provideTablerIcons`

## Verification
- `ng build` — **passed** (no errors)
- `ng test` — **201/201 SUCCESS**

## Files Modified
| File | Change |
|------|--------|
| `src/app/features/auth/presentation/layouts/auth-layout/auth-layout.component.html` | Logo center, lang top-right |
| `src/app/features/auth/presentation/layouts/auth-layout/auth-layout.component.ts` | Import `LanguageSelectorComponent`, remove `TablerIconsModule` |
| `src/app/features/auth/presentation/layouts/auth-layout/auth-layout.component.spec.ts` | Remove `provideTablerIcons` |
| `src/app/features/auth/presentation/components/theme-builder/theme-builder.component.html` | All labels via `appTranslate` pipe |
| `src/app/features/auth/presentation/components/theme-builder/theme-builder.component.ts` | Add `AppTranslatePipe`, `labelKey` on all controls |
| `src/app/features/auth/presentation/components/theme-builder/theme-builder.component.spec.ts` | Mock `TranslateService` |
| `src/app/shared/i18n/presentation/pages/language-selector/language-selector.component.ts` | 10 languages, dynamic flags |
| `src/app/shared/i18n/domain/entities/translation.entity.ts` | Expand `SupportedLanguage` |
| `src/app/features/auth/presentation/pages/forgot-password/forgot-password.component.ts` | Clean unused import |
| `src/app/features/auth/presentation/pages/reset-password/reset-password.component.ts` | Clean unused import |