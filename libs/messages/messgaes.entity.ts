import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("messages")
export class Messages{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNumber()
    authorId:number

    @Column()
    @IsString()
    message:string

    @Column()
    conversationId:number
    
}