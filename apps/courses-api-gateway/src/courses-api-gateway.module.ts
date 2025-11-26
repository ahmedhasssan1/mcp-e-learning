import { Module } from '@nestjs/common';
import { CoursesApiGatewayController } from './courses-api-gateway.controller';
import { CoursesApiGatewayService } from './courses-api-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CoursesApiGatewayController],
  providers: [CoursesApiGatewayService],
})
export class CoursesApiGatewayModule {}
