import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { CODE_LENGTH } from 'src/certifications/utils/createRandomCertificationCode';

export class CheckCertificationCodeRequestDto {
  @ApiProperty({
    description: '인증 해야하는 휴대폰 번호',
    example: '01092274072',
  })
  // TODO: context를 활용하는가? type은 언제 사용하는가?
  @MinLength(11, { message: '휴대폰 번호는 최소 11자리입니다.' })
  @MaxLength(11, { message: '휴대폰 번호는 최대 11자리입니다.' })
  @IsNotEmpty({ message: '휴대폰 번호를 입력해주세요.' })
  @Matches(/^[0-9]*$/, { message: '휴대폰 번호는 숫자만 입력해주세요.' })
  phoneNumber: string;

  @ApiProperty({
    description: '인증번호',
    example: '990209',
  })
  @MinLength(CODE_LENGTH, { message: '인증번호는 최소 6자리입니다.' })
  @MaxLength(CODE_LENGTH, { message: '인증번호는 최대 6자리입니다.' })
  @IsNotEmpty({ message: '인증번호를 입력해주세요.' })
  certificationCode: string;
}
