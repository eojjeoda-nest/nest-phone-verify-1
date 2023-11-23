import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  phone: string;

  @Column()
  code: string;

  // 밀리초 단위의 타임스탬프 데이터를 정확하고 안정적으로 저장하기 위함
  @Column('bigint')
  expires: number;
}
