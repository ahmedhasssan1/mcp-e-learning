import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/contracts/users/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo:Repository<User>){}
  getHello() {
    return 'data from user appppp';
  }
  async create(createUser:CreateUserDto){
    await this.UserRepo.create()
  }
}
