export interface CustomerContact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  position: string;
  isPrimary: boolean;
}

export interface Customer {
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
  contacts: CustomerContact[];
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
