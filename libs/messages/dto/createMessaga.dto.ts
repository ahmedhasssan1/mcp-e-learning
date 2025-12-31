import { IsNumber, IsString } from 'class-validator';

export class createMessageDto {
  @IsNumber()
  authorId: number;

  @IsString()
  content: string;

  @IsNumber()
  conversationId: number;
}
