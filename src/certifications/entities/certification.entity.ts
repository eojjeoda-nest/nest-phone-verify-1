import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class CertificationPhone {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    phoneNumber: string

    @Column()
    code: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
}
