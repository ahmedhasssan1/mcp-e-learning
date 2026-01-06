import { User } from '@app/contracts/users/entity/users.entity';
import { LoginDto } from '@app/contracts/users/login.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueName } from 'apps/courses-api-gateway/enums/queue-name';
import { UsersService } from 'apps/users/src/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService, // Fixed typo
    @Inject(QueueName.KAFKA_SERVICE) private readonly authClient: ClientKafka,
    @InjectRepository(User) private readonly userRepo: Repository<User>, // Fixed naming
    private jwtservicec: JwtService,

  ) {}


  async login(data: LoginDto) {
    const user_exist = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (!user_exist) {
      return { message: 'user not eexist' };
    }
    const check =await bcrypt.compare(data.password, user_exist.password);
    if (!check) {
      return 'inccorect pasword';
    }
    const payload = { sub: user_exist.id, email: user_exist.email };
    const token = await this.jwtservicec.signAsync(payload);
    
    
    return token;
  }
  async  findOneByEmail(email:string){
    const user_exist=await this.userRepo.findOne({where:{email}});
    if(!user_exist){
      return  false
    }
    return user_exist;  
  }
}
