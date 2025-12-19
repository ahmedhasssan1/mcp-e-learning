import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';

@Injectable()
export class AuthService {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private readonly usersClient: ClientKafka,
  ) {}
  
}
