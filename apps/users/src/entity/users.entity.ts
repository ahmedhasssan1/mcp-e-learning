    import { Exclude } from 'class-transformer';
    import {
      Column,
      Entity,
      PrimaryGeneratedColumn,
    } from 'typeorm';
    import { UserRole } from '../enum/userRole';


    @Entity('users')
    export class User {
      @PrimaryGeneratedColumn()
      userId: number;

      @Column({
        type: 'varchar',
        // unique: false,
        nullable: false,
      })
      email: string;

      @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
      })
      username: string;

      @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
      })
      @Exclude() // Exclude password from JSON responses
      password: string;

      @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
      })
      firstName?: string;

      @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
      })
      lastName?: string;

      @Column({
        type: 'text',
        nullable: true,
      })
      profilePictureUrl?: string;
      
      @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
        nullable: false,
      })
      userRole: UserRole;



    }
