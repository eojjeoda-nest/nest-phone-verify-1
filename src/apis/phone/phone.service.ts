import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async issue(phoneNumber: string): Promise<string> {
    // 무작위 인증번호 생성
    const authCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    // 사용자 검색
    let phone = await this.phoneRepository.findOne({ where: { phoneNumber } });

    if (phone) {
      // 사용자가 이미 존재하면, 인증번호 업데이트
      phone.code = authCode;
    } else {
      // 사용자가 존재하지 않으면, 사용자 생성
      phone = this.phoneRepository.create({ phoneNumber, code: authCode });
    }

    // 변경사항 저장
    await this.phoneRepository.save(phone);

    return authCode;
  }

  async verify(phoneNumber: string, authCode: string): Promise<boolean> {
    // 사용자 검색
    let phone = await this.phoneRepository.findOne({ where: { phoneNumber } });
    const now = new Date();
    const diffMin = now.getMinutes() - phone.issuedAt.getMinutes();

    // 사용자가 존재 && 인증번호가 일치 && 5분 이내
    if (phone && phone.code === authCode && diffMin < 5) {
      // 인증여부 변경
      phone.isVerified = true;
      // 변경사항 저장
      await this.phoneRepository.save(phone);
      return true;
    }

    return false;
  }
}
