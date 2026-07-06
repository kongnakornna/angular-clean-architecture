import { QuotationStatus } from '../../../../core/constants/enums';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  status: QuotationStatus;
  validUntil: Date;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
