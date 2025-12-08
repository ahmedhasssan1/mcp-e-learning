import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/userRole';
import { AccountStatus } from '../enum/accountStatus';

// @Entity('users')
// @Index(['email'], { unique: true })
// @Index(['userRole'])
// @Index(['accountStatus'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'varchar',
    unique: false,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
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
    type: 'text',
    nullable: true,
  })
  bio?: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth?: Date;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
    nullable: false,
  })
  @Index()
  userRole: UserRole;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
    nullable: false,
  })
  accountStatus: AccountStatus;

  @Column({
    type: 'boolean',
    default: false,
  })
  emailVerified: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPremium: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastLoginAt?: Date;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'UTC',
  })
  timezone: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'en',
  })
  languagePreference: string;


}
