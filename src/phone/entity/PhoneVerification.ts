import { Entity, Column } from "typeorm";

@Entity()
export class PhoneVerification {
    @Column("전화번호")
    phoneNumber: string;

    @Column("코드")
    code: string;

    @Column("시간")
    timestamp: Date;
}

