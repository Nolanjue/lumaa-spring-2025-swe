import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//so main.ts is the listener, module is the connecteor between controller, which maps endpoints to specific function calls
// and also which is a router because it maps endpoints to the service functions) and the functions(service.ts)
//injectable(in service.ts) is the endpoint configuration. 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
