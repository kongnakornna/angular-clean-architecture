# การแปลง Tabler Admin Template เป็น Angular

## บทนำ

Tabler เป็น Admin Template ยอดนิยมที่พัฒนาโดยใช้ Bootstrap 5, CSS และ JavaScript ซึ่งมีจุดเด่นด้านดีไซน์ที่สวยงามและไอคอนกว่า 6,000 รูปแบบ เอกสารนี้จะแนะนำขั้นตอนการแปลง Tabler Admin Template ให้เป็น Angular Application พร้อมตัวอย่างโค้ดและโครงสร้างที่สมบูรณ์

---

## สารบัญ

1. [ภาพรวมโครงการ](#ภาพรวมโครงการ)
2. [การติดตั้งและการตั้งค่า](#การติดตั้งและการตั้งค่า)
3. [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
4. [Layout Components](#layout-components)
5. [การตั้งค่า Routing](#การตั้งค่า-routing)
6. [Dashboard Page](#dashboard-page)
7. [Extra Pages](#extra-pages)
8. [การใช้ Tabler Icons](#การใช้-tabler-icons)
9. [การปรับแต่งและธีม](#การปรับแต่งและธีม)
10. [การ Build และ Deploy](#การ-build-and-deploy)

---

## ภาพรวมโครงการ

### เทคโนโลยีหลัก
- **Angular**: เวอร์ชัน 18+ (แนะนำ)
- **Bootstrap**: เวอร์ชัน 5.x
- **Tabler Icons**: ไอคอน SVG มากกว่า 6,000 รูปแบบ
- **RxJS**: สำหรับการจัดการข้อมูลแบบ Reactive

### หมายเหตุสำคัญ
> ⚠️ โปรเจค `tabler-angular` อย่างเป็นทางการถูกปิดการพัฒนา (Archived) ตั้งแต่ปี 2023 ดังนั้นเราจะใช้แนวทางการแปลงด้วยตนเองโดยใช้ Bootstrap 5 ร่วมกับ Angular Components

---

## การติดตั้งและการตั้งค่า

### ขั้นตอนที่ 1: สร้างโปรเจค Angular ใหม่

```bash
ng new tabler-angular-admin --routing --style=scss --standalone
cd tabler-angular-admin
```

### ขั้นตอนที่ 2: ติดตั้ง Dependencies

```bash
# Bootstrap 5
npm install bootstrap @popperjs/core

# Tabler Icons สำหรับ Angular
npm install angular-tabler-icons

# (ทางเลือก) ngx-tabler-icons
npm install ngx-tabler-icons
```

### ขั้นตอนที่ 3: กำหนดค่าใน angular.json

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/@popperjs/core/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

### ขั้นตอนที่ 4: กำหนดค่า Icons Provider (app.config.ts)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideTablerIcons } from 'angular-tabler-icons';
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconFileText,
  IconMail,
  IconBrandGithub,
  IconHeart
} from 'angular-tabler-icons/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideTablerIcons({
      IconDashboard,
      IconUsers,
      IconSettings,
      IconChartBar,
      IconFileText,
      IconMail,
      IconBrandGithub,
      IconHeart
    })
  ]
};
```

---

## โครงสร้างโปรเจค

```
src/
├── app/
│   ├── layouts/
│   │   └── default-layout/
│   │       ├── default-layout.component.ts
│   │       ├── default-layout.component.html
│   │       ├── default-layout.component.scss
│   │       ├── sidebar/
│   │       ├── header/
│   │       └── footer/
│   ├── views/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── settings/
│   │   ├── analytics/
│   │   ├── invoices/
│   │   └── ...
│   ├── shared/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
│   ├── images/
│   └── icons/
├── scss/
│   ├── _variables.scss
│   ├── _custom.scss
│   └── styles.scss
└── index.html
```

---

## Layout Components

### 1. Default Layout Component

**default-layout.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TablerIconComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
```

**default-layout.component.html**
```html
<div class="app-wrapper d-flex">
  <!-- Sidebar -->
  <app-sidebar 
    [collapsed]="isSidebarCollapsed"
    (toggle)="toggleSidebar()">
  </app-sidebar>

  <!-- Main Content -->
  <div class="main-content d-flex flex-column flex-grow-1">
    <app-header (toggleSidebar)="toggleSidebar()"></app-header>
    
    <main class="content-wrapper flex-grow-1 p-3">
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
    </main>
    
    <app-footer></app-footer>
  </div>
</div>
```

### 2. Sidebar Component

**sidebar/sidebar.component.ts**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

export interface NavItem {
  name: string;
  url: string;
  icon?: string;
  children?: NavItem[];
  divider?: boolean;
  title?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TablerIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  navItems: NavItem[] = [
    { title: true, name: 'Main' },
    { name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
    { name: 'Users', url: '/users', icon: 'users' },
    { name: 'Analytics', url: '/analytics', icon: 'chart-bar' },
    { divider: true },
    { name: 'Invoices', url: '/invoices', icon: 'file-text' },
    { name: 'Settings', url: '/settings', icon: 'settings' }
  ];

  toggleSidebar() {
    this.toggle.emit();
  }
}
```

**sidebar/sidebar.component.html**
```html
<nav class="sidebar d-flex flex-column" [class.collapsed]="collapsed">
  <!-- Brand -->
  <div class="sidebar-brand d-flex align-items-center justify-content-center">
    <i-tabler name="dashboard" size="32"></i-tabler>
    <span class="brand-text ms-2" *ngIf="!collapsed">Tabler</span>
  </div>

  <!-- Navigation -->
  <ul class="nav flex-column flex-grow-1">
    <ng-container *ngFor="let item of navItems">
      <!-- Divider -->
      <li class="nav-divider" *ngIf="item.divider"></li>
      
      <!-- Title -->
      <li class="nav-title" *ngIf="item.title">
        <span *ngIf="!collapsed">{{ item.name }}</span>
      </li>
      
      <!-- Nav Item -->
      <li class="nav-item" *ngIf="!item.title && !item.divider">
        <a class="nav-link" 
           [routerLink]="item.url" 
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: true}">
          <i-tabler [name]="item.icon || 'circle'" size="20"></i-tabler>
          <span class="nav-text ms-2" *ngIf="!collapsed">{{ item.name }}</span>
        </a>
      </li>
    </ng-container>
  </ul>

  <!-- Footer -->
  <div class="sidebar-footer" *ngIf="!collapsed">
    <small class="text-muted">© 2024 Tabler</small>
  </div>
</nav>
```

**sidebar/sidebar.component.scss**
```scss
.sidebar {
  width: 280px;
  min-height: 100vh;
  background: #1a2332;
  color: #fff;
  transition: width 0.3s ease;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;

  &.collapsed {
    width: 70px;

    .nav-text,
    .brand-text,
    .sidebar-footer {
      display: none;
    }

    .nav-link {
      justify-content: center;
      padding: 0.75rem;
    }
  }

  .sidebar-brand {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);

    .brand-text {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  .nav {
    padding: 0.5rem 0;

    .nav-item {
      .nav-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        color: rgba(255,255,255,0.7);
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }

        &.active {
          color: #fff;
          background: rgba(255,255,255,0.1);
          border-right: 3px solid #6c8bf5;
        }

        i-tabler {
          flex-shrink: 0;
        }
      }
    }

    .nav-divider {
      height: 1px;
      margin: 0.5rem 1.5rem;
      background: rgba(255,255,255,0.1);
    }

    .nav-title {
      padding: 0.5rem 1.5rem;
      font-size: 0.7rem;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.05em;
    }
  }
}
```

### 3. Header Component

**header/header.component.ts**
```typescript
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
```

**header/header.component.html**
```html
<header class="navbar navbar-expand bg-white border-bottom">
  <div class="container-fluid">
    <!-- Toggle Sidebar -->
    <button class="navbar-toggler d-lg-none" (click)="onToggleSidebar()">
      <i-tabler name="menu-2" size="24"></i-tabler>
    </button>

    <!-- Search -->
    <div class="d-none d-md-block">
      <div class="input-group">
        <span class="input-group-text bg-transparent border-0">
          <i-tabler name="search" size="18"></i-tabler>
        </span>
        <input type="text" class="form-control border-0" placeholder="Search...">
      </div>
    </div>

    <!-- Right Side -->
    <div class="navbar-nav ms-auto flex-row gap-2">
      <li class="nav-item dropdown">
        <a class="nav-link" href="#" data-bs-toggle="dropdown">
          <i-tabler name="bell" size="20"></i-tabler>
          <span class="badge bg-danger rounded-pill">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-end p-0">
          <div class="dropdown-header">Notifications</div>
          <a class="dropdown-item" href="#">New user registered</a>
          <a class="dropdown-item" href="#">Server update completed</a>
          <a class="dropdown-item" href="#">Payment received</a>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link" href="#" data-bs-toggle="dropdown">
          <img src="/assets/images/avatar.jpg" class="rounded-circle" width="32" height="32" alt="User">
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="#">Profile</a>
          <a class="dropdown-item" href="#">Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger" href="#">Logout</a>
        </div>
      </li>
    </div>
  </div>
</header>
```

---

## การตั้งค่า Routing

**app.routes.ts**
```typescript
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./views/users/users.component')
          .then(m => m.UsersComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./views/analytics/analytics.component')
          .then(m => m.AnalyticsComponent)
      },
      {
        path: 'invoices',
        loadComponent: () => import('./views/invoices/invoices.component')
          .then(m => m.InvoicesComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./views/settings/settings.component')
          .then(m => m.SettingsComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./views/error/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
```

---

## Dashboard Page

**dashboard/dashboard.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
  progress: number;
  trend: 'up' | 'down';
  trendValue: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: StatCard[] = [
    {
      label: 'Total Users',
      value: '12,846',
      icon: 'users',
      color: 'primary',
      progress: 75,
      trend: 'up',
      trendValue: '12.5%'
    },
    {
      label: 'Revenue',
      value: '$54,238',
      icon: 'currency-dollar',
      color: 'success',
      progress: 60,
      trend: 'up',
      trendValue: '8.2%'
    },
    {
      label: 'Orders',
      value: '3,429',
      icon: 'shopping-cart',
      color: 'warning',
      progress: 43,
      trend: 'down',
      trendValue: '2.1%'
    },
    {
      label: 'Growth',
      value: '24.7%',
      icon: 'trending-up',
      color: 'danger',
      progress: 18,
      trend: 'up',
      trendValue: '4.3%'
    }
  ];

  recentTransactions = [
    { id: 1, user: 'John Doe', amount: '$129.00', status: 'Completed', date: '2024-01-15' },
    { id: 2, user: 'Jane Smith', amount: '$45.50', status: 'Pending', date: '2024-01-14' },
    { id: 3, user: 'Bob Johnson', amount: '$230.00', status: 'Completed', date: '2024-01-13' },
    { id: 4, user: 'Alice Brown', amount: '$89.99', status: 'Failed', date: '2024-01-12' }
  ];

  ngOnInit() {
    // Load dashboard data from service
  }
}
```

**dashboard/dashboard.component.html**
```html
<div class="dashboard">
  <!-- Stats Cards -->
  <div class="row g-4 mb-4">
    <div class="col-sm-6 col-xl-3" *ngFor="let stat of stats">
      <div class="card h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="text-muted small text-uppercase">{{ stat.label }}</div>
              <div class="h2 mb-0">{{ stat.value }}</div>
            </div>
            <div class="rounded p-2 bg-{{ stat.color }}-bg bg-opacity-10">
              <i-tabler [name]="stat.icon" size="24" class="text-{{ stat.color }}"></i-tabler>
            </div>
          </div>
          <div class="mt-3">
            <div class="progress" style="height: 4px;">
              <div class="progress-bar bg-{{ stat.color }}" 
                   [style.width]="stat.progress + '%'">
              </div>
            </div>
            <div class="d-flex justify-content-between mt-2">
              <small class="text-muted">Progress</small>
              <small [class.text-success]="stat.trend === 'up'" 
                     [class.text-danger]="stat.trend === 'down'">
                {{ stat.trendValue }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Charts & Tables -->
  <div class="row g-4">
    <!-- Chart -->
    <div class="col-lg-8">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title mb-0">Revenue Overview</h5>
        </div>
        <div class="card-body">
          <canvas id="revenueChart" height="250"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="card-title mb-0">Recent Transactions</h5>
          <a href="#" class="text-decoration-none">View All</a>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center" 
                 *ngFor="let tx of recentTransactions">
              <div>
                <div class="fw-semibold">{{ tx.user }}</div>
                <small class="text-muted">{{ tx.date }}</small>
              </div>
              <div class="text-end">
                <div>{{ tx.amount }}</div>
                <small class="badge" 
                       [class.bg-success]="tx.status === 'Completed'"
                       [class.bg-warning]="tx.status === 'Pending'"
                       [class.bg-danger]="tx.status === 'Failed'">
                  {{ tx.status }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Extra Pages

Tabler มีหน้าเพจเพิ่มเติมที่ครบครันตามรายการนี้:

| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Activity | `/activity` | กิจกรรมและประวัติการใช้งาน |
| Chat | `/chat` | หน้าสนทนาแบบเรียลไทม์ |
| FAQ | `/faq` | คำถามที่พบบ่อย |
| Gallery | `/gallery` | แกลเลอรี่รูปภาพ |
| Invoice | `/invoices` | เอกสารใบแจ้งหนี้ |
| Job Listing | `/jobs` | รายการตำแหน่งงาน |
| License | `/license` | ข้อมูลลิขสิทธิ์ |
| Logs | `/logs` | บันทึกระบบ |
| Pricing | `/pricing` | แผนราคาและการสมัครสมาชิก |
| Settings | `/settings` | หน้าการตั้งค่า |
| Tasks | `/tasks` | ระบบจัดการงาน |
| Users List | `/users` | รายการผู้ใช้งาน |
| Widgets | `/widgets` | ตัวอย่างวิดเจ็ตต่างๆ |

### ตัวอย่าง: Users Page

**users/users.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending' }
  ];

  ngOnInit() {
    // Load users from service
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      active: 'bg-success',
      inactive: 'bg-secondary',
      pending: 'bg-warning'
    };
    return map[status] || 'bg-secondary';
  }
}
```

**users/users.component.html**
```html
<div class="users-page">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Users Management</h2>
    <button class="btn btn-primary">
      <i-tabler name="user-plus" size="18"></i-tabler>
      Add User
    </button>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>
                <div class="d-flex align-items-center">
                  <div class="avatar bg-primary text-white rounded-circle me-2">
                    {{ user.name.charAt(0) }}
                  </div>
                  {{ user.name }}
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span class="badge {{ getStatusBadge(user.status) }}">
                  {{ user.status }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                  <i-tabler name="edit" size="16"></i-tabler>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  <i-tabler name="trash" size="16"></i-tabler>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

---

## การใช้ Tabler Icons

### ติดตั้งและกำหนดค่า

มีสองตัวเลือกหลักสำหรับการใช้ Tabler Icons ใน Angular:

#### ตัวเลือก 1: angular-tabler-icons

```typescript
// app.config.ts
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconHome, IconUser } from 'angular-tabler-icons/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTablerIcons({
      IconHome,
      IconUser,
      // ... เพิ่มไอคอนที่ต้องการใช้
    })
  ]
};

// ใน Component
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  imports: [TablerIconComponent],
  template: `
    <i-tabler name="home" size="24"></i-tabler>
    <i-tabler name="user" style="color: red;"></i-tabler>
  `
})
```

#### ตัวเลือก 2: ngx-tabler-icons

```typescript
// app.config.ts
import { provideIcons } from 'ngx-tabler-icons';
import { IconHome, IconUser } from 'ngx-tabler-icons/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIcons({
      IconHome,
      IconUser,
    }),
  ]
};

