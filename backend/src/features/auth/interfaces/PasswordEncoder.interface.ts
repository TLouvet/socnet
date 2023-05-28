export interface PasswordService {
  encode(password: string): string;
  decode(password: string, hash: string): boolean;
}
