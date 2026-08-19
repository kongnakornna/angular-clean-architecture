export interface CreateLocationRequestDto {
  name: string;
  typeName: string;
  emailId: string;
  bucket: string;
  org: string;
  deviceCount: number;
  status: boolean;
}
