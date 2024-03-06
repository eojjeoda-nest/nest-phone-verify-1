import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '010-1111-1111',
    description: '전화번호',
  })
  @Matches(/^010-\d{4}-\d{4}$/, {
    message: '휴대전화 번호는 반드시 형식에 맞게 작성해야합니다.',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456',
    description: '인증번호',
  })
  @Length(6, 6, {
    message: '코드는 여섯자리입니다.'
  })
  code: string;
}