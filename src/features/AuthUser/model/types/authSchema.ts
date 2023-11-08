export interface AuthSchema {
  email: string;
  username?: string;
  password: string;
  isLoading: boolean;
  error?: string;
}
