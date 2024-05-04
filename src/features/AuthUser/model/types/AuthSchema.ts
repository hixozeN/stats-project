export interface AuthSchema {
  email: string;
  nickname?: string;
  password: string;
  isLoading: boolean;
  error?: string;
}
