import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@app/contracts/users/user.dto';
import { User } from '@app/contracts/users/entity/users.entity';
import { throws } from 'assert';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject(QueueName.KAFKA_SERVICE) private usersClient: ClientKafka,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  onModuleInit() {
    // this.usersClient.subscribeToResponseOf('get_user');
  }
  findAll() {
    return this.userRepo.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // Check for duplicates by email or username
      const existingUser = await this.userRepo.findOne({
        where: { email: createUserDto.email },
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
  async findOneByEmail(email: string) {
    console.log('get uyser data');
    return await this.userRepo.findOne({where:{email}})
    
  }
  async deleteOne(id:numebr){
    const user=await this.userRepo.delete(id);
    
  }
}
