import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Repository } from 'typeorm';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@app/contracts/users/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private usersClient: ClientProxy,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // Check for duplicates by email or username
      const existingUser = await this.userRepo.findOne({
       where:{email:createUserDto.email} 
      });

      if (existingUser) {
        // Return safely without throwing to avoid Kafka infinite retry
        return { status: 'skipped', reason: 'User already exists' };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = this.userRepo.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepo.save(newUser);

      // Optionally, emit to Kafka after saving
      // await this.usersClient.emit('order_create', savedUser);

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);

      // Only throw internal error if really unexpected
      throw new InternalServerErrorException('Failed to create user');
    }

  }
  async findOneByEmail(email:string){
    const user=await this.userRepo.findOne({where:{email}});
    if(!user){
      return  {reason:"this email not ecist in this web"}
    }
    console.log('debugging login from micro service');
    
    return user;
  }
}
