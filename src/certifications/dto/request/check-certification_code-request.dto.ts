import { ApiProperty } from '@nestjs/swagger'

export class CheckCertificationCodeRequestDto {
  @ApiProperty({
    description: '인증 해야하는 휴대폰 번호',
    example: '01092274072',
  })
  phoneNumber: string

  @ApiProperty({
    description: '인증번호',
    example: '990209',
  })
  certificationCode: string
}
