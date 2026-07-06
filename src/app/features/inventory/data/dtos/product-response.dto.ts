export interface ProductResponseDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName: string;
  unit: string;
  price: number;
  cost: number;
  currentStock: number;
  minimumStock: number;
  barcode?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovementResponseDto {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjust';
  quantity: number;
  beforeStock: number;
  afterStock: number;
  reference: string;
  note: string;
  createdBy: string;
  createdAt: string;
}