// ใน Component
import { ITablerIcon } from 'ngx-tabler-icons';

@Component({
  imports: [ITablerIcon],
  template: `
    <i-tabler-icon name="home" />
    <i-tabler-icon name="user" [size]="20" />
  `
})
```

---

## การปรับแต่งและธีม

### SCSS Variables

**styles.scss**
```scss
// 1. Override Bootstrap variables
$primary: #6c8bf5;
$secondary: #6c7a91;
$success: #2dce89;
$info: #11cdef;
$warning: #fb6340;
$danger: #f5365c;

// 2. Import Bootstrap
@import 'bootstrap/scss/bootstrap';

// 3. Custom styles
:root {
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 70px;
  --header-height: 60px;
  --content-padding: 1.5rem;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// 4. Custom component styles
.card {
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
}

// 5. Dark mode support
[data-theme="dark"] {
  --bs-body-bg: #1a1a2e;
  --bs-body-color: #e0e0e0;
  --bs-card-bg: #16213e;
  --bs-border-color: #2a3a5e;
  
  .navbar {
    background: #16213e !important;
    border-color: #2a3a5e;
  }
}
```

### การสลับธีม (Dark/Light)

**theme.service.ts**
```typescript
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = signal<boolean>(false);
  theme = this.isDark.asReadonly();

  constructor() {
    // Load saved theme preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.setDarkTheme(true);
    }
    
    // Sync with system preference
    effect(() => {
      document.documentElement.setAttribute('data-theme', 
        this.isDark() ? 'dark' : 'light'
      );
      localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDark.update(dark => !dark);
  }

  setDarkTheme(enabled: boolean) {
    this.isDark.set(enabled);
  }
}
```

---

## การ Build and Deploy

### Development Server

```bash
npm start
# หรือ
ng serve
```
เข้าชมที่ `http://localhost:4200`

### Production Build

```bash
npm run build
# หรือ
ng build --configuration production
```
ไฟล์ที่ Build จะอยู่ในโฟลเดอร์ `dist/`

### การปรับแต่งเพิ่มเติม

**angular.json**
```json
{
  "projects": {
    "tabler-angular-admin": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/tabler-angular-admin",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

---

## สรุป

การแปลง Tabler Admin Template เป็น Angular ช่วยให้คุณได้ประโยชน์จาก:

✅ **ความสวยงามของ Tabler**: ดีไซน์ที่ทันสมัยและปรับแต่งได้
✅ **พลังของ Angular**: Component-based architecture, Lazy loading, RxJS
✅ **Bootstrap 5**: Responsive design ที่แข็งแกร่ง
✅ **Tabler Icons**: ไอคอนกว่า 6,000 รูปแบบ

### แนวทางปฏิบัติที่ดี

1. **ใช้ Lazy Loading**: โหลดแต่ละหน้าเฉพาะเมื่อต้องการ
2. **Optimize Icons**: นำเข้าเฉพาะไอคอนที่ใช้งานจริง
3. **ใช้ Standalone Components**: ลด complexity และเพิ่ม performance
4. **จัดโครงสร้างให้เป็นระบบ**: แยก Layout, Views, และ Shared components
5. **ใช้ Services**: จัดการข้อมูลและ business logic ใน services

### ข้อควรระวัง

- ⚠️ โปรเจค `tabler-angular` อย่างเป็นทางการถูกปิดการพัฒนาแล้ว
- 💡 ควรใช้แนวทางการแปลงด้วยตนเองตามเอกสารนี้
- 📦 พิจารณาใช้ `angular-tabler-icons` หรือ `ngx-tabler-icons` สำหรับไอคอน

---

## เอกสารอ้างอิง

- [Tabler Official Site](https://tabler.io/admin-template) 
- [Angular Documentation](https://angular.dev)
- [Bootstrap 5 Documentation](https://getbootstrap.com)
- [Tabler Icons](https://tabler.io/icons) 
