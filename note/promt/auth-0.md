จากภาพ UI ที่ให้มา (forgotpassword.png, login.png, signup.png, template.png) และโค้ดที่มีอยู่แล้วในโปรเจกต์ พบว่าโครงสร้างและฟังก์ชันการทำงานต่าง ๆ ถูก implement ไว้ครบถ้วนตามดีไซน์ของ Tabler UI แล้ว โดยเฉพาะ `ThemeSettingsComponent` ที่ตรงกับภาพ **Theme Builder** มากที่สุด ส่วนหน้า Login, Sign Up, Forgot Password ก็มี `LoginComponent`, `SignUpComponent`, `ForgotPasswordComponent` ที่ใช้เลย์เอาต์แบบ AuthLayout ตามภาพ

อย่างไรก็ตาม เพื่อให้ตรงกับรายละเอียดในภาพมากขึ้น อาจต้องปรับปรุงส่วนของ **การเลือกสี (Color scheme)** ให้แสดงเป็นปุ่มวงกลมพร้อมสีจริง และเพิ่มการแสดงผลตัวอย่าง (Preview) ตามที่ปรากฏในภาพ ซึ่ง `ThemeSettingsComponent` ได้ทำไว้แล้ว นอกจากนี้ ควรตรวจสอบว่า `AuthLayoutComponent` และปุ่มต่าง ๆ ใช้คลาส CSS ของ Tabler ครบถ้วน

ด้านล่างนี้คือ **โค้ดที่ปรับปรุง** สำหรับ `ThemeSettingsComponent` (ซึ่งเป็นส่วนหลักของ Theme Builder) พร้อมทั้ง **คำอธิบาย** และ **Prompt ที่ออกแบบไว้** เพื่อให้สามารถนำไปใช้กับ AI ในการสร้างโค้ด Angular ตามภาพได้

---

### 🔧 ปรับปรุง ThemeSettingsComponent (ให้ตรงกับภาพมากขึ้น)

