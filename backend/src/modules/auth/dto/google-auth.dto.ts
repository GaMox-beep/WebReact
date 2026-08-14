export interface GoogleProfileDto {
  providerId: string;
  email: string;
  emailVerified: boolean;
  displayName?: string | null;
  avatar?: string | null;
}

export interface GoogleAuthResult {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    avatar: string | null;
    coins: number;
  };
  accessToken: string;
  refreshToken: string;
}
