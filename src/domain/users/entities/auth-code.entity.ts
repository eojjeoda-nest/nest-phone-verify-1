import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'AUTHCODE' })
export class AuthCode {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column()
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
