import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PhoneVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  code: string;

  @UpdateDateColumn()
  sendAt: Date;

  @Column()
  isVerified: boolean;
}
