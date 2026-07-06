export class Formatters {
  static currency(value: number, currencyCode: string = 'THB'): string {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }

  static date(value: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    if (format === 'medium') {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    if (format === 'long') {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.second = '2-digit';
    }
    return new Intl.DateTimeFormat('th-TH', options).format(date);
  }

  static phoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 9) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
    }
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  static fileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static jobNumber(prefix: string = 'JC', year: number = new Date().getFullYear(), sequence: number): string {
    return `${prefix}-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}
