import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,   // VERY IMPORTANT
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: process.env.DB_HOST,
      port: 3306, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true, 
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
