import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CheckCodeDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @ApiProperty({ example: '123456', description: '인증 코드' })
  code: string;
}
