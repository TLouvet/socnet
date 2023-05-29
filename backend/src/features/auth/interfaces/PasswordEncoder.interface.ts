export interface PasswordService {
  encode(password: string): string;
  compare(password: string, hash: string): boolean;
}
