import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './entities/phone-verify.entity';
import { Repository } from 'typeorm';
import { SendCodeResponseDto } from './dto/response/send-code-response.dto';
import { SendCodeRequestDto } from './dto/request/send-code-request.dto';
import { VerifyCodeRequestDto } from './dto/request/verify-code-request.dto';
import { VerifyCodeResponseDto } from './dto/response/verify-code-response.dto';

@Injectable()
export class PhoneVerifyService {
  constructor(
    @InjectRepository(PhoneVerify)
    private phoneRepository: Repository<PhoneVerify>,
  ) {}

  async sendCode(dto: SendCodeRequestDto): Promise<SendCodeResponseDto> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const createdAt = new Date();
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);

    const phoneVerify = new PhoneVerify();
    phoneVerify.phoneNumber = dto.phoneNumber;
    phoneVerify.code = code;
    phoneVerify.createdAt = createdAt;
    phoneVerify.expiredAt = expiredAt;

    await this.phoneRepository.save(phoneVerify);

    const response = new SendCodeResponseDto();
    response.code = code;

    return response;
  }

  async verifyCode(dto: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    const phoneRecord = await this.phoneRepository.findOne({
      where: { phoneNumber: dto.phoneNumber, code: dto.code },
    });

    const response = new VerifyCodeResponseDto();
    if (!phoneRecord) {
      response.result = false;
      return response;
    }

    phoneRecord.isVerified = true;
    await this.phoneRepository.save(phoneRecord);
    response.result = true;
    return response;
  }
}
