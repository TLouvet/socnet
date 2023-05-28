import { LoginResponse } from '../payload/Login.response';
import { LoginRequestDto } from '../payload/LoginRequest.dto';
import { RegisterRequestDto } from '../payload/RegisterRequest.dto';

export interface AuthService {
  login(loginDto: LoginRequestDto): Promise<LoginResponse>;
  register(registerDto: RegisterRequestDto): Promise<string>;
}
