export interface ApiResponseDto<T> {
  is_success: boolean;
  data: T;
  error?: {
    status: number;
    statusText: string;
    msg: string;
  };
}