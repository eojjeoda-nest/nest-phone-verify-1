import { DateEntity } from 'src/common/entity/common.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CertificationPhoneEntity extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  phoneNumber: string

  @Column()
  certificationCode: string

  //TODO: 유효시간 default 설정하기 ? 아니면 서비스에서 설정하기 ?
  @Column()
  expiredAt: Date

  @Column({ default: false })
  isVerified: boolean
}
