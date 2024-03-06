import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 13 })
  phoneNumber: string;

  @Column({ length: 6 })
  code: string;

  @UpdateDateColumn() //TypeORM에서 제공하는 수정여부 타임스탬프
  issuedAt: Date;

  @Column({ default: false })
  isVerified: boolean;
}
