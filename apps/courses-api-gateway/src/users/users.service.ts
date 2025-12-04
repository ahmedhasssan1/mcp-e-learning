import { CreateUserDto } from '@app/contracts/users/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private userClient: ClientProxy) {}

  findAll() {
    return this.userClient.send('users.findAll', {});
  }
  async create(createUser: CreateUserDto) {
    await this.userClient.send('createUser',{createUser});
  }
}
