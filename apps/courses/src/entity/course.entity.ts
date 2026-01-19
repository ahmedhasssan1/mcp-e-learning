import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CourseName: string;
}
