import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'the app is running' })
  @ApiOperation({ summary: 'test if the app is available ' })
  getHello(): string {
    return this.appService.getHello();
  }
}
