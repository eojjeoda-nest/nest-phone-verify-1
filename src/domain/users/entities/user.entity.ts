import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AuthCode } from './auth-code.entity';

@Entity({ name: 'USERS' })
export class User {
  @PrimaryColumn()
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
