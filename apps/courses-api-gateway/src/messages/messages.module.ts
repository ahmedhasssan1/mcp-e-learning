import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'libs/messages/messgaes.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Messages])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
