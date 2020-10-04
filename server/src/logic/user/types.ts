export interface UserInput {
  username: string;
  password: string;
}
export interface AuthenticateUserInput {
  user: UserInput;
  sessionData?: {
    ip?: string;
    userAgent?: string;
  };
}
