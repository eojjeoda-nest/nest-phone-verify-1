import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class verifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '전화번호', default: '010-1234-5678' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '인증번호', default: '123456' })
  code: string;
}
