import { Injectable } from '@nestjs/common';
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
}