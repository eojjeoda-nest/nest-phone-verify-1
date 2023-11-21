import { ApiProperty } from '@nestjs/swagger'

export class CreateCertificationPhoneRequestDto {
  @ApiProperty({
    example: '01092274072',
    description: '인증 해야하는 휴대폰 번호',
  })
  phoneNumber: string
}
