import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UsersModule } from './users.module';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },

        consumer: {
          groupId: 'user_consumer_group',
        },
      },
    },
  );

  await app.listen();
  console.log('Users microservice is listening on Kafka');
}
bootstrap();
