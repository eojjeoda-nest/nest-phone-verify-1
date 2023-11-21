import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateNumberRequestDto {
    
    @ApiProperty({
        example: '010-1234-5678',
        description: '사용자 전화번호',
      })
    @Matches(
      /^\d{3}-\d{4}-\d{4}$/,
      {message: '전화번호를 다시 입력해주세요!'}
    )
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}