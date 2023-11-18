import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './phone-verify.entity';
import { Repository } from 'typeorm';
import { VerifyCodeRequestDto } from './dto/request/verify-code-request.dto';
import { VerifyCodeResponseDto } from './dto/response/verify-code-response.dto';
import { generateNumericToken } from '../../common/util';

const VERIFY_CODE_VALID_TIME = 5;

@Injectable()
export class PhoneVerifyService {
  constructor(
    @InjectRepository(PhoneVerify)
    private readonly phoneVerifyRepository: Repository<PhoneVerify>,
  ) {}

  async sendVerifyCode(
    dto: VerifyCodeRequestDto,
  ): Promise<VerifyCodeResponseDto> {
    const verifyCode = generateNumericToken();

    const expiredDate = new Date();
    expiredDate.setMinutes(expiredDate.getMinutes() + VERIFY_CODE_VALID_TIME);

    const phoneVerify = new PhoneVerify();
    phoneVerify.verifyCode = verifyCode;
    phoneVerify.phoneNumber = dto.phoneNumber;
    phoneVerify.expiredAt = expiredDate;

    await this.phoneVerifyRepository.save(phoneVerify);

    const response = new VerifyCodeResponseDto();
    response.code = verifyCode;

    return response;
  }
}
