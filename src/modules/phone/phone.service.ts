import { BadRequestException, Injectable } from '@nestjs/common';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async sendCode(phoneNumber: string): Promise<{ code: string }> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.phoneRepository.delete({ phoneNumber });

    await this.phoneRepository.save({
      phoneNumber,
      code,
      timestamp: new Date(),
    });

    return { code };
  }

  async verifyCode(phoneNumber: string, code: string): Promise<{ result: boolean }> {
    const phoneRecord = await this.phoneRepository.findOne({
      where: { phoneNumber, code }
    });

    if (!phoneRecord) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    const currentTime = new Date();
    const codeTimestamp = new Date(phoneRecord.timestamp);
    const difference = currentTime.getTime() - codeTimestamp.getTime();
    const minutesDifference = difference / 60000;

    if (minutesDifference > 5) {
      throw new BadRequestException('인증번호가 만료되었습니다.');
    }

    return { result: true };
  }
}