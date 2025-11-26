import { NestFactory } from '@nestjs/core';
import { CoursesApiGatewayModule } from './courses-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(CoursesApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
