import { ApiProperty } from '@nestjs/swagger';

export class CheckCertificationCodeResponseDto {
  @ApiProperty({
    description: '인증 성공 여부',
    example: 'true',
  })
  result: boolean;
}
