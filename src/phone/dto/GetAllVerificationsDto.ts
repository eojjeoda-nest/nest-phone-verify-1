import { ApiProperty } from '@nestjs/swagger';
import { VerifyCodeDto } from './VerifyCodeDto';

export class GetAllVerificationsDto {
  @ApiProperty({
    type: [VerifyCodeDto],
    description: '저장된 모든 전화번호와 그 인증 코드 목록'
  })
  verifications: VerifyCodeDto[];
}
