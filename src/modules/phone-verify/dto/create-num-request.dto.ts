import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNumberRequestDto {
    
    @ApiProperty({
        example: '010-1234-5678',
        description: '사용자 전화번호',
      })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}