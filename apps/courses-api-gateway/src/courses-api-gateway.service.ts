import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
