export interface AnalystKPI {
  revenue: string;
  revenueDelta: number;
  users: string;
  usersDelta: number;
  orders: number;
  ordersDelta: number;
  avgRating: number;
  ratingDelta: number;
}

export interface DataInsight {
  id: string;
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  source: string;
  createdAt: string;
}

export interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}
