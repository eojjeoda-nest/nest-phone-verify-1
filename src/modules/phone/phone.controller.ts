import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { SendCodeDto } from './dto/send-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('phone')
@ApiTags('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('/send-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '인증번호 생성 API', description: '인증번호를 생성한다.'})
  @ApiBody({ type: SendCodeDto })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    const { phoneNumber } = sendCodeDto;
    try {
      return await this.phoneService.sendCode(phoneNumber);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/verify-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '인증번호 인증 API', description: '인증번호로 인증한다.'})
  @ApiBody({ type: VerifyCodeDto })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    const { phoneNumber, code } = verifyCodeDto;
    try {
      const result = await this.phoneService.verifyCode(phoneNumber, code);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}