import { Module } from '@nestjs/common';
import { CoursesApiGatewayController } from './courses-api-gateway.controller';
import { CoursesApiGatewayService } from './courses-api-gateway.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UsersModule, CoursesModule],
  controllers: [CoursesApiGatewayController],
  providers: [CoursesApiGatewayService],
})
export class CoursesApiGatewayModule {}
