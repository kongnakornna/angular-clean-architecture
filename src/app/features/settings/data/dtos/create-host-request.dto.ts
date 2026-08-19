export interface CreateHostRequestDto {
  name: string;
  ipAddress: string;
  port: number;
  type: string;
  status: boolean;
}
