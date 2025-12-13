import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CoursesAppModule } from './courses.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoursesAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },

        consumer: {
          groupId: 'courses_consumer_groupe',
        },
      },
    },
  );
  await app.listen();
  console.log('Courses microservice is listening on kafka');
}
bootstrap();
