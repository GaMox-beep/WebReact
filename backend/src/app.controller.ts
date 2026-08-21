import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'online',
      name: 'WebNovel RESTful API',
      version: '1.0.0',
      message: 'WebNovel RESTful API is running successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
