import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordService } from '../interfaces/PasswordEncoder.interface';

@Injectable()
export class PasswordServiceImpl implements PasswordService {
  encode(password: string): string {
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(password, saltOrRounds);
    return hash;
  }

  compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
