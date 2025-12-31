import { Controller, Get, Post } from '@nestjs/common';
import { CoursesApiGatewayService } from './courses-api-gateway.service';

@Controller()
export class CoursesApiGatewayController {
  constructor(private readonly coursesApiGatewayService: CoursesApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.coursesApiGatewayService.getHello();
  }
  

}
