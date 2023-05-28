import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoginRequestDto } from '../payload/LoginRequest.dto';
import { RegisterRequestDto } from '../payload/RegisterRequest.dto';
import { AuthService } from '../interfaces/AuthService.interface';
import { LoginResponse } from '../payload/Login.response';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AuthService') private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponse })
  login(@Body() loginDto: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterRequestDto): Promise<string> {
    return this.authService.register(registerDto);
  }
}
