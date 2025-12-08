import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CoursesApiGatewayModule } from './courses-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(CoursesApiGatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
