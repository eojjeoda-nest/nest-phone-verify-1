import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'AUTHCODE' })
export class AuthCode {
  @PrimaryGeneratedColumn({ name: 'id' })
  @ApiProperty({ description: 'id' })
  id: number;
  @Column()
  @ApiProperty({ description: 'code' })
  code: string;
  @ManyToOne(() => User, (user) => user.authCodes)
  user: User;
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
