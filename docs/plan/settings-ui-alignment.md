# Plan: Align Settings Module UI with Tabler Settings Layout

## Goal
Make the Angular settings module layout match the Tabler HTML template at `http://localhost:99/tablerhtml/settings.html`.

## Target Layout Structure (from Tabler)
```
div.page-header.d-print-none
  div.container-xl
    h1.page-title "Account Settings"
main.page-body
  div.container-xl
    div.card
      div.row.g-0
        div.col-12.col-md-3.border-end [SIDEBAR]
          div.card-body
            h4.subheader "Group Name"
            nav.list-group.list-group-transparent
              a.list-group-item.list-group-item-action.d-flex.align-items-center.active
              a.list-group-item.list-group-item-action.d-flex.align-items-center
        div.col-12.col-md-9.d-flex.flex-column [CONTENT]
          div.card-body
            [page content - NO page-header inside]
          div.card-footer.bg-transparent.mt-auto
            [action buttons in btn-list.justify-content-end]
```

## Current vs Target Differences

| Aspect | Current | Target |
|--------|---------|--------|
| Page Header | Each page renders its own `page-header` | Single `page-header` at layout level only |
| Container | No `container-xl` wrapper | `container-xl` wraps card |
| Card Row | Separate `col-md-3` + `col-md-9` in `row.row-cards` | Single `card` with `row.g-0` (no gutters) |
| Sidebar | Icons on each item, custom group classes | `h4.subheader`, `list-group-transparent`, no icons |
| Content Area | Each page has its own page-header | Content directly in `card-body`, no page-header |
| Page Title | `h2.page-title` | `h1.page-title` |
| Form Footer | `.form-footer` class | `card-footer.bg-transparent.mt-auto` with `btn-list.justify-content-end` |
| Sidebar Column | `col-md-3` | `col-12.col-md-3.border-end` |
| Content Column | `col-md-9` | `col-12.col-md-9.d-flex.flex-column` |

## Files to Modify

### 1. Settings Layout (3 files)
- `settings-layout.component.html` — Restructure to Tabler pattern
- `settings-layout.component.scss` — Update sidebar styles
- `settings-layout.component.ts` — Update imports (remove TablerIconComponent since sidebar no longer has icons)

### 2. Page Components — Remove page-header (19 files)
Each of these currently renders its own `page-header` block. Remove the page-header from each and keep only the card/table content.

**List pages (external HTML):**
- `schedule-list.component.html`
- `hardware-list.component.html`
- `sensor-list.component.html`
- `location-list.component.html`
- `host-list.component.html`
- `token-list.component.html`
- `sms-list.component.html`
- `line-list.component.html`

**Config pages (inline templates):**
- `alarm-settings.component.ts`
- `mqtt-settings.component.ts`
- `email-settings.component.ts`
- `influxdb-settings.component.ts`
- `device-settings.component.ts`

**Other pages (external HTML):**
- `nodered-settings.component.html`
- `api-settings.component.html`

**Create/Edit pages (external HTML):**
- `schedule-create.component.html`
- `schedule-edit.component.html`
- `hardware-create.component.html`
- `hardware-edit.component.html`
- `sensor-create.component.html`
- `sensor-edit.component.html`
- `location-create.component.html`
- `location-edit.component.html`
- `host-create.component.html`
- `sms-create.component.html`
- `line-create.component.html`
- `token-create.component.html`

### 3. Shared Components (1 file)
- `settings-form-card.component.ts` — Update footer to use `card-footer.bg-transparent.mt-auto` pattern

## Implementation Steps

### Step 1: Update Settings Layout
Rewrite `settings-layout.component.html` to:
- Add `page-header` with `container-xl` and `h1.page-title`
- Wrap content in `main.page-body > container-xl > card > row.g-0`
- Sidebar: `col-12.col-md-3.border-end` with `card-body`, `h4.subheader` per group, `nav.list-group.list-group-transparent`
- Content: `col-12.col-md-9.d-flex.flex-column` with `router-outlet`
- Remove icons from sidebar items
- Update SCSS to match Tabler patterns (`.subheader`, `.list-group-transparent`, remove `.settings-menu-group` styles)

### Step 2: Remove page-header from all page components
For each page component:
- Remove the `<div class="page-header d-print-none">...</div>` block
- Remove the `<br>` after it
- Keep the card/table/form content
- The layout's page-header now handles the title

### Step 3: Update form footer pattern
For form pages (create/edit/config), change:
```html
<div class="form-footer">
  <button type="submit" class="btn btn-primary">Save</button>
</div>
```
To:
```html
<div class="card-footer bg-transparent mt-auto">
  <div class="btn-list justify-content-end">
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</div>
```

### Step 4: Update SettingsFormCardComponent
Update the footer projection slot to use `card-footer.bg-transparent.mt-auto` with `btn-list.justify-content-end`.

## Verification
- Run `ng build` to ensure no compilation errors
- Navigate to `/settings` and verify:
  - Single page header "Settings" at top
  - Sidebar with grouped navigation (no icons)
  - Content area with proper 3:9 split
  - Sidebar items highlight correctly on navigation
  - Forms have proper footer with aligned buttons
- Test responsive behavior (mobile: full-width sidebar, desktop: side-by-side)
