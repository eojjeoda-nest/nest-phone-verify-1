import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthCode } from './auth-code.entity';

@Entity({ name: 'USERS' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column()
  phoneNumber: string;
  @OneToMany(() => AuthCode, (authCode) => authCode.user)
  authCodes: AuthCode[];
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
