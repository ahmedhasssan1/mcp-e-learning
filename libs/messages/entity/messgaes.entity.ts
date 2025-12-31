import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  content: string;

  @Column()
  conversationId: number;
}
