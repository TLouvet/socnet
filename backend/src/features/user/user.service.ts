import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserReponse } from './dto/User.response';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async find() {
    return instanceToInstance(await this.userRepository.find()) as UserReponse[];
  }

  findOne(property: string, value: number | string) {
    return this.userRepository.findOneBy({ [`${property}`]: value });
  }

  create(payload: CreateUserDto) {
    return this.userRepository.save(payload);
  }

  update(id: number, payload: User): Promise<UserReponse> {
    throw new NotImplementedException('Method not implemented.');
  }

  async delete(id: number) {
    return this.userRepository.delete({ id });
  }
}
