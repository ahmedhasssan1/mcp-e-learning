import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CoursesApiGatewayModule } from './courses-api-gateway.module';
import * as cookieParser from 'cookie-parser';
import { WebsocketGateway } from './websocket/websocket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(CoursesApiGatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const gt = app.get(WebsocketGateway);
  setInterval(() => gt.SendMessage(), 3000);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
