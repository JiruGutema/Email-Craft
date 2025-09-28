import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags, ApiOkResponse, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary: 'Server Health Check'})
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns a welcome message',
    schema: {
      example: { message: 'OK' },
      type: 'object',
      properties: {
        message: { type: 'string', example: 'OK' }
      }
    }
  })

  health() {
    return this.appService.health();
  }
}
