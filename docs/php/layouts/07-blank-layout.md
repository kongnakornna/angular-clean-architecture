# Blank Layout (PHP: `template1.php` / `template2.php` / `template3.php`)

> No chrome — content only. No header, no navbar, no footer, no theme builder.
> PHP `template1.php`, `template2.php`, `template3.php` all behave identically:
> they load only the dynamic `$content_view` with zero surrounding markup.

---

## BlankLayoutComponent

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- PHP: template1.php / template2.php / template3.php
         No header. No navbar. No footer. Content only. -->
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class BlankLayoutComponent {}
```
