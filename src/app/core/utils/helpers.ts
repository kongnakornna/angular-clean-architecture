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
      low: 'common.priorityLow',
      medium: 'common.priorityMedium',
      high: 'common.priorityHigh',
      urgent: 'common.priorityUrgent',
    };
    return labels[priority] || priority;
  }

  static getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: 'common.statusPending',
      assigned: 'common.statusAssigned',
      in_progress: 'common.statusInProgress',
      on_hold: 'common.statusOnHold',
      completed: 'common.statusCompleted',
      closed: 'common.statusClosed',
      draft: 'common.statusDraft',
      sent: 'common.statusSent',
      under_review: 'common.statusUnderReview',
      approved: 'common.statusApproved',
      rejected: 'common.statusRejected',
      converted_to_po: 'common.statusConvertedToPo',
      paid: 'common.statusPaid',
      failed: 'common.statusFailed',
      refunded: 'common.statusRefunded',
      delivered: 'common.statusDelivered',
      shipped: 'common.statusShipped',
      cancelled: 'common.statusCancelled',
    };
    return labels[status] || status;
  }
}
