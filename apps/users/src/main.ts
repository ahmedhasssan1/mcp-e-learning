import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UsersModule } from './users.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { MicroServiceName } from 'apps/courses-api-gateway/enums/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.REDIS,
      options: {
        host: '192.168.116.128',
        port: 6379,
      },
    },
  );

 
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
  console.log('Users microservice is listening on port 3001');
}
bootstrap();
