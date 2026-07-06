export class Helpers {
  static generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  }

  static debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
    let timeoutId: ReturnType<typeof setTimeout>;
    return ((...args: unknown[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
  }

  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }

  static getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      pending: 'bg-yellow',
      assigned: 'bg-blue',
      in_progress: 'bg-blue',
      on_hold: 'bg-orange',
      completed: 'bg-green',
      closed: 'bg-gray',
      draft: 'bg-gray',
      sent: 'bg-blue',
      under_review: 'bg-yellow',
      approved: 'bg-green',
      rejected: 'bg-red',
      converted_to_po: 'bg-purple',
      paid: 'bg-green',
      failed: 'bg-red',
      refunded: 'bg-orange',
      delivered: 'bg-green',
      shipped: 'bg-blue',
      cancelled: 'bg-red',
      low: 'bg-gray',
      medium: 'bg-blue',
      high: 'bg-yellow',
      urgent: 'bg-red',
    };
    return colorMap[status] || 'bg-gray';
  }

  static getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
      low: 'ต่ำ',
      medium: 'ปานกลาง',
      high: 'สูง',
      urgent: 'เร่งด่วน',
    };
    return labels[priority] || priority;
  }

  static getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'รอดำเนินการ',
      assigned: 'มอบหมายแล้ว',
      in_progress: 'กำลังดำเนินการ',
      on_hold: 'พักงาน',
      completed: 'เสร็จสิ้น',
      closed: 'ปิดงาน',
      draft: 'ร่าง',
      sent: 'ส่งแล้ว',
      under_review: 'กำลังตรวจสอบ',
      approved: 'อนุมัติแล้ว',
      rejected: 'ปฏิเสธ',
      converted_to_po: 'แปลงเป็น PO แล้ว',
      paid: 'ชำระแล้ว',
      failed: 'ล้มเหลว',
      refunded: 'คืนเงินแล้ว',
      delivered: 'ส่งมอบแล้ว',
      shipped: 'จัดส่งแล้ว',
      cancelled: 'ยกเลิก',
    };
    return labels[status] || status;
  }
}
