import { ApiProperty } from '@nestjs/swagger'

export class CheckCertificationCodeResponseDto {
  @ApiProperty({
    description: `
    [ 인증 상태에 따른 응답 ]

    - SUCCESS: 인증 성공
    - EXPIRED: 인증 만료
    - INVALID: 인증번호 불일치
    - ALREADY_VERIFIED: 이미 인증된 번호
    - NOT_FOUND: 인증번호 발급되지 않은 번호
    `,
    example: 'SUCCESS',
  })
  certificationCodeStatus: CheckCertificationCodeStatus
}

export const CHECK_CERTIFICATION_CODE_STATUS = {
  SUCCESS: 'SUCCESS',
  EXPIRED: 'EXPIRED',
  INVALID: 'INVALID',
  ALREADY_VERIFIED: 'ALREADY_VERIFIED',
  NOT_FOUND: 'NOT_FOUND',
} as const

export type CheckCertificationCodeStatus =
  (typeof CHECK_CERTIFICATION_CODE_STATUS)[keyof typeof CHECK_CERTIFICATION_CODE_STATUS]
