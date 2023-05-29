import { Module } from '@nestjs/common';
import { AuthServiceImpl } from './service/auth.service';
import { AuthController } from './auth.controller';
import { PasswordServiceImpl } from './service/PasswordServiceImpl.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    {
      provide: 'PasswordService',
      useClass: PasswordServiceImpl,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
