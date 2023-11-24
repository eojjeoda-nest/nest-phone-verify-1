import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateCertificationPhoneRequestDto {
  @ApiProperty({
    example: '01092274072',
    description: '인증 해야하는 휴대폰 번호',
  })
  @MinLength(11, { message: '휴대폰 번호는 최소 11자리입니다.' })
  @MaxLength(11, { message: '휴대폰 번호는 최대 11자리입니다.' })
  @IsNotEmpty({ message: '휴대폰 번호를 입력해주세요.' })
  @Matches(/^[0-9]*$/, { message: '휴대폰 번호는 숫자만 입력해주세요.' })
  phoneNumber: string;
}
