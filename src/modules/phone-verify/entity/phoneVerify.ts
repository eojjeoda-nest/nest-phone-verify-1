import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PhoneVerify {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phoneNumber: string;

    @Column({default: null})
    code: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}