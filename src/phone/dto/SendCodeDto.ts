import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendCodeDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '010-1234-5678', description: '전화번호' })
    @Matches(/^010-\d{4}-\d{4}$/, { message: '잘못된 전화번호 형식입니다' })
    phoneNumber: string;
}
