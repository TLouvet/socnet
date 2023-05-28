import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserReponse } from './dto/User.response';
import { CreateUserDto } from './dto/CreateUserDto.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOkResponse({ type: UserReponse, isArray: true })
  find(): Promise<UserReponse[]> {
    return this.userService.find();
  }

  @Get('/:id')
  @ApiOkResponse({ type: UserReponse })
  findOne(@Param('id') id: number): Promise<UserReponse> {
    return this.userService.findOne('id', id);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UserReponse })
  @ApiForbiddenResponse()
  update(@Param('id') id: number, @Body() payload: User): Promise<UserReponse> {
    return this.userService.update(id, payload);
  }

  @Delete('/:id')
  @ApiOkResponse()
  @ApiForbiddenResponse()
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
