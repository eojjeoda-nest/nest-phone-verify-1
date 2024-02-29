import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { SendCodeDto } from './dto/send-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post('send-code')
  @HttpCode(HttpStatus.OK)
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    const { phoneNumber } = sendCodeDto;
    try {
      return await this.phoneService.sendCode(phoneNumber);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
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