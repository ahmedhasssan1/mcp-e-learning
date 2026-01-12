import { IsNumber, IsString } from 'class-validator';

export class createMessageDto {

  @IsString()
  content: string;

  @IsNumber()
  conversationId: number;
}


export class savedMwssage {
  @IsNumber()
  authorId: number;

  @IsString()
  content: string;

  @IsNumber()
  conversationId: number;
}
