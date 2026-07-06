import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  template: `
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-lg-auto ms-lg-auto">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item"><a href="#" class="link-secondary">เกี่ยวกับ</a></li>
              <li class="list-inline-item"><a href="#" class="link-secondary">ช่วยเหลือ</a></li>
              <li class="list-inline-item"><a href="#" class="link-secondary">นโยบาย</a></li>
            </ul>
          </div>
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">Copyright &copy; {{ currentYear }} BizAdmin System</li>
              <li class="list-inline-item">เวอร์ชัน 1.0.0</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { padding: 1rem 0; border-top: 1px solid var(--tblr-border-color); margin-top: auto; }
  `],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
