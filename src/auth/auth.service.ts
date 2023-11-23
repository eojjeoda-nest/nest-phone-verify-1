import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestSigninCodeDto } from './dto/request-signin-code.dto';
import { SinginCodeResponseDto } from './dto/singin-code-response.dto';
import { SmsCodeDto } from './dto/sms-code.dto';
import { VerifySinginResponseDto } from './dto/verify-singin-response.dto';
import { TTL } from '../util/consts';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { VerifySinginCodeDto } from './dto/verify-singin-code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * SMS 인증번호 요청 :
   * 실제 휴대전화 번호로 전송되는 것이 아니라, 휴대전화 번호를 입력하면 인증번호가 전송된다고 가정한다.
   * 인증번호은 인증 요청시간으로부터 5분간 유효하다고 가정한다.
   * 인증번호 전송시에는 API 응답으로 인증번호를 리턴한다
   */
  async requestSigninCode(
    body: RequestSigninCodeDto,
  ): Promise<SinginCodeResponseDto> {
    const { phone } = body;
    const code = this.generateCode();
    const expires = Date.now() + TTL.VALIDITY_DURATION * 1000;

    const smsCode = this.authRepository.create({
      phone,
      code,
      expires,
    });
    await this.authRepository.save(smsCode);

    return { code };
  }

  /**
   * SMS 인증
   * 인증번호의 유효시간이 5분이 지나면 인증번호가 만료되었다고 반환한다.
   * 인증번호가 일치하는지 확인한다.
   */
  async verifySigninCode(
    param: SmsCodeDto,
    body: VerifySinginCodeDto,
  ): Promise<VerifySinginResponseDto> {
    const { code } = param;
    const { phone } = body;

    const smsCode = await this.authRepository.findOne({
      where: { phone },
    });

    if (!smsCode || smsCode.expires < Date.now()) {
      throw new UnauthorizedException(
        '인증 시간이 만료되었습니다. 다시 시도해 주세요.',
      );
    }

    if (smsCode.code !== code) {
      throw new UnauthorizedException(
        '인증번호가 일치하지 않습니다. 다시 시도해 주세요.',
      );
    }

    return { result: true };
  }
}
