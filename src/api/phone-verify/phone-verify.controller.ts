import { Controller, Post, Body } from '@nestjs/common';
import { PhoneVerifyService } from './phone-verify.service';
import { PhoneVerifyDto } from './dto/phone-verify.dto';
import { SendCodeDto } from './dto/send-code.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('전화번호 인증 API')
@Controller('phone-verify')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  // 인증번호 생성
  @Post('code')
  @ApiOperation({ summary: '인증번호 생성' })
  @ApiResponse({ status: 201, description: '인증번호가 전송되었습니다.' })
  @ApiResponse({ status: 400, description: '올바른 전화번호를 입력하세요.' })
  async sendCode(@Body() sendCodeDto: SendCodeDto): Promise<{ code: string }> {
    const code = await this.phoneVerifyService.send(sendCodeDto.phoneNumber);
    return { code };
  }

  // 인증번호 입력
  @Post('verify')
  @ApiOperation({ summary: '인증번호 입력' })
  @ApiResponse({ status: 200, description: '인증이 완료되었습니다.' })
  @ApiResponse({ status: 400, description: '올바른 인증번호를 입력하세요.' })
  async verifyCode(
    @Body() phoneVerifyDto: PhoneVerifyDto,
  ): Promise<{ result: boolean }> {
    const { phoneNumber, code } = phoneVerifyDto;
    const result = await this.phoneVerifyService.verify(phoneNumber, code);
    return { result };
  }
}
