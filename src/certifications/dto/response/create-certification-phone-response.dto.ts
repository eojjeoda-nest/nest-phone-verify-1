import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificationPhoneResponseDto {
  // TODO: 반환할 때 유효성 검사를 해야하나? 한다면 어떻게 하나? validation pipe가 먹지 않는다.
  @ApiProperty({
    example: '01092274072',
    description: '인증 보낸 휴대폰 번호',
  })
  phoneNumber: string;

  @ApiProperty({
    example: '990209',
    description: '인증번호',
  })
  certificationCode: string;
}
