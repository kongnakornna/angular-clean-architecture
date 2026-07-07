import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Translation, SupportedLanguage, LanguageOption } from '../../domain/entities/translation.entity';

@Injectable({ providedIn: 'root' })
export class TranslationLocalDataSource {
  private translations: Record<string, Record<string, string>> = {
    th: {
      'app.name': 'iCmon',
      'nav.dashboard': 'แดชบอร์ด',
      'nav.jobs': 'การจัดการงาน',
      'nav.customers': 'ลูกค้า',
      'nav.quotations': 'ใบเสนอราคา',
      'nav.purchaseOrders': 'ใบสั่งซื้อ',
      'nav.products': 'สินค้าคงคลัง',
      'nav.payments': 'การชำระเงิน',
      'nav.documents': 'เอกสาร',
      'nav.iot': 'อุปกรณ์ IoT',
      'nav.wos': 'คำสั่งซื้อออนไลน์',
      'nav.settings': 'ตั้งค่า',
      'nav.users': 'ผู้ใช้งาน',
      'nav.roles': 'บทบาท',
      'common.save': 'บันทึก',
      'common.cancel': 'ยกเลิก',
      'common.delete': 'ลบ',
      'common.edit': 'แก้ไข',
      'common.create': 'สร้าง',
      'common.search': 'ค้นหา',
      'common.reset': 'รีเซ็ต',
      'common.confirm': 'ยืนยัน',
      'common.loading': 'กำลังโหลด...',
      'common.noData': 'ไม่พบข้อมูล',
      'login.title': 'เข้าสู่ระบบ',
      'login.email': 'อีเมล',
      'login.password': 'รหัสผ่าน',
      'login.submit': 'เข้าสู่ระบบ',
      'login.forgotPassword': 'ลืมรหัสผ่าน?',
      'login.rememberMe': 'จดจำฉันไว้ในระบบ',
      'login.or': 'หรือ',
      'login.noAccount': 'ยังไม่มีบัญชี?',
      'login.contactAdmin': 'ติดต่อผู้ดูแลระบบ',
      'login.testCredentials': 'ใช้ admin / P@ssw0rd เพื่อทดสอบระบบ',
      'dashboard.title': 'แดชบอร์ด',
      'dashboard.totalJobs': 'งานทั้งหมด',
      'dashboard.activeJobs': 'งานที่กำลังดำเนินการ',
      'dashboard.totalCustomers': 'ลูกค้าทั้งหมด',
      'dashboard.revenue': 'รายได้',
    },
    en: {
      'app.name': 'iCmon',
      'nav.dashboard': 'Dashboard',
      'nav.jobs': 'Job Management',
      'nav.customers': 'Customers',
      'nav.quotations': 'Quotations',
      'nav.purchaseOrders': 'Purchase Orders',
      'nav.products': 'Inventory',
      'nav.payments': 'Payments',
      'nav.documents': 'Documents',
      'nav.iot': 'IoT Devices',
      'nav.wos': 'Web Orders',
      'nav.settings': 'Settings',
      'nav.users': 'Users',
      'nav.roles': 'Roles',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.create': 'Create',
      'common.search': 'Search',
      'common.reset': 'Reset',
      'common.confirm': 'Confirm',
      'common.loading': 'Loading...',
      'common.noData': 'No data found',
      'login.title': 'Login',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.submit': 'Sign In',
      'login.forgotPassword': 'Forgot password?',
      'login.rememberMe': 'Remember me',
      'login.or': 'or',
      'login.noAccount': "Don't have an account?",
      'login.contactAdmin': 'Contact administrator',
      'login.testCredentials': 'Use admin / P@ssw0rd to test the system',
      'dashboard.title': 'Dashboard',
      'dashboard.totalJobs': 'Total Jobs',
      'dashboard.activeJobs': 'Active Jobs',
      'dashboard.totalCustomers': 'Total Customers',
      'dashboard.revenue': 'Revenue',
    },
  };

  private languageOptions: LanguageOption[] = [
    { code: 'th', name: 'ไทย', flag: 'assets/img/flags/th.svg' },
    { code: 'en', name: 'English', flag: 'assets/img/flags/gb.svg' },
  ];

  getTranslations(lang: SupportedLanguage): Observable<Translation[]> {
    const trans = this.translations[lang] || {};
    return of(Object.entries(trans).map(([key, value]) => ({ key, value, language: lang })));
  }

  getLanguageOptions(): Observable<LanguageOption[]> {
    return of(this.languageOptions);
  }
}