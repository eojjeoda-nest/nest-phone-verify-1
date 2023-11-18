import { Body, Controller } from '@nestjs/common';
import { PhoneVerifyService } from '../../domain/phone-verify/phone-verify.service';
import { VerifyCodeRequestDto } from '../../domain/phone-verify/dto/request/verify-code-request.dto';
import { VerifyCodeResponseDto } from '../../domain/phone-verify/dto/response/verify-code-response.dto';

@Controller('phone-verifications')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  async sendVerifyCode(
    @Body() dto: VerifyCodeRequestDto,
  ): Promise<VerifyCodeResponseDto> {
    return this.phoneVerifyService.sendVerifyCode(dto);
  }
}
