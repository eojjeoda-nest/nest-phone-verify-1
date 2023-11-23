import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneVerify } from './phone-verify.entity';
import { Repository } from 'typeorm';
import { PhoneVerifyCodeRequestDto } from './dto/request/phone-verify-code-request.dto';
import { PhoneVerifyCodeResponseDto } from './dto/response/phone-verify-code-response.dto';
import { generateNumericToken } from '../../common/util';
import { PhoneVerifyRequestDto } from './dto/request/phone-verify-request.dto';
import { PhoneVerifyResponseDto } from './dto/response/phone-verify-response.dto';
import { AuthFailedException } from '../../common/error';
import { Messages } from '../../common/constant';

const VERIFY_CODE_VALID_TIME = 5;

@Injectable()
export class PhoneVerifyService {
  constructor(
    @InjectRepository(PhoneVerify)
    private readonly phoneVerifyRepository: Repository<PhoneVerify>,
  ) {}

  async sendVerifyCode(
    dto: PhoneVerifyCodeRequestDto,
  ): Promise<PhoneVerifyCodeResponseDto> {
    const verifyCode = generateNumericToken();

    const expiredDate = new Date();
    expiredDate.setMinutes(expiredDate.getMinutes() + VERIFY_CODE_VALID_TIME);

    const phoneVerify = new PhoneVerify();
    phoneVerify.verifyCode = verifyCode;
    phoneVerify.phoneNumber = dto.phoneNumber;
    phoneVerify.expiredAt = expiredDate;

    await this.phoneVerifyRepository.save(phoneVerify);

    const response = new PhoneVerifyCodeResponseDto();
    response.code = verifyCode;

    return response;
  }

  async verify(dto: PhoneVerifyRequestDto) {
    const phoneVerification = await this.phoneVerifyRepository
      .createQueryBuilder('pv')
      .where('pv.phoneNumber = :phoneNumber', { phoneNumber: dto.phoneNumber })
      .andWhere('pv.verifyCode = :verifyCode', { verifyCode: dto.verifyCode })
      .andWhere('pv.isVerified = false')
      .andWhere('pv.expiredAt > NOW()')
      .orderBy({ createdAt: 'DESC' })
      .getOne();

    phoneVerification.isVerified = true;

    if (!phoneVerification) {
      throw new AuthFailedException(Messages.ERROR_AUTH_FAIL);
    }

    const response = new PhoneVerifyResponseDto();
    response.result = true;

    return response;
  }
}