```typescript
// theme-settings.component.ts
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LayoutService, LayoutSettings } from '../../../../../core/services/layout.service';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [NgFor, NgIf, TablerIconComponent, TranslatePipe],
  template: `
    <div class="page-body">
      <div class="container-xl">
        <!-- Header -->
        <div class="page-header d-print-none mb-4">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">{{ 'layout.settings.title' | translate }}</h2>
              <div class="text-muted mt-1">{{ 'dashboard.subtitle' | translate }}</div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-8">
            <!-- Layout Mode -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">{{ 'layout.settings.layoutMode' | translate }}</h3>
              </div>
              <div class="card-body">
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.layoutMode' | translate }}</label>
                  <div class="btn-group w-100" role="group">
                    <button *ngFor="let m of layoutModes" type="button" class="btn"
                            [class.btn-primary]="s.layoutMode === m.value"
                            [class.btn-outline-primary]="s.layoutMode !== m.value"
                            (click)="update('layoutMode', m.value)">
                      {{ m.label | translate }}
                    </button>
                  </div>
                </div>
                <!-- Navbar Position -->
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.navbarPosition' | translate }}</label>
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn"
                            [class.btn-primary]="s.navbarPosition === 'left'"
                            [class.btn-outline-primary]="s.navbarPosition !== 'left'"
                            (click)="update('navbarPosition', 'left')">
                      {{ 'layout.settings.navbarLeft' | translate }}
                    </button>
                    <button type="button" class="btn"
                            [class.btn-primary]="s.navbarPosition === 'right'"
                            [class.btn-outline-primary]="s.navbarPosition !== 'right'"
                            (click)="update('navbarPosition', 'right')">
                      {{ 'layout.settings.navbarRight' | translate }}
                    </button>
                  </div>
                </div>
                <!-- Toggle switches -->
                <div class="mb-3">
                  <label class="form-check form-switch mb-2">
                    <input class="form-check-input" type="checkbox" [checked]="s.navbarDark" (change)="toggle('navbarDark')">
                    <span class="form-check-label">{{ 'layout.settings.navbarDark' | translate }}</span>
                  </label>
                  <label class="form-check form-switch mb-2">
                    <input class="form-check-input" type="checkbox" [checked]="s.navbarOverlap" (change)="toggle('navbarOverlap')">
                    <span class="form-check-label">{{ 'layout.settings.navbarOverlap' | translate }}</span>
                  </label>
                  <label class="form-check form-switch mb-2">
                    <input class="form-check-input" type="checkbox" [checked]="s.navbarSticky" (change)="toggle('navbarSticky')">
                    <span class="form-check-label">{{ 'layout.settings.navbarSticky' | translate }}</span>
                  </label>
                  <label class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" [checked]="s.rtlMode" (change)="toggle('rtlMode')">
                    <span class="form-check-label">{{ 'layout.settings.rtlMode' | translate }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Color Scheme & Fonts -->
            <div class="card mt-4">
              <div class="card-header">
                <h3 class="card-title">{{ 'layout.settings.colorScheme' | translate }}</h3>
              </div>
              <div class="card-body">
                <!-- Color Scheme Picker (วงกลมสี) -->
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.colorScheme' | translate }}</label>
                  <div class="row g-2">
                    <div class="col-auto" *ngFor="let c of colorSchemes">
                      <a href="javascript:void(0)" class="btn btn-icon rounded-circle"
                         [style.background]="'var(--tblr-' + c.value + ')'"
                         [class.btn-primary]="s.colorScheme === c.value"
                         [class.btn-outline-primary]="s.colorScheme !== c.value"
                         (click)="update('colorScheme', c.value)"
                         [title]="c.label | translate">
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Font Family -->
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.fontFamily' | translate }}</label>
                  <select class="form-select" [value]="s.fontFamily" (change)="update('fontFamily', $any($event.target).value)">
                    <option *ngFor="let f of fontFamilies" [value]="f.value">{{ f.label | translate }}</option>
                  </select>
                </div>

                <!-- Theme Base (Slate, Gray, etc.) -->
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.themeBase' | translate }}</label>
                  <div class="btn-group w-100" role="group">
                    <button *ngFor="let b of themeBases" type="button" class="btn btn-sm"
                            [class.btn-primary]="s.themeBase === b.value"
                            [class.btn-outline-primary]="s.themeBase !== b.value"
                            (click)="update('themeBase', b.value)">
                      {{ b.label | translate }}
                    </button>
                  </div>
                </div>

                <!-- Corner Radius -->
                <div class="mb-4">
                  <label class="form-label">{{ 'layout.settings.borderRadius' | translate }} ({{ s.borderRadius }})</label>
                  <div class="btn-group w-100" role="group">
                    <button *ngFor="let r of radiusOptions" type="button" class="btn btn-sm"
                            [class.btn-primary]="s.borderRadius === r"
                            [class.btn-outline-primary]="s.borderRadius !== r"
                            (click)="update('borderRadius', r)">
                      {{ r }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar preview / reset -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">{{ 'common.view' | translate }}</h3>
              </div>
              <div class="card-body text-center py-5">
                <i-tabler name="palette" class="text-muted mb-3" size="64"></i-tabler>
                <p class="text-muted">{{ 'common.loading' | translate }}</p>
                <button type="button" class="btn btn-outline-danger w-100" (click)="reset()">
                  <i-tabler name="refresh" class="me-1" size="16"></i-tabler>
                  {{ 'layout.settings.reset' | translate }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ThemeSettingsComponent {
  private layout = inject(LayoutService);
  get s(): LayoutSettings { return this.layout.snapshot; }

  layoutModes = [
    { value: 'vertical', label: 'layout.settings.layoutVertical' },
    { value: 'fluid', label: 'layout.settings.layoutFluid' },
    { value: 'boxed', label: 'layout.settings.layoutBoxed' },
    { value: 'condensed', label: 'layout.settings.layoutCondensed' },
  ];

  colorSchemes = [
    { value: 'blue', label: 'layout.settings.colorBlue' },
    { value: 'azure', label: 'layout.settings.colorAzure' },
    { value: 'indigo', label: 'layout.settings.colorIndigo' },
    { value: 'purple', label: 'layout.settings.colorPurple' },
    { value: 'pink', label: 'layout.settings.colorPink' },
    { value: 'red', label: 'layout.settings.colorRed' },
    { value: 'orange', label: 'layout.settings.colorOrange' },
    { value: 'yellow', label: 'layout.settings.colorYellow' },
    { value: 'lime', label: 'layout.settings.colorLime' },
    { value: 'green', label: 'layout.settings.colorGreen' },
    { value: 'teal', label: 'layout.settings.colorTeal' },
    { value: 'cyan', label: 'layout.settings.colorCyan' },
  ];

  fontFamilies = [
    { value: 'sans-serif', label: 'layout.settings.fontSansSerif' },
    { value: 'serif', label: 'layout.settings.fontSerif' },
    { value: 'monospace', label: 'layout.settings.fontMonospace' },
    { value: 'comic', label: 'layout.settings.fontComic' },
  ];

  themeBases = [
    { value: 'slate', label: 'layout.settings.themeSlate' },
    { value: 'gray', label: 'layout.settings.themeGray' },
    { value: 'zinc', label: 'layout.settings.themeZinc' },
    { value: 'neutral', label: 'layout.settings.themeNeutral' },
    { value: 'stone', label: 'layout.settings.themeStone' },
  ];

  radiusOptions = [0, 0.5, 1, 1.5, 2];

  update(key: keyof LayoutSettings, value: any): void {
    this.layout.update({ [key]: value });
  }

  reset(): void {
    this.layout.reset();
  }

  toggle(key: keyof LayoutSettings): void {
    this.layout.update({ [key]: !this.s[key] });
  }
}
```

---

### 🧩 หน้า Login, Sign Up, Forgot Password

หน้าเหล่านี้มีโค้ดครบถ้วนตามภาพแล้ว โดยใช้ `AuthLayoutComponent` เป็น wrapper และใช้ฟอร์ม + ปุ่มตามดีไซน์ Tabler ตัวอย่างเช่น `LoginComponent` มีฟิลด์ Username, Password, ปุ่ม Show/Hide, ลิงก์ Forgot Password และปุ่ม Social Login (Github, X) ซึ่งตรงกับภาพ `login.png`

---

### 📝 Prompt ที่ออกแบบไว้ (สำหรับ AI)

ด้านล่างนี้เป็น **Prompt** ที่สามารถนำไปใช้กับ AI (เช่น ChatGPT, Copilot) เพื่อสร้าง Angular component ตามภาพ UI ที่ให้มา โดย Prompt นี้ครอบคลุมทั้งโครงสร้างและฟังก์ชันการทำงาน

---

**Prompt (English):**

```
You are an expert Angular developer. Based on the following UI mockups (forgotpassword.png, login.png, signup.png, template.png), generate the complete Angular 17+ standalone components for an authentication module. The module includes:

1. Login page (username/email, password, remember me, forgot password link, social login buttons)
2. Sign Up page (full name, email, password, confirm password, agree terms)
3. Forgot Password page (email input, submit button, back to login link)
4. Reset Password page (new password, confirm password, token from query param)
5. Theme Settings page (layout mode, navbar position, color scheme picker, font family, theme base, border radius)

Use the following technical requirements:
- Angular 17+ with standalone components
- Use Tabler UI CSS framework (https://tabler.io) for styling
- Use Angular Forms (Reactive or Template-driven) with validation
- Use RxJS for async operations
- Implement Clean Architecture: separate domain, data, and presentation layers
- Provide an IAuthRepository interface with methods: login, logout, refreshToken, forgotPassword, resetPassword, getCurrentUser, hasPermission
- Implement a demo repository for offline testing
- Use Angular Router for navigation (AuthLayout for login/register/forgot, AppLayout for theme settings)
- Include i18n support with a translate pipe
- Store JWT tokens in localStorage
- Handle loading and error states

The UI should exactly match the provided images: use card layouts, input groups with toggleable password visibility, buttons with icons, and the color scheme picker as rounded buttons.

Generate all necessary files: components, services, DTOs, use cases, repositories, and routing configuration. Ensure the code is production-ready and follows Angular best practices.
```

---

**Prompt ภาษาไทย (เผื่อต้องการ):**

```
คุณคือผู้เชี่ยวชาญ Angular โปรดสร้าง Angular 17+ standalone components สำหรับโมดูล authentication ตาม UI mockup ต่อไปนี้ (forgotpassword.png, login.png, signup.png, template.png) ซึ่งประกอบด้วย:
1. หน้า Login (username/email, password, remember me, forgot password, social login)
2. หน้า Sign Up (name, email, password, confirm password, agree terms)
3. หน้า Forgot Password (email, submit, back to login)
4. หน้า Reset Password (new password, confirm password, token from query param)
5. หน้า Theme Settings (layout mode, navbar position, color scheme picker, font family, theme base, border radius)

ข้อกำหนดทางเทคนิค:
- Angular 17+ แบบ standalone components
- ใช้ CSS framework Tabler UI (https://tabler.io)
- ใช้ Angular Forms (Template-driven หรือ Reactive) พร้อม validation
- ใช้ RxJS สำหรับ asynchronous operations
- นำ Clean Architecture มาใช้ (แยก domain, data, presentation)
- สร้าง IAuthRepository interface พร้อม methods: login, logout, refreshToken, forgotPassword, resetPassword, getCurrentUser, hasPermission
- มี demo repository สำหรับทดสอบแบบ offline
- ใช้ Angular Router (AuthLayout สำหรับหน้า login/register/forgot, AppLayout สำหรับ theme settings)
- รองรับ i18n ด้วย translate pipe
- เก็บ JWT token ใน localStorage
- จัดการสถานะ loading และ error

ดีไซน์ UI ให้ตรงกับภาพที่ให้ไว้: ใช้ card layout, input group ที่สามารถแสดง/ซ่อนรหัสผ่าน, ปุ่มที่มีไอคอน, และตัวเลือกสีแบบปุ่มวงกลม

สร้างไฟล์ที่จำเป็นทั้งหมด: components, services, DTOs, use cases, repositories, และ routing configuration โค้ดต้องพร้อมใช้งานจริงและเป็นไปตาม best practices ของ Angular
```

---

### ✅ สรุป

- โค้ดที่มีอยู่แล้วในโปรเจกต์ (ในไฟล์ที่ให้มา) ตรงกับ UI เกือบทั้งหมด เพียงแค่ปรับแต่งเล็กน้อยตามที่แสดงด้านบน
- หากต้องการให้ AI สร้างใหม่ทั้งระบบ สามารถใช้ Prompt ข้างต้นได้ทันที
- ควรตรวจสอบว่า `LayoutService` และ `environment` ถูกตั้งค่าอย่างถูกต้อง และใช้ Tabler Icons ผ่าน `angular-tabler-icons`
 