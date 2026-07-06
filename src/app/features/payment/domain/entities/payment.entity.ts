import { PaymentStatus } from '../../../../core/constants/enums';

export interface Payment {
  id: string;
  paymentNumber: string;
  invoiceId?: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: PaymentStatus;
  reference?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  paymentId: string;
  customerId: string;
  customerName: string;
  items: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  issuedDate: Date;
  dueDate: Date;
  paidDate?: Date;
}
