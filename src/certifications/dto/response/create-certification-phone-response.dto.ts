import { ApiProperty } from '@nestjs/swagger'

export class CreateCertificationPhoneResponseDto {
  @ApiProperty({
    example: '01092274072',
    description: '인증 보낸 휴대폰 번호',
  })
  phoneNumber: string

  @ApiProperty({
    example: '990209',
    description: '인증번호',
  })
  certificationCode: string
}
