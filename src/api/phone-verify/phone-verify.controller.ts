import { Controller, Post, Body } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { PhoneVerifyDto } from './dto/phone-verify.dto';
import { SendCodeDto } from './dto/send-code.dto';

@Controller('phone-verify')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  // 인증번호 생성
  @Post('/send')
  async sendCode(@Body() sendCodeDto: SendCodeDto): Promise<{ code: string }> {
    const code = await this.phoneVerifyService.send(sendCodeDto.phoneNumber);
    return { code };
  }

  // 인증번호 입력
  @Post('/verify')
  async verifyCode(
    @Body() phoneVerifyDto: PhoneVerifyDto,
  ): Promise<{ result: boolean }> {
    const { phoneNumber, code } = phoneVerifyDto;
    const result = await this.phoneVerifyService.verify(phoneNumber, code);
    return { result };
  }
}
