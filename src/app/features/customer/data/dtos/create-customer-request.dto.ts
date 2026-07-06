export interface CreateCustomerRequestDto {
  code: string;
  companyName: string;
  taxId?: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  postalCode: string;
  contacts: Array<{ firstName: string; lastName: string; phone: string; email: string; position: string; isPrimary: boolean }>;
  notes?: string;
}
