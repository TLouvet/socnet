import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from '../payload/LoginRequest.dto';
import { RegisterRequestDto } from '../payload/RegisterRequest.dto';
import { AuthService } from '../interfaces/AuthService.interface';
import { PasswordService } from '../interfaces/PasswordEncoder.interface';
import { LoginResponse } from '../payload/Login.response';
import { UserService } from 'src/features/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject('PasswordService')
    private readonly passwordService: PasswordService,
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.userService.findOne('email', loginDto.email);

    if (!user || !this.passwordService.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    return { token: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterRequestDto): Promise<string> {
    try {
      await this.userService.create({
        email: registerDto.email,
        password: this.passwordService.encode(registerDto.password),
      });
    } catch (e) {
      throw new BadRequestException();
    }

    return 'This action returns a token';
  }
}
