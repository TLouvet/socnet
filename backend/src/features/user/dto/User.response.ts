import { ApiProperty } from '@nestjs/swagger';

export class UserReponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
