import { Body, Controller, Patch, Post } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { SendCodeRequestDto } from './dto/request/send-code-request.dto';
import { SendCodeResponseDto } from './dto/response/send-code-response.dto';
import { VerifyCodeRequestDto } from './dto/request/verify-code-request.dto';
import { VerifyCodeResponseDto } from './dto/response/verify-code-response.dto';

@Controller('phone-verify')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  @Post('send-code')
  async sendVerifyCode(
    @Body() dto: SendCodeRequestDto,
  ): Promise<SendCodeResponseDto> {
    return this.phoneVerifyService.sendCode(dto);
  }

  @Patch('/verify-code')
  verify(@Body() dto: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto> {
    return this.phoneVerifyService.verifyCode(dto);
  }
}
