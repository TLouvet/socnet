import { Module } from '@nestjs/common';
import { AuthServiceImpl } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PasswordServiceImpl } from './service/PasswordServiceImpl.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    {
      provide: 'PasswordService',
      useClass: PasswordServiceImpl,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
