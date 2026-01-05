import { LoginDto } from '@app/contracts/users/login.dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private readonly AuthClient: ClientKafka,
    private jwtService: JwtService,
  ) {}
  async onModuleInit() {
    this.AuthClient.subscribeToResponseOf('auth_login');
    await this.AuthClient.connect();
  }
  async login(userData: LoginDto) {
    console.log('user data logiun', userData);
    const result = await firstValueFrom(
      this.AuthClient.send('auth_login', userData).pipe(timeout(5000)),
    );
    return result;
  }
  async verfiytoken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: '1123',
    });
    
    console.log('conosle payload ',payload);
    
    return true;
  }
}
