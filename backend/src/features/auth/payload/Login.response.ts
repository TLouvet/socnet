import { ApiProperty } from '@nestjs/swagger';
import { ILoginResponse } from '../interfaces/LoginResponse.interface';

export class LoginResponse implements ILoginResponse {
  @ApiProperty()
  token: string;
}
