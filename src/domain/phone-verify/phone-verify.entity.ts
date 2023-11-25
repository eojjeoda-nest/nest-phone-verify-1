import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PhoneVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  phoneNumber: string;

  @Column()
  verifyCode: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  expiredAt: Date;
}
