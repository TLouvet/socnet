import { ApiProperty } from '@nestjs/swagger';

export class UserReponse {
  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
