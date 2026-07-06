export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  conversionRate: number;
  pendingApprovals: number;
  lowStockItems: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: Date;
  type: string;
}
