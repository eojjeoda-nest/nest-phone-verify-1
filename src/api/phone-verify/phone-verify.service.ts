import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/phone-verify.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneVerifyService {
  constructor(
    @InjectRepository(PhoneVerify)
    private readonly phoneVerifyRepository: Repository<PhoneVerify>,
  ) {}

  // 인증번호 생성
  async send(phoneNumber: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.phoneVerifyRepository.save({
      phoneNumber,
      code,
      sendAt: new Date(),
    });
    return code;
  }

  // 인증번호 입력
  async verify(phoneNumber: string, code: string): Promise<boolean> {
    const verification = await this.phoneVerifyRepository.findOne({
      where: {
        phoneNumber,
        code,
      },
    });

    const currentTime = new Date();
    const diffTime =
      currentTime.getMinutes() - verification.sendAt.getMinutes();

    if (!verification) {
      throw new NotFoundException('인증번호가 일치하지 않습니다.');
    }

    if (diffTime <= 5) {
      return true;
    } else {
      throw new NotFoundException('인증번호 유효 시간이 만료되었습니다.');
    }
  }
}
