import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserReponse } from './dto/User.response';
import { RegisterRequestDto } from '../auth/payload/RegisterRequest.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  find() {
    return this.userRepository.find();
  }

  findOne(property: string, value: number | string) {
    return this.userRepository.findOneBy({ [`${property}`]: value });
  }

  create(payload: RegisterRequestDto) {
    return this.userRepository.save(payload);
  }

  update(id: number, payload: User): Promise<UserReponse> {
    throw new NotImplementedException('Method not implemented.');
  }

  async delete(id: number) {
    return this.userRepository.delete({ id });
  }
}
