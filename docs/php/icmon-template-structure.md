# iCmon Template Structure

> Source: `C:\xampp\htdocs\icmon\application\views\template\`

---

## Folder & File Tree

```
views/template/
│
├── TEMPLATE ORCHESTRATORS
│   ├── template.php              # Horizontal layout (Tabler default)
│   ├── template1.php             # Minimal — content only, no header/footer
│   ├── template2.php             # Minimal — content only, no header/footer
│   ├── template3.php             # Minimal — content only, no header/footer
│   ├── templateiot.php           # IoT horizontal layout
│   ├── templater1.php            # R1 horizontal layout
│   ├── templatevertical.php      # Vertical sidebar layout v1
│   ├── templatevertical2.php     # Vertical sidebar layout v2
│   ├── templatevertical3.php     # Vertical sidebar layout v3
│   ├── templatevertical4.php     # Vertical sidebar layout v4 (IoT)
│   └── iframe.php                # Iframe layout (dark theme)
│
├── HEADERS (DOCTYPE + <head>)
│   ├── header.php                # Standard header → loads navbar.php
│   ├── header_vertical.php       # Vertical header → loads navbar_vertical.php
│   ├── header_vertical2.php      # Vertical v2 → loads navbar_vertical-l2.php
│   ├── header_vertical3.php      # Vertical v3 → loads navbar_vertical-l3.php
│   ├── headeriot.php             # IoT header → loads navbariot.php
│   ├── headeriframe.php          # Iframe header (dark) — no navbar
│   └── headerr1.php              # R1 header → loads navbar_r1.php
│
├── NAVBARS (<body> opening, nav bar, sidebar)
│   ├── navbar.php                # Horizontal top navbar
│   ├── navbariot.php             # Horizontal IoT navbar
│   ├── navbar_r1.php             # R1 navbar
│   ├── navbar_vertical.php       # Vertical sidebar v1
│   ├── navbar_vertical-l2.php    # Vertical sidebar v2
│   ├── navbar_vertical-l3.php    # Vertical sidebar v3
│   ├── navbar_app.php
│   ├── navbar_changetheme.php
│   ├── navbar_demo.php
│   ├── navbar_iot.php
│   ├── navbar_item.php           # Right-side nav items
│   ├── navbar_lang.php
│   ├── navbar_pagewrapper.php
│   ├── navbar_theme.php
│   ├── navbar_usecases.php
│   │
│   ├── NAVBAR MENUS
│   │   ├── navbar_menu.php
│   │   ├── navbar_menu2.php
│   │   ├── navbar_menu_admin.php
│   │   ├── navbar_menu_dashboard.php
│   │   ├── navbar_menu_enduser.php
│   │   ├── navbar_menu_help.php
│   │   ├── navbar_menu_iot.php
│   │   ├── navbar_menu_iot_industry.php
│   │   ├── navbar_menu_iot_irrigation.php
│   │   ├── navbar_menu_iot_monitorring.php
│   │   ├── navbar_menu_iot_monitorring1.php
│   │   ├── navbar_menu_iot_smartcity.php
│   │   ├── navbar_menu_iot_smarthome.php
│   │   ├── navbar_menu_log.php
│   │   ├── navbar_menu_main.php
│   │   ├── navbar_menu_monitoring.php
│   │   ├── navbar_menu_org.php
│   │   ├── navbar_menu_other.php
│   │   ├── navbar_menu_report.php
│   │   ├── navbar_menu_setting.php
│   │   ├── navbar_menu_setting_admin.php
│   │   ├── navbar_menu_setting_dev.php
│   │   ├── navbar_menu_setting_enduser.php
│   │   ├── navbar_menu_setting_user.php
│   │   ├── navbar_menu_setting_vertical.php
│   │   ├── navbar_menu_smartbuilding.php
│   │   ├── navbar_menu_smarthome.php
│   │   ├── navbar_menu_superadmin.php
│   │   ├── navbar_menu_user.php
│   │   ├── navbar_menu_user_admin.php
│   │   ├── navbar_menu_user_dev.php
│   │   ├── _navbar_menu1.php
│   │   └── _navbar_menu_monitoring.php
│   │
│   └── NAVBAR NOTIFICATIONS
│       ├── navbar_notifications.php
│       ├── navbar_notifications_air.php
│       ├── navbar_notifications_all.php
│       └── navbar_notifications_tab.php
│
├── PAGE WRAPPERS
│   ├── pagewrapper_dasdboard.php
│   ├── pagewrapper_dasdboard_iot.php
│   ├── pagewrapper_seeting.php
│   ├── pagewrapper_seetingr1.php
│   └── pagewrapper_seeting_vertical.php
│
├── FOOTERS (closing tags, scripts)
│   ├── footer.php                # Full footer + Theme Builder
│   ├── footer_vertical.php       # Same as footer.php
│   ├── footer_vertical2.php      # Simplified footer (no links), Theme Builder commented
│   ├── footer_vertical3.php      # Same as footer.php
│   ├── footer_vertical3m.php     # Same as footer.php
│   ├── footer_vertical4.php      # Simplified footer, Theme Builder active
│   ├── footer_vertical4m.php     # Simplified footer, Theme Builder active
│   ├── footeriot.php             # Simplified footer, Theme Builder active
│   ├── footeriframe.php          # No footer HTML, only scripts
│   └── footerr1.php              # Same as footer.php
│
├── THEME
│   ├── theme_builder.php
│   ├── theme_search.php
│   ├── theme_setting.php
│   └── theme_setting_iot.php
│
├── OTHER
│   ├── main_content.php          # Placeholder — content: "NA"
│   └── iframe.php                # Orchestrator for iframe layout
```

---

## Template Flow (Orchestration)

### template.php (Standard Horizontal)

```
header.php
  ├── DOCTYPE + <html> + <head> (CSS links)
  ├── <script> jQuery + SweetAlert2 (BEFORE DOCTYPE — potential issue)
  └── navbar.php
        ├── <body class="layout-{type}">
        ├── <script> tabler-theme.js
        ├── <div class="page">
        │     ├── <header class="navbar navbar-expand-md d-print-none">
        │     └── </header>
        └── (page content area)

  ┌─ [optional] pagewrapper_seeting.php
  ├─ DYNAMIC CONTENT VIEW ($content_view)
  └─ footer.php
        ├── </div> <!-- .page -->
        ├── <footer class="footer footer-transparent d-print-none">
        ├── <div class="settings">Theme Builder</div>
        ├── <script> tabler.js (defer)
        ├── <script> demo.js (defer)
        ├── theme_builder.php
        └── </body> + </html>
