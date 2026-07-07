export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    status: string;
    phoneNumber: string;
    profileImageUrl: string | null;
    role: string;
  };
}
