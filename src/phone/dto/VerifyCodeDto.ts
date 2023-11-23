import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class VerifyCodeDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '010-1234-5678', description: '전화번호' })
    @Matches(/^010-\d{4}-\d{4}$/, { message: '잘못된 전화번호 형식입니다' })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6, { message: '코드는 6자리 숫자여야 합니다' })
    @ApiProperty({ example: '123456', description: '코드' })
    code: string;
}