```

### templatevertical.php (Vertical Sidebar)

```
header_vertical.php
  ├── DOCTYPE + <html> + <head> (same CSS)
  └── navbar_vertical.php
        ├── <div class="page">
        │     ├── <aside class="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">
        │     └── <div class="page-wrapper">
        │           ├── <body class="layout-fluid"> (⚠ nested body — non-standard)
        │           └── ...content...

  ┌─ [optional] pagewrapper_seeting_vertical.php
  ├─ pagewrapper_dasdboard.php
  ├─ DYNAMIC CONTENT VIEW ($content_view)
  └─ footer_vertical.php (same as footer.php)
```

### templatevertical3.php (No Footer)

```
header_vertical3.php
  └── navbar_vertical-l3.php
        └── ...content only... (NO FOOTER loaded)
```

### iframe.php (Dark Iframe)

```
headeriframe.php
  ├── <html data-bs-theme="dark">  ← only variant with this
  └── (no navbar loaded)

  ├─ DYNAMIC CONTENT VIEW ($content_view)
  └─ footeriframe.php (no footer HTML, only scripts)
```

---

## Full Rendered HTML Structure

```html
<!doctype html>
<html lang="...">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>...</title>
    <link rel="shortcut icon" href="assets/favicon.ico" />

    <!-- PAGE LEVEL STYLES -->
    <link href="assets/libs/jsvectormap/dist/jsvectormap.css" rel="stylesheet" />

    <!-- GLOBAL MANDATORY STYLES -->
    <link href="assets/dist/css/tabler.css" rel="stylesheet" />

    <!-- PLUGINS STYLES -->
    <link href="assets/dist/css/tabler-flags.css" rel="stylesheet" />
    <link href="assets/dist/css/tabler-socials.css" rel="stylesheet" />
    <link href="assets/dist/css/tabler-payments.css" rel="stylesheet" />
    <link href="assets/dist/css/tabler-vendors.css" rel="stylesheet" />
    <link href="assets/dist/css/tabler-marketing.css" rel="stylesheet" />
    <link href="assets/dist/css/tabler-themes.css" rel="stylesheet" />

    <!-- DEMO STYLES -->
    <link href="assets/preview/css/demo.css" rel="stylesheet" />

    <!-- CUSTOM FONT -->
    <style>
        @import url('assets/inter/inter.css');
    </style>
