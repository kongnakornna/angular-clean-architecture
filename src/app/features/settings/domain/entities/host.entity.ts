export interface Host {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  type: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
