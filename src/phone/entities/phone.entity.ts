import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  code: string;

  // @Column()
  // isVerified: boolean;

  @Column()
  createdAt: string;
}