</head>

<body class="layout-fluid">  <!-- or layout-boxed, or none -->
    <script src="assets/dist/js/tabler-theme.js"></script>

    <div class="page">

        <!-- ====== TOP NAVBAR ====== -->
        <header class="navbar navbar-expand-md d-print-none">
            <div class="container-xl">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbar-menu" aria-controls="navbar-menu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                         class="navbar-brand-image" />
                    <div id="button"></div>
                </div>

                <div class="navbar-nav flex-row order-md-last">
                    <!-- navbar_item.php -->
                    <div class="d-none d-md-flex">
                        <!-- navbar_notifications_air.php / navbar_notifications_all.php -->
                        <!-- navbar_theme.php -->
                        <!-- navbar_lang.php -->
                    </div>
                    <!-- User dropdown -->
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            <span class="avatar avatar-sm"
                                  style="background-image: url(assets/img/cmon.png)"></span>
                            <div class="d-none d-xl-block ps-2">
                                <div>username</div>
                                <div class="mt-1 small text-secondary">Cmon user</div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="dashboard" class="dropdown-item">Overview</a>
                            <a href="user/profile" class="dropdown-item">Profile</a>
                            <a href="log/history" class="dropdown-item">History log</a>
                            <div class="dropdown-divider"></div>
                            <a href="settings" class="dropdown-item">Settings</a>
                            <a href="user/logout" class="dropdown-item" id="logout-link">Logout</a>
                            <div class="dropdown-divider"></div>
                            <a href="lang/language?lang=english" class="dropdown-item">English</a>
                            <a href="lang/language?lang=thai" class="dropdown-item">Thai</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- ====== OPTIONAL PAGE WRAPPER ====== -->
        <!-- pagewrapper_seeting.php (conditional) -->

        <!-- ====== DYNAMIC CONTENT ====== -->
        <!-- $content_view -->

        <!-- ====== FOOTER ====== -->
        <footer class="footer footer-transparent d-print-none">
            <div class="container-xl">
                <div class="row text-center align-items-center flex-row-reverse">
                    <div class="col-lg-auto ms-lg-auto">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item">
                                <a href="about#manual" class="link-secondary">Documentation</a>
                            </li>
                            <li class="list-inline-item">
                                <a href="about#license" class="link-secondary">License</a>
                            </li>
                            <li class="list-inline-item">
                                <a href="about#manual" class="link-secondary">
                                    <svg class="icon text-pink icon-inline icon-4"><!-- heart icon --></svg>
                                    iCmon IoT
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                        <ul class="list-inline list-inline-dots mb-0">
                            <li class="list-inline-item">
                                Copyright &copy;<a href="." class="link-secondary">iCmon</a>
                                ... All rights reserved.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>  <!-- /.page (if no page-wrapper) -->
    <!-- OR -->
    </div>  <!-- /.page-wrapper -->
    </div>  <!-- /.page (if page-wrapper exists) -->

    <!-- ====== THEME BUILDER ====== -->
    <div class="settings">
        <a href="#" class="btn btn-floating btn-icon btn-primary"
           data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings">
            <svg class="icon icon-1"><!-- settings icon --></svg>
        </a>
        <form class="offcanvas offcanvas-start offcanvas-narrow" tabindex="-1"
              id="offcanvasSettings">
            <div class="offcanvas-header">
                <h2 class="offcanvas-title">Theme Builder</h2>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column">
                <!-- Color mode: Light / Dark -->
                <!-- Color scheme: 12 color swatches -->
                <!-- Font family: Sans-serif / Serif / Monospace / Comic -->
                <!-- Theme base: Slate / Gray / Zinc / Neutral / Stone -->
                <!-- Corner Radius: 0 / 0.5 / 1 / 1.5 / 2 -->
                <div class="mt-auto space-y">
                    <button type="button" class="btn w-100" id="reset-changes">
                        <svg><!-- reset icon --></svg> Reset changes
                    </button>
                    <a href="#" class="btn btn-primary w-100" data-bs-dismiss="offcanvas">
                        <svg><!-- save icon --></svg> Save settings
                    </a>
                </div>
            </div>
        </form>
    </div>

    <script src="assets/dist/js/tabler.js" defer></script>
    <script src="assets/preview/js/demo.js" defer></script>
