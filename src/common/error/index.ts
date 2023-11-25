import { UnauthorizedException } from '@nestjs/common';

/* 401 Unauthorized */
export class AuthFailedException extends UnauthorizedException {
  constructor(message?: string, code?: string) {
    super(message ?? '인증에 실패하였습니다.', code ?? 'AUTH_FAILED');
  }
}
