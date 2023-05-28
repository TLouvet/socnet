import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from '../payload/LoginRequest.dto';
import { RegisterRequestDto } from '../payload/RegisterRequest.dto';
import { AuthService } from '../interfaces/AuthService.interface';
import { PasswordService } from '../interfaces/PasswordEncoder.interface';
import { LoginResponse } from '../payload/Login.response';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject('PasswordService')
    private readonly passwordService: PasswordService,
    @Inject(UserService) private userService: UserService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.userService.findOne('email', loginDto.email);

    if (
      !user ||
      !this.passwordService.decode(loginDto.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    return { token: 'This action returns a token' };
  }

  async register(registerDto: RegisterRequestDto): Promise<string> {
    const user = await this.userService.findOne('email', registerDto.email);

    if (user) {
      throw new BadRequestException();
    }

    const hashedPassword = this.passwordService.encode(registerDto.password);

    await this.userService.create({
      email: registerDto.email,
      password: hashedPassword,
    });

    return 'This action returns a token';
  }
}
