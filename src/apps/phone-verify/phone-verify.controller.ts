import { Body, Controller, Patch, Post } from '@nestjs/common';
import { PhoneVerifyService } from '../../domain/phone-verify/phone-verify.service';
import { PhoneVerifyCodeRequestDto } from '../../domain/phone-verify/dto/request/phone-verify-code-request.dto';
import { PhoneVerifyCodeResponseDto } from '../../domain/phone-verify/dto/response/phone-verify-code-response.dto';
import { PhoneVerifyRequestDto } from '../../domain/phone-verify/dto/request/phone-verify-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('phone-verifications')
@ApiTags('phone-verifications')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  @ApiOperation({
    summary: '휴대폰 인증번호 발송',
  })
  @Post('/phone-verifications')
  async sendVerifyCode(
    @Body() dto: PhoneVerifyCodeRequestDto,
  ): Promise<PhoneVerifyCodeResponseDto> {
    return this.phoneVerifyService.sendVerifyCode(dto);
  }

  @ApiOperation({
    summary: '휴대폰 인증',
  })
  @Patch('/phone-verifications')
  verify(@Body() dto: PhoneVerifyRequestDto) {
    return this.phoneVerifyService.verify(dto);
  }
}
