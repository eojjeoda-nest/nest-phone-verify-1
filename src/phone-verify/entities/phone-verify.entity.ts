import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PhoneVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiredAt: Date;

  @Column({ default: false })
  isVerified: boolean;
}
