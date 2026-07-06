export interface CustomerResponseDto {
  id: string;
  code: string;
  companyName: string;
  taxId?: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  postalCode: string;
  contacts: Array<{ id: string; firstName: string; lastName: string; phone: string; email: string; position: string; isPrimary: boolean }>;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
