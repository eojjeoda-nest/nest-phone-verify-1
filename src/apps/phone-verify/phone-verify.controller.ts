import { Body, Controller } from '@nestjs/common';
import { PhoneVerifyService } from '../../domain/phone-verify/phone-verify.service';
import { PhoneVerifyCodeRequestDto } from '../../domain/phone-verify/dto/request/phone-verify-code-request.dto';
import { PhoneVerifyCodeResponseDto } from '../../domain/phone-verify/dto/response/phone-verify-code-response.dto';
import { PhoneVerifyRequestDto } from '../../domain/phone-verify/dto/request/phone-verify-request.dto';

@Controller('phone-verifications')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  async sendVerifyCode(
    @Body() dto: PhoneVerifyCodeRequestDto,
  ): Promise<PhoneVerifyCodeResponseDto> {
    return this.phoneVerifyService.sendVerifyCode(dto);
  }

  async verify(@Body() dto: PhoneVerifyRequestDto) {
    return this.phoneVerifyService.verify(dto);
  }
}
