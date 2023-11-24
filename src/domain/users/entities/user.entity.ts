import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AuthCode } from './auth-code.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'USERS' })
export class User {
  @PrimaryColumn()
  @ApiProperty({ description: 'phoneNumber' })
  phoneNumber: string;
  @OneToMany(() => AuthCode, (authCode) => authCode.user)
  @ApiProperty({ description: 'authCodes' })
  authCodes: AuthCode[];
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
