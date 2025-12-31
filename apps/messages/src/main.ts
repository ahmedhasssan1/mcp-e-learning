import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { MessagesModule } from './messages.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MessagesModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },

        consumer: {
          groupId: 'message_consumer',
        },
      },
    },
  );

  await app.listen();
  console.log('messgaes microservice is listening on Kafka');
}
bootstrap();