</body>
</html>
```

---

## CSS Assets

| # | File | Included By |
|---|------|-------------|
| 1 | `assets/sweetalert2/dist/sweetalert.css` | All template orchestrators (before DOCTYPE) |
| 2 | `assets/libs/jsvectormap/dist/jsvectormap.css` | All headers |
| 3 | `assets/dist/css/tabler.css` | All headers |
| 4 | `assets/dist/css/tabler-flags.css` | All headers |
| 5 | `assets/dist/css/tabler-socials.css` | All headers |
| 6 | `assets/dist/css/tabler-payments.css` | All headers |
| 7 | `assets/dist/css/tabler-vendors.css` | All headers |
| 8 | `assets/dist/css/tabler-marketing.css` | All headers |
| 9 | `assets/dist/css/tabler-themes.css` | All headers |
| 10 | `assets/preview/css/demo.css` | All headers |
| 11 | `@import url('assets/inter/inter.css')` via `<style>` | All headers |
| 12 | `assets/sweetalert2/dist/sweetalert.css` (2nd link) | navbar.php, navbariot.php, navbar_vertical.php |

---

## JS Assets

| # | File | Included By |
|---|------|-------------|
| 1 | `assets/sweetalert2/dist/js/jquery-latest.js` | All template orchestrators (before DOCTYPE) |
| 2 | `assets/sweetalert2/dist/sweetalert-dev.js` | All template orchestrators (before DOCTYPE) |
| 3 | `assets/dist/js/tabler-theme.js` | navbar.php, navbariot.php, navbar_vertical.php |
| 4 | `assets/sweetalert2/npm/sweetalert211.js` | navbar.php, navbariot.php, navbar_vertical.php |
| 5 | `assets/dist/js/tabler.js` (defer) | All footers |
| 6 | `assets/preview/js/demo.js` (defer) | All footers |

---

## Inline CSS (embedded in PHP)

- **`.confirm-btn`**: `background-color: #e53935; color: #fff;` — in `navbar.php`, `navbariot.php`, `navbar_vertical.php`

## Inline JS (embedded in PHP)

- **Logout confirmation** (SweetAlert2): In `navbar.php`, `navbariot.php`, `navbar_vertical.php` — on `#logout-link` click, shows Swal warning with confirm/cancel, redirects to logout on confirm.
- **Session token expiry redirect**: In all template orchestrators — if token missing, shows SweetAlert with timer then redirects to login.
- **Preloader** (commented out in `footer.php`): Tracks `<img>` load progress via `#progress-bar` and `#percentage`, hides `#preloader` when all images loaded.

---

## Key Differences Across Template Variants

| Template | Header | Navbar | Footer | Pagewrapper | Notes |
|----------|--------|--------|--------|-------------|-------|
| `template.php` | `header.php` | `navbar.php` | `footer.php` | `pagewrapper_seeting` (conditional) | Standard horizontal |
| `templateiot.php` | `headeriot.php` | `navbariot.php` | `footeriot.php` | `pagewrapper_seeting` (conditional) | IoT horizontal (extracts system/location from session) |
| `templater1.php` | `headerr1.php` | `navbar_r1.php` | `footerr1.php` | `pagewrapper_seetingr1` (conditional) | R1 variant |
| `iframe.php` | `headeriframe.php` | (none) | `footeriframe.php` | (none) | `<html data-bs-theme="dark">` |
| `templatevertical.php` | `header_vertical.php` | `navbar_vertical.php` | `footer_vertical.php` | `pagewrapper_dasdboard` + `pagewrapper_seeting_vertical` | ⚠ nested `<body>` inside `.page-wrapper` |
| `templatevertical2.php` | `header_vertical2.php` | `navbar_vertical-l2.php` | `footer_vertical2.php` | Same as above | Theme Builder **commented out** |
| `templatevertical3.php` | `header_vertical3.php` | `navbar_vertical-l3.php` | (none) | (none) | **No footer** — incomplete HTML |
| `templatevertical4.php` | `header_vertical2.php` | `navbar_vertical-l2.php` | `footer_vertical4m.php` | `pagewrapper_dasdboard_iot` | Vertical IoT variant |
| `template1.php` | (none) | (none) | (none) | (none) | Content-only partial |
| `template2.php` | (none) | (none) | (none) | (none) | Content-only partial |
| `template3.php` | (none) | (none) | (none) | (none) | Content-only partial |
