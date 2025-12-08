import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServiceName } from '../enums/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroServiceName.USERSSERVICE,
        transport: Transport.REDIS,
        options: {
          host:"localhost",
          port:6379
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class UsersClientsModule {}
export class usersClientModule {}
