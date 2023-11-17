import { Injectable } from '@nestjs/common';
import { RequestSigninTokenDto } from './dto/request-signin-token.dto';

@Injectable()
export class AuthService {
  private readonly tokenValidityDuration = 300000;

  async requestSigninToken(
    body: RequestSigninTokenDto,
  ): Promise<{ code: string }> {
    /**
     * TODO:
     * 실제 휴대전화 번호로 전송되는 것이 아니라, 휴대전화 번호를 입력하면 인증번호가 전송된다고 가정한다.
     * 인증번호은 인증 요청시간으로부터 5분간 유효하다고 가정한다.
     * 인증번호 전송시에는 API 응답으로 인증번호를 리턴한다
     */
    const { phoneNumber } = body;
    const code = this.generateToken();
    const validUntil = new Date(Date.now() + this.tokenValidityDuration);
    return { code };
  }

  private generateToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
