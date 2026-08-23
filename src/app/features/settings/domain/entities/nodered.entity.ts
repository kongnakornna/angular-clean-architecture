export interface NodeRed {
  id: string;
  name: string;
  url: string;
  adminUrl: string;
  flows: any[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
